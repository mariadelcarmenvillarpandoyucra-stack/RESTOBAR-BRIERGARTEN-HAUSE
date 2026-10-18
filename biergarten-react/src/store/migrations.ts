import type { Barril, DB } from "../types";
import { BARRILES, MENU_SEED, PROMOCIONES_SEED, ROCK_WINGS_CATEGORIA } from "./seed";
import { productosCervezaDeBarriles } from "../lib/menu";

const TOTAL_MESAS = 12;

/** Adapta bases guardadas con versiones anteriores sin perder los datos existentes. */
export function migrarDB(db: DB) {
  if (!db.mesas) db.mesas = [];
  for (let n = 1; n <= TOTAL_MESAS; n++) {
    if (!db.mesas.some((m) => m.num === n)) db.mesas.push({ num: n, estado: "libre", horaApertura: null });
  }
  db.mesas.forEach((mesa) => {
    mesa.estado = mesa.estado === "libre" ? "libre" : "ocupada";
  });
  db.mesas.sort((a, b) => a.num - b.num);

  if (!db.promociones) db.promociones = [];
  if (!db.nextPromocionId) db.nextPromocionId = db.promociones.length + 1;
  db.promociones.forEach((p) => {
    if (!p.categoria) p.categoria = "Otros";
    if (p.imagen === undefined) p.imagen = null;
  });

  const base = (db.barriles && db.barriles.length ? db.barriles : BARRILES) as any[];
  db.barriles = base.map((b) => {
    if (typeof b.capacidadL === "number") { delete b.cliente; return b as Barril; }
    const capacidadL = parseFloat(String(b.capacidad)) || 50;
    return {
      id: b.id, nombre: b.nombre, capacidadL,
      litrosActuales: Math.round((Number(b.nivel) || 0) * capacidadL / 100),
    } as Barril;
  });
  if (!db.nextBarrilId) db.nextBarrilId = db.barriles.length + 1;
  db.barriles.forEach((b) => {
    b.nombre = b.nombre.replace(/\bDuvel\b/gi, "Dunkel");
  });

  db.productos.forEach((p) => {
    if (p.categoria === "Cerveza artesanal") {
      p.categoria = "Cerveza";
      if (!p.subcategoria) p.subcategoria = "Cerveza artesanal";
    } else if (p.categoria === "Cerveza industrial") {
      p.categoria = "Cerveza";
      if (!p.subcategoria) p.subcategoria = "Cerveza industrial";
    }

    const semilla = MENU_SEED.find((m) => m.nombre === p.nombre);
    if (semilla?.imagen && (!p.imagen || p.imagen.includes("/assets/") || p.imagen.includes("/imagenes/"))) {
      p.imagen = semilla.imagen;
    }
    if (p.subcategoria !== undefined && p.subcategoria !== "") return;
    if (semilla?.subcategoria) p.subcategoria = semilla.subcategoria;
    if (semilla?.presentacion) p.presentacion = semilla.presentacion;
  });
  db.productos.forEach((p) => {
    if (p.presentacion) return;
    const semilla = MENU_SEED.find((m) => m.nombre === p.nombre);
    if (semilla?.presentacion) p.presentacion = semilla.presentacion;
  });
  db.productos.forEach((p) => {
    if (p.categoria !== "Cerveza" || p.subcategoria !== "Cerveza artesanal" || p.nombre !== "Duvel") return;
    p.nombre = "Dunkel";
    p.descripcion = "Cerveza oscura de estilo alemán, con sabor suave a malta.";
  });
  const cervezasAnteriores = new Map([
    ["p8", { nombre: "Cerveza Artesanal IPA 500ml", precio: 25 }],
    ["p9", { nombre: "Cerveza Rubia 500ml", precio: 22 }],
    ["p10", { nombre: "Cerveza Negra 500ml", precio: 24 }],
  ]);
  const productosCervezaExistentes = db.productos.filter((p) =>
    p.categoria === "Cerveza" && p.subcategoria === "Cerveza artesanal"
  );
  db.productos = db.productos.filter((p) =>
    !(p.id.startsWith("cerveza-") ||
      cervezasAnteriores.get(p.id)?.nombre === p.nombre &&
      cervezasAnteriores.get(p.id)?.precio === p.precio &&
      p.subcategoria === "Cerveza artesanal" &&
      p.presentacion === "Chop de 500 ml")
  );
  db.productos.push(...productosCervezaDeBarriles(db.barriles.map((b) => b.nombre)).map((producto) => {
    const nombreComparable = (nombre: string) => nombre.replace(/^Cerveza\s+/i, "").toLocaleLowerCase();
    const existente = productosCervezaExistentes.find((p) =>
      nombreComparable(p.nombre) === nombreComparable(producto.nombre) &&
      p.presentacion === producto.presentacion
    );
    return existente
      ? { ...existente, id: producto.id, nombre: producto.nombre }
      : producto;
  }));
  const productoCigarrillos = MENU_SEED.find((p) => p.id === "p17");
  if (productoCigarrillos && !db.productos.some((p) =>
    p.categoria === "Refrescos" && p.subcategoria === "Cigarrillos" && p.nombre === productoCigarrillos.nombre
  )) {
    db.productos.push({ ...productoCigarrillos, id: "cigarrillos-cajetilla" });
  }
  db.productos.forEach((p) => {
    if (p.categoria === ROCK_WINGS_CATEGORIA) p.subcategoria = "";
    if (p.categoria !== "Botellas" || p.subcategoria?.trim()) return;
    const nombre = p.nombre.toLowerCase();
    const esVino = /\b(vino|wine|cabernet|malbec|merlot|syrah|chardonnay|sauvignon|pinot|moscato)\b/.test(nombre);
    p.subcategoria = esVino ? "Vinos" : "Combo en botella";
  });
  db.promociones.forEach((p) => {
    if (p.categoria === "Cerveza artesanal" || p.categoria === "Cerveza industrial") {
      p.categoria = "Cerveza";
    }
    const semilla = PROMOCIONES_SEED.find((promo) => promo.id === p.id);
    if (semilla?.imagen && (!p.imagen || p.imagen.includes("/assets/") || p.imagen.includes("/imagenes/"))) {
      p.imagen = semilla.imagen;
    }
  });
}
