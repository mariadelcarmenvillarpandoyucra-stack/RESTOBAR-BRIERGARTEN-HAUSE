import type { DB } from "../types";
import { ROCK_WINGS_CATEGORIA } from "../store/seed";

export function computeStats(db: DB) {
  const ventas = db.ventas || [];
  const ventasHoy = ventas.reduce((sum, v) => sum + v.subtotal, 0);
  const propinasHoy = ventas.reduce((sum, v) => sum + (v.propina || 0), 0);
  const cajaEfectivo = ventas.filter((v) => v.metodoPago === "efectivo").reduce((s, v) => s + v.subtotal + (v.propina || 0), 0);
  const cajaQR = ventas.filter((v) => v.metodoPago === "qr").reduce((s, v) => s + v.subtotal + (v.propina || 0), 0);
  const calificadas = ventas.filter((v) => v.calificacion > 0);
  const calificacionPromedio = calificadas.length ? calificadas.reduce((s, v) => s + v.calificacion, 0) / calificadas.length : 0;
  const numEfectivo = ventas.filter((v) => v.metodoPago === "efectivo").length;
  const numQR = ventas.filter((v) => v.metodoPago === "qr").length;
  const pctQR = ventas.length ? Math.round((numQR / ventas.length) * 100) : 0;

  const conteoProductos: Record<string, number> = {};
  ventas.forEach((v) => v.items.forEach((it) => { conteoProductos[it.nombre] = (conteoProductos[it.nombre] || 0) + it.cant; }));
  let productoTop = "—";
  let maxCant = 0;
  Object.entries(conteoProductos).forEach(([nombre, cant]) => { if (cant > maxCant) { maxCant = cant; productoTop = nombre; } });

  return { ventasHoy, propinasHoy, cajaEfectivo, cajaQR, calificacionPromedio, numVentas: ventas.length, numEfectivo, numQR, pctQR, productoTop };
}

export function statsPorMesero(db: DB, nombre: string) {
  const ventas = (db.ventas || []).filter((v) => v.mesero === nombre);
  const pedidosHoy = ventas.length;
  const propinasHoy = ventas.reduce((s, v) => s + (v.propina || 0), 0);
  const calificadas = ventas.filter((v) => v.calificacion > 0);
  const calificacion = calificadas.length ? calificadas.reduce((s, v) => s + v.calificacion, 0) / calificadas.length : 0;
  return { pedidosHoy, propinasHoy, calificacion };
}

export function computeRockWingsStats(db: DB) {
  const productosRW = (db.productos || []).filter((p) => p.categoria === ROCK_WINGS_CATEGORIA);
  const nombresRW = new Set(productosRW.map((p) => p.nombre));
  const precioPorNombre: Record<string, number> = {};
  productosRW.forEach((p) => { precioPorNombre[p.nombre] = p.precio; });

  let ventasInternas = 0;
  let unidadesInternas = 0;
  const conteoItems: Record<string, number> = {};
  (db.ventas || []).forEach((v) => {
    v.items.forEach((it) => {
      if (!nombresRW.has(it.nombre)) return;
      const precio = precioPorNombre[it.nombre] || 0;
      ventasInternas += precio * it.cant;
      unidadesInternas += it.cant;
      conteoItems[it.nombre] = (conteoItems[it.nombre] || 0) + it.cant;
    });
  });

  let productoTopRW = "—";
  let maxCantRW = 0;
  Object.entries(conteoItems).forEach(([nombre, cant]) => { if (cant > maxCantRW) { maxCantRW = cant; productoTopRW = nombre; } });

  const detalleHoy = Object.entries(conteoItems)
    .map(([nombre, cantidad]) => ({ nombre, cantidad, monto: (precioPorNombre[nombre] || 0) * cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);

  const manuales = db.rockWingsVentasManual || [];
  const ventasExternas = manuales.reduce((s, m) => s + (m.monto || 0), 0);

  return { ventasInternas, unidadesInternas, productoTopRW, detalleHoy, ventasExternas, numRegistrosExternos: manuales.length, totalUnificado: ventasInternas + ventasExternas };
}
