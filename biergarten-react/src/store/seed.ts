import type { Barril, DB, Producto, Promocion } from "../types";
import { productosCervezaDeBarriles } from "../lib/menu";

const alitasBbqImage = new URL("../../imagenes/carnes3.jpg", import.meta.url).href;
const platoCasaImage = new URL("../../imagenes/carnes1.jpg", import.meta.url).href;
const papasEspecialesImage = new URL("../../imagenes/papajamon.jpg", import.meta.url).href;
const coctelTropicalImage = new URL("../../imagenes/coctel4.jpg", import.meta.url).href;
const mojitoImage = new URL("../../imagenes/coctel3.jpg", import.meta.url).href;
const refrescoImage = new URL("../../imagenes/ga1.jpg", import.meta.url).href;
const limonadaImage = new URL("../../imagenes/natu2.jpg", import.meta.url).href;
const rockWingsImage = new URL("../../imagenes/rock1.jpg", import.meta.url).href;
const tendersImage = new URL("../../imagenes/piqueo3.jpg", import.meta.url).href;
const cigarrillosImage = new URL("../../imagenes/ciga1.webp", import.meta.url).href;
const promoCervezaImage = new URL("../../imagenes/balde-corona.webp", import.meta.url).href;

/* ==========================================================================
   Menú semilla — migrado 1:1 de store.js (MENU_SEED)
   ========================================================================== */
export const MENU_SEED: Producto[] = [
  { id: "p1", subcategoria: "Carnes", nombre: "Papas con jamon y queso", categoria: "Comidas", precio: 45, icon: "burger", imagen: papasEspecialesImage, descripcion: "Carne de res, queso cheddar, tocino y salsa de la casa en pan brioche." },
  { id: "p2", subcategoria: "Piqueo", nombre: "Papas con queso cheddar y tocino", categoria: "Comidas", precio: 55, icon: "pizza", imagen: null, descripcion: "Masa artesanal, mozzarella, salame y albahaca fresca." },
  { id: "p3", subcategoria: "Piqueo", nombre: "Alitas BBQ", categoria: "Comidas", precio: 35, icon: "wings", imagen: alitasBbqImage, descripcion: "8 alitas bañadas en salsa BBQ ahumada, acompañadas de aderezo ranch." },
  { id: "p4", subcategoria: "Carnes", nombre: "Plato de la Casa", categoria: "Comidas", precio: 60, icon: "plate", imagen: platoCasaImage, descripcion: "Selección de carnes a la parrilla con guarniciones de la casa." },
  { id: "p5", subcategoria: "Piqueo", nombre: "Papas Especiales", categoria: "Comidas", precio: 20, icon: "papas", imagen: papasEspecialesImage, descripcion: "Papas fritas con queso cheddar, tocino y cebollín." },
  { id: "p6", subcategoria: "Especiales", nombre: "Cóctel Tropical", categoria: "Cócteles", precio: 32, icon: "coctel", imagen: coctelTropicalImage, descripcion: "Ron, jugo de maracuyá, piña y un toque de menta." },
  { id: "p7", subcategoria: "Clásicos", nombre: "Mojito Biergärten", categoria: "Cócteles", precio: 30, icon: "coctel", imagen: mojitoImage, descripcion: "Ron blanco, hierbabuena, limón y soda bien fría." },
  { id: "p11", subcategoria: "Gaseosas", nombre: "Refresco", categoria: "Refrescos", precio: 10, icon: "soda", imagen: refrescoImage, descripcion: "Línea de gaseosas heladas, sabor a elección." },
  { id: "p12", subcategoria: "Naturales", nombre: "Limonada de la Casa", categoria: "Refrescos", precio: 12, icon: "soda", imagen: limonadaImage, descripcion: "Limonada natural con un toque de hierbabuena." },
  { id: "p13", nombre: "Alitas Rock & Wings", categoria: "Rock & Wings", precio: 38, icon: "wings", imagen: rockWingsImage, descripcion: "8 alitas al estilo Rock & Wings, elige tu salsa: BBQ, picante o miel mostaza." },
  { id: "p14", nombre: "Pipocas de Pollo", categoria: "Rock & Wings", precio: 28, icon: "wings", imagen: null, descripcion: "Popcorn chicken crocante, bañado en la salsa de la casa Rock & Wings." },
  { id: "p15", nombre: "Tenders Rock & Wings", categoria: "Rock & Wings", precio: 34, icon: "wings", imagen: tendersImage, descripcion: "Tiras de pollo crocante empanizado, acompañadas de papas y dip a elección." },
  { id: "p16", nombre: "Boneless Rock & Wings", categoria: "Rock & Wings", precio: 32, icon: "wings", imagen: null, descripcion: "Trozos de pollo sin hueso, crocantes, bañados en la salsa que elijas." },
  { id: "p17", subcategoria: "Cigarrillos", nombre: "Cajetilla de cigarrillos", categoria: "Refrescos", precio: 30, icon: "cigarrillos", imagen: cigarrillosImage, descripcion: "" },
];

export const CATEGORIA_ICONS: Record<string, string> = {
  Todos: "productos",
  Comidas: "plate",
  "Cócteles": "coctel",
  Cerveza: "cerveza",
  Botellas: "cerveza",
  Refrescos: "soda",
  "Rock & Wings": "fuego",
  Promociones: "promo",
  "Promociones del día": "promo",
};

export const ROCK_WINGS_CATEGORIA = "Rock & Wings";

export const BARRILES: Barril[] = [
  { id: "b1", nombre: "Cerveza Rubia", capacidadL: 50, litrosActuales: 36 },
  { id: "b2", nombre: "Cerveza Negra", capacidadL: 50, litrosActuales: 17 },
  { id: "b3", nombre: "Cerveza Roja / Amber", capacidadL: 30, litrosActuales: 4 },
  { id: "b4", nombre: "Cerveza Artesanal IPA", capacidadL: 30, litrosActuales: 17 },
];

export const PROMOCIONES_SEED: Promocion[] = [
  { id: "promo1", titulo: "2x1 en Cerveza Rubia", descripcion: "Pide una cerveza rubia de 500ml y la segunda va por la casa.", categoria: "Cerveza", precio: 22, imagen: promoCervezaImage, vigencia: "Hoy de 18:00 a 21:00", activa: true },
  { id: "promo2", titulo: "Combo Haus", descripcion: "Hamburguesa Haus + papas especiales + refresco a elección.", categoria: "Comidas", precio: 65, imagen: papasEspecialesImage, vigencia: "Hoy", activa: true },
];

export function formatHora(d: Date): string {
  return d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
}

export function minutosDesde(ts: number): number {
  return Math.max(0, Math.round((Date.now() - ts) / 60000));
}

/** Base de datos de demostración — misma semilla que el prototipo original. */
export function seedDB(): DB {
  const now = Date.now();
  const haceMin = (m: number) => now - m * 60000;

  return {
    mesas: [
      { num: 1, estado: "libre", horaApertura: null },
      { num: 2, estado: "ocupada", horaApertura: haceMin(9) },
      { num: 3, estado: "ocupada", horaApertura: haceMin(22) },
      { num: 4, estado: "libre", horaApertura: null },
      { num: 5, estado: "ocupada", horaApertura: haceMin(38) },
      { num: 6, estado: "libre", horaApertura: null },
      { num: 7, estado: "libre", horaApertura: null },
      { num: 8, estado: "ocupada", horaApertura: haceMin(4) },
      { num: 9, estado: "libre", horaApertura: null },
      { num: 10, estado: "libre", horaApertura: null },
      { num: 11, estado: "libre", horaApertura: null },
      { num: 12, estado: "libre", horaApertura: null },
    ],
    pedidos: [
      { id: 101, mesa: 3, mesero: "Carlos", estado: "preparando", items: [{ nombre: "Hamburguesa Haus", cant: 2, precio: 45 }, { nombre: "Pizza Biergärten", cant: 1, precio: 55 }], hora: formatHora(new Date(haceMin(20))), ts: haceMin(20), total: 145 },
      { id: 102, mesa: 5, mesero: "Carlos", estado: "entregado", items: [{ nombre: "Plato de la Casa", cant: 1, precio: 60 }, { nombre: "Refresco", cant: 2, precio: 10 }], hora: formatHora(new Date(haceMin(35))), ts: haceMin(35), total: 80 },
      { id: 103, mesa: 2, mesero: "Carlos", estado: "pendiente", items: [{ nombre: "Alitas BBQ", cant: 2, precio: 35 }, { nombre: "Cerveza Artesanal IPA 500ml", cant: 3, precio: 25 }], hora: formatHora(new Date(haceMin(6))), ts: haceMin(6), total: 145 },
      { id: 104, mesa: 8, mesero: "Carlos", estado: "listo", items: [{ nombre: "Papas Especiales", cant: 2, precio: 20 }, { nombre: "Cóctel Tropical", cant: 2, precio: 32 }], hora: formatHora(new Date(haceMin(3))), ts: haceMin(3), total: 104 },
    ],
    ventas: [
      { id: 1, mesa: 4, mesero: "Carlos", items: [{ nombre: "Hamburguesa Haus", cant: 1 }, { nombre: "Cerveza Rubia 500ml", cant: 2 }], subtotal: 89, propina: 10, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(240))), ts: haceMin(240) },
      { id: 2, mesa: 6, mesero: "Ana", items: [{ nombre: "Pizza Biergärten", cant: 1 }, { nombre: "Refresco", cant: 2 }], subtotal: 75, propina: 8, metodoPago: "qr", calificacion: 5, hora: formatHora(new Date(haceMin(210))), ts: haceMin(210) },
      { id: 3, mesa: 1, mesero: "Luis", items: [{ nombre: "Alitas BBQ", cant: 2 }, { nombre: "Cerveza Artesanal IPA 500ml", cant: 2 }], subtotal: 120, propina: 12, metodoPago: "qr", calificacion: 4, hora: formatHora(new Date(haceMin(190))), ts: haceMin(190) },
      { id: 4, mesa: 7, mesero: "Ana", items: [{ nombre: "Plato de la Casa", cant: 2 }], subtotal: 120, propina: 15, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(160))), ts: haceMin(160) },
      { id: 5, mesa: 3, mesero: "Carlos", items: [{ nombre: "Cóctel Tropical", cant: 3 }, { nombre: "Papas Especiales", cant: 1 }], subtotal: 116, propina: 10, metodoPago: "qr", calificacion: 5, hora: formatHora(new Date(haceMin(140))), ts: haceMin(140) },
      { id: 6, mesa: 2, mesero: "Luis", items: [{ nombre: "Hamburguesa Haus", cant: 2 }, { nombre: "Refresco", cant: 2 }], subtotal: 110, propina: 0, metodoPago: "efectivo", calificacion: 3, hora: formatHora(new Date(haceMin(120))), ts: haceMin(120) },
      { id: 7, mesa: 8, mesero: "Ana", items: [{ nombre: "Pizza Biergärten", cant: 2 }], subtotal: 110, propina: 12, metodoPago: "qr", calificacion: 5, hora: formatHora(new Date(haceMin(95))), ts: haceMin(95) },
      { id: 8, mesa: 5, mesero: "Carlos", items: [{ nombre: "Mojito Biergärten", cant: 2 }, { nombre: "Papas Especiales", cant: 2 }], subtotal: 100, propina: 10, metodoPago: "efectivo", calificacion: 4, hora: formatHora(new Date(haceMin(70))), ts: haceMin(70) },
    ],
    productos: [
      ...MENU_SEED.map((p) => ({ ...p })),
      ...productosCervezaDeBarriles(BARRILES.map((b) => b.nombre)),
    ],
    nextProductoId: 18,
    promociones: PROMOCIONES_SEED.map((p) => ({ ...p })),
    nextPromocionId: 3,
    nextBarrilId: 5,
    notificaciones: [
      { id: 1, mesero: "Carlos", mesa: 8, pedidoId: 104, mensaje: "Pedido #104 listo para servir — Mesa 8", hora: formatHora(new Date(haceMin(3))), leida: false },
    ],
    nextPedidoId: 105,
    nextVentaId: 9,
    nextNotifId: 2,
    ventasSemana: [820, 1010, 940, 1180, 1400, 1850, 1620],
    meseros: [
      { id: "u1", nombre: "Carlos" },
      { id: "u2", nombre: "Luis" },
      { id: "u3", nombre: "Ana" },
    ],
    barriles: BARRILES.map((b) => ({ ...b })),
    rockWingsVentasManual: [
      { id: 1, monto: 340, fecha: "Hoy", nota: "Ventas del local Rock & Wings (registro manual del dueño)", hora: formatHora(new Date(haceMin(180))), ts: haceMin(180) },
    ],
    nextRockWingsManualId: 2,
    solicitudesFactura: [],
    nextFacturaId: 1,
  };
}
