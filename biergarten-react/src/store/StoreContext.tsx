import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type {
  Barril, DB, EstadoPedido, ItemPedido, MetodoPago, Pedido, Producto, Promocion, RockWingsVentaManual,
  SolicitudFactura, Venta,
} from "../types";
import { formatHora, seedDB } from "./seed";
import { migrarDB } from "./migrations";

const STORE_KEY = "biergarten_db_v4";
const LITROS_POR_PRESENTACION: Record<string, number> = {
  "Chop de 350 ml": 0.35,
  "Chop de 500 ml": 0.5,
  "Chop de 1 L": 1,
};

/* ---------------- Cargar / guardar (localStorage) ---------------- */
function loadDB(): DB {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) {
    const fresh = seedDB();
    localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
    return fresh;
  }
  try {
    const db = JSON.parse(raw) as DB;
    if (!db.ventas) db.ventas = [];
    if (!db.notificaciones) db.notificaciones = [];
    if (!db.rockWingsVentasManual) db.rockWingsVentasManual = [];
    if (!db.nextRockWingsManualId) db.nextRockWingsManualId = 1;
    if (!db.solicitudesFactura) db.solicitudesFactura = [];
    if (!db.nextFacturaId) db.nextFacturaId = 1;
    migrarDB(db);
    persist(db);
    return db;
  } catch {
    return seedDB();
  }
}

function persist(db: DB) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
}

/* ==========================================================================
   Contexto de la tienda — reemplaza a store.js + eventos "db:updated".
   Toda mutación pasa por `mutate`, que actualiza el estado de React y
   persiste en localStorage en un mismo paso.
   ========================================================================== */
interface StoreApi {
  db: DB;
  mutate: (fn: (db: DB) => void) => void;
  crearPedido: (mesa: number, mesero: string, items: ItemPedido[], nota?: string) => void;
  avanzarEstadoPedido: (id: number, estado: EstadoPedido) => void;
  cobrarMesa: (mesa: number, pedidoIds: number[], propina: number, metodoPago: MetodoPago, calificacion: number) => void;
  agregarProducto: (p: Omit<Producto, "id">) => void;
  editarProducto: (id: string, p: Partial<Producto>) => void;
  eliminarProducto: (id: string) => void;
  agregarPromocion: (p: Omit<Promocion, "id">) => void;
  editarPromocion: (id: string, p: Partial<Promocion>) => void;
  eliminarPromocion: (id: string) => void;
  agregarBarril: (b: Omit<Barril, "id">) => void;
  editarBarril: (id: string, b: Partial<Barril>) => void;
  eliminarBarril: (id: string) => void;
  marcarNotificacionLeida: (id: number) => void;
  agregarVentaRockWingsManual: (monto: number, nota: string, fecha?: string) => void;
  crearSolicitudFactura: (s: Omit<SolicitudFactura, "id" | "ts" | "hora" | "atendida">) => void;
  atenderFactura: (id: number) => void;
  resetDB: () => void;
}

const StoreCtx = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(() => loadDB());
  const cocinaProgramada = useRef<Set<number>>(new Set());

  const mutate = useCallback((fn: (db: DB) => void) => {
    setDb((prev) => {
      const next: DB = JSON.parse(JSON.stringify(prev));
      fn(next);
      persist(next);
      return next;
    });
  }, []);

  // Sincroniza entre pestañas del mismo navegador (equivalente al listener "storage").
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORE_KEY) setDb(loadDB());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------------- Simulación de cocina (segundo plano) ----------------
     No hay panel de cocinero conectado: este efecto avanza los pedidos
     pendiente → preparando → listo con tiempos aleatorios, igual que
     en la versión original, para que el flujo se sienta completo. */
  const programarCocina = useCallback((pedidoId: number, rapido: boolean) => {
    if (cocinaProgramada.current.has(pedidoId)) return;
    cocinaProgramada.current.add(pedidoId);

    const delayPrep = rapido ? 2500 + Math.random() * 2500 : 5000 + Math.random() * 4000;
    const delayListo = rapido ? 6000 + Math.random() * 5000 : 12000 + Math.random() * 9000;

    setTimeout(() => {
      mutate((d) => {
        const p = d.pedidos.find((pp) => pp.id === pedidoId);
        if (!p || p.estado !== "pendiente") return;
        p.estado = "preparando";
      });
    }, delayPrep);

    setTimeout(() => {
      mutate((d) => {
        const p = d.pedidos.find((pp) => pp.id === pedidoId);
        if (!p || p.estado !== "preparando") return;
        p.estado = "listo";
        p.horaListo = formatHora(new Date());
        d.notificaciones.unshift({
          id: d.nextNotifId || 1, mesero: p.mesero, mesa: p.mesa, pedidoId: p.id,
          mensaje: `Pedido #${p.id} listo para servir — Mesa ${p.mesa}`,
          hora: formatHora(new Date()), leida: false,
        });
        d.nextNotifId = (d.nextNotifId || 1) + 1;
      });
    }, delayPrep + delayListo);
  }, [mutate]);

  useEffect(() => {
    db.pedidos.forEach((p) => {
      if (p.estado === "pendiente" || p.estado === "preparando") programarCocina(p.id, true);
    });
    // Solo al montar: retoma pedidos que quedaron en curso (p. ej. tras recargar).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useMemo<StoreApi>(() => ({
    db,
    mutate,
    crearPedido(mesa, mesero, items, nota) {
      mutate((d) => {
        const total = items.reduce((s, it) => s + it.precio * it.cant, 0);
        const pedido: Pedido = {
          id: d.nextPedidoId, mesa, mesero, estado: "pendiente", items,
          hora: formatHora(new Date()), ts: Date.now(), total,
        };
        items.forEach((item) => {
          const separador = item.nombre.lastIndexOf(" — ");
          if (separador < 0) return;
          const nombre = item.nombre.slice(0, separador);
          const presentacion = item.nombre.slice(separador + 3);
          const litrosPorUnidad = LITROS_POR_PRESENTACION[presentacion];
          if (!litrosPorUnidad) return;
          const producto = d.productos.find((p) =>
            p.categoria === "Cerveza" &&
            p.subcategoria === "Cerveza artesanal" &&
            p.nombre === nombre &&
            p.presentacion === presentacion
          );
          if (!producto) return;
          const barril = d.barriles.find((b) => b.nombre === producto.nombre);
          if (barril) {
            barril.litrosActuales = Math.max(0, barril.litrosActuales - litrosPorUnidad * item.cant);
          }
        });
        if (nota && nota.trim()) pedido.nota = nota.trim();
        d.pedidos.unshift(pedido);
        d.nextPedidoId += 1;
        const mesaObj = d.mesas.find((m) => m.num === mesa);
        if (mesaObj && mesaObj.estado === "libre") { mesaObj.estado = "ocupada"; mesaObj.horaApertura = Date.now(); }
      });
    },
    avanzarEstadoPedido(id, estado) {
      mutate((d) => {
        const p = d.pedidos.find((pp) => pp.id === id);
        if (p) p.estado = estado;
      });
    },
    cobrarMesa(mesa, pedidoIds, propina, metodoPago, calificacion) {
      mutate((d) => {
        const pedidosMesa = d.pedidos.filter((p) => pedidoIds.includes(p.id));
        if (!pedidosMesa.length) return;
        const items = pedidosMesa.flatMap((p) => p.items.map((it) => ({ nombre: it.nombre, cant: it.cant })));
        const subtotal = pedidosMesa.reduce((s, p) => s + p.total, 0);
        const venta: Venta = {
          id: d.nextVentaId, mesa, mesero: pedidosMesa[0].mesero, items, subtotal, propina, metodoPago, calificacion,
          hora: formatHora(new Date()), ts: Date.now(),
        };
        d.ventas.unshift(venta);
        d.nextVentaId += 1;
        d.pedidos = d.pedidos.filter((p) => !pedidoIds.includes(p.id));
        const mesaObj = d.mesas.find((m) => m.num === mesa);
        if (mesaObj) { mesaObj.estado = "libre"; mesaObj.horaApertura = null; }
      });
    },
    agregarProducto(p) {
      mutate((d) => {
        d.productos.push({ ...p, id: `p${d.nextProductoId}` });
        d.nextProductoId += 1;
      });
    },
    editarProducto(id, p) {
      mutate((d) => {
        const prod = d.productos.find((x) => x.id === id);
        if (prod) Object.assign(prod, p);
      });
    },
    eliminarProducto(id) {
      mutate((d) => { d.productos = d.productos.filter((p) => p.id !== id); });
    },
    agregarPromocion(p) {
      mutate((d) => {
        d.promociones.unshift({ ...p, id: `promo${d.nextPromocionId}` });
        d.nextPromocionId += 1;
      });
    },
    editarPromocion(id, p) {
      mutate((d) => {
        const promo = d.promociones.find((x) => x.id === id);
        if (promo) Object.assign(promo, p);
      });
    },
    eliminarPromocion(id) {
      mutate((d) => { d.promociones = d.promociones.filter((x) => x.id !== id); });
    },
    agregarBarril(b) {
      mutate((d) => {
        d.barriles.push({ ...b, id: `b${d.nextBarrilId}` });
        d.nextBarrilId += 1;
      });
    },
    editarBarril(id, b) {
      mutate((d) => {
        const barril = d.barriles.find((x) => x.id === id);
        if (barril) Object.assign(barril, b);
      });
    },
    eliminarBarril(id) {
      mutate((d) => { d.barriles = d.barriles.filter((x) => x.id !== id); });
    },
    marcarNotificacionLeida(id) {
      mutate((d) => {
        const n = d.notificaciones.find((x) => x.id === id);
        if (n) n.leida = true;
      });
    },
    agregarVentaRockWingsManual(monto, nota, fecha) {
      mutate((d) => {
        const item: RockWingsVentaManual = {
          id: d.nextRockWingsManualId,
          monto,
          fecha: fecha && fecha.trim() ? fecha.trim() : "Hoy",
          nota: nota || "Ventas del local Rock & Wings",
          hora: formatHora(new Date()), ts: Date.now(),
        };
        d.rockWingsVentasManual.unshift(item);
        d.nextRockWingsManualId += 1;
      });
    },
    crearSolicitudFactura(s) {
      mutate((d) => {
        d.solicitudesFactura.unshift({ ...s, id: d.nextFacturaId, hora: formatHora(new Date()), ts: Date.now(), atendida: false });
        d.nextFacturaId += 1;
      });
    },
    atenderFactura(id) {
      mutate((d) => {
        const f = d.solicitudesFactura.find((x) => x.id === id);
        if (f) f.atendida = true;
      });
    },
    resetDB() {
      const fresh = seedDB();
      persist(fresh);
      cocinaProgramada.current.clear();
      setDb(fresh);
    },
  }), [db, mutate]);

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore debe usarse dentro de <StoreProvider>");
  return ctx;
}
