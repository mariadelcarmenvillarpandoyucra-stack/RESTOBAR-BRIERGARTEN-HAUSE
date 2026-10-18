import type { Barril, DB, Producto, Promocion } from "../types";
import { productosCervezaDeBarriles } from "../lib/menu";

// --- Importación de Imágenes desde la carpeta imagenes ---
const papasJamonImage = new URL("../../imagenes/papajamon.jpg", import.meta.url).href;
const pashaMoImage = new URL("../../imagenes/pajamo.jpg", import.meta.url).href;
const carnes1Image = new URL("../../imagenes/carnes1.jpg", import.meta.url).href;
const carnes2Image = new URL("../../imagenes/carnes2.jpg", import.meta.url).href;
const carnes3Image = new URL("../../imagenes/carnes3.jpg", import.meta.url).href;
const carnes4Image = new URL("../../imagenes/carnes4.jpg", import.meta.url).href;
const carnes5Image = new URL("../../imagenes/carnes5.jpg", import.meta.url).href;
const carnes6Image = new URL("../../imagenes/carnes6.jpg", import.meta.url).href;

const coctel1Image = new URL("../../imagenes/coctel1.jpg", import.meta.url).href;
const coctel2Image = new URL("../../imagenes/coctel2.jpg", import.meta.url).href;
const coctel3Image = new URL("../../imagenes/coctel3.jpg", import.meta.url).href;
const coctel4Image = new URL("../../imagenes/coctel4.jpg", import.meta.url).href;
const coctel5Image = new URL("../../imagenes/coctel5.jpg", import.meta.url).href;
const coctel6Image = new URL("../../imagenes/coctel6.jpg", import.meta.url).href;
const coctel7Image = new URL("../../imagenes/coctel7.jpg", import.meta.url).href;
const coctel8Image = new URL("../../imagenes/coctel8.jpg", import.meta.url).href;
const coctel9Image = new URL("../../imagenes/coctel9.jpg", import.meta.url).href;
const coctel10Image = new URL("../../imagenes/coctel10.jpg", import.meta.url).href;

const ga1Image = new URL("../../imagenes/ga1.jpg", import.meta.url).href;
const natu2Image = new URL("../../imagenes/natu2.jpg", import.meta.url).href;
const rock1Image = new URL("../../imagenes/rock1.jpg", import.meta.url).href;
const piqueo3Image = new URL("../../imagenes/piqueo3.jpg", import.meta.url).href;
const ciga1Image = new URL("../../imagenes/ciga1.webp", import.meta.url).href;
const promoCervezaImage = new URL("../../imagenes/balde-corona.webp", import.meta.url).href;

const paulinerImage = new URL("../../imagenes/pauliner.jpg", import.meta.url).href;
const coronaImage = new URL("../../imagenes/corona.jpg", import.meta.url).href;
const heinekenImage = new URL("../../imagenes/heineken.jpg", import.meta.url).href;
const heinekenSixImage = new URL("../../imagenes/heineken six.jpg", import.meta.url).href;
const prostImage = new URL("../../imagenes/prost.jpg", import.meta.url).href;

/* ==========================================================================
   Menú semilla — migrado 1:1 con todas las categorías y productos
   ========================================================================== */
export const MENU_SEED: Producto[] = [
  // --- Comidas: Piqueo ---
  { id: "p1", subcategoria: "Piqueo", nombre: "Papas con jamón y queso", categoria: "Comidas", precio: 30, icon: "papas", imagen: papasJamonImage, descripcion: "Crujientes papas fritas acompañadas de trocitos de jamón y una deliciosa capa de queso fundido." },
  { id: "p2", subcategoria: "Piqueo", nombre: "Papas con queso cheddar y tocino", categoria: "Comidas", precio: 30, icon: "papas", imagen: pashaMoImage, descripcion: "Deliciosas papas fritas doradas cubiertas con cremosa salsa de queso cheddar y crujientes trocitos de tocino." },
  { id: "p3", subcategoria: "Piqueo", nombre: "Nachos", categoria: "Comidas", precio: 25, icon: "pizza", imagen: carnes6Image, descripcion: "Crujientes totopos de maíz, ideales para picar y compartir." },
  
  // --- Comidas: Carnes ---
  { id: "p4", subcategoria: "Carnes", nombre: "Piqueo Munich", categoria: "Comidas", precio: 89, icon: "plate", imagen: carnes2Image, descripcion: "Piqueo abundante para compartir, preparado con una variedad de carnes, salchichas, papas fritas y salsas para acompañar." },
  { id: "p5", subcategoria: "Carnes", nombre: "Pique Rústico — Entero", categoria: "Comidas", precio: 100, icon: "plate", imagen: carnes1Image, descripcion: "Delicioso pique rústico preparado con jugosos trozos de carne, papas doradas, chorizo y salchichas." },
  { id: "p6", subcategoria: "Carnes", nombre: "Pique Rústico — Medio", categoria: "Comidas", precio: 60, icon: "plate", imagen: carnes1Image, descripcion: "Delicioso pique rústico preparado con jugosos trozos de carne, papas doradas, chorizo y salchichas (porción mediana)." },
  { id: "p7", subcategoria: "Carnes", nombre: "Tabla de Giba", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes3Image, descripcion: "Tabla de giba preparada a la parrilla, servida en porciones y acompañada de guarniciones y salsas." },
  { id: "p8", subcategoria: "Carnes", nombre: "Tabla de Picaña", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes4Image, descripcion: "Picaña de res preparada a la parrilla y cortada en porciones, servida con guarniciones y salsas." },
  { id: "p9", subcategoria: "Carnes", nombre: "Tabla de Bife de Chorizo", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes5Image, descripcion: "Bife de chorizo de res cocinado a la parrilla y servido en una tabla, con guarniciones y salsas." },
  { id: "p10", subcategoria: "Carnes", nombre: "Salchihaus — Medio", categoria: "Comidas", precio: 35, icon: "plate", imagen: papasJamonImage, descripcion: "Deliciosa salchipapa preparada con crujientes papas fritas y salchichas doradas (porción mediana)." },
  { id: "p11", subcategoria: "Carnes", nombre: "Salchihaus — Entero", categoria: "Comidas", precio: 60, icon: "plate", imagen: papasJamonImage, descripcion: "Deliciosa salchipapa preparada con crujientes papas fritas y salchichas doradas (porción entera)." },

  // --- Cócteles: Clásicos ---
  { id: "p12", subcategoria: "Clásicos", nombre: "Cuba Libre", categoria: "Cócteles", precio: 30, icon: "coctel", imagen: coctel1Image, descripcion: "Refrescante cóctel preparado con ron, bebida de cola, hielo y un toque de limón." },
  { id: "p13", subcategoria: "Clásicos", nombre: "Fernet", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel2Image, descripcion: "Cóctel de sabor intenso y herbal, preparado tradicionalmente con fernet, bebida de cola y hielo." },
  { id: "p14", subcategoria: "Clásicos", nombre: "Chuflay", categoria: "Cócteles", precio: 25, icon: "coctel", imagen: coctel3Image, descripcion: "Cóctel tradicional boliviano elaborado con singani, ginger ale, hielo y limón." },
  { id: "p15", subcategoria: "Clásicos", nombre: "Tequila Sunrise", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel4Image, descripcion: "Colorido cóctel preparado tradicionalmente con tequila, jugo de naranja y granadina." },
  { id: "p16", subcategoria: "Clásicos", nombre: "Wisky a las rocas", categoria: "Cócteles", precio: 30, icon: "coctel", imagen: coctel5Image, descripcion: "Wisky servido con cubos de hielo para disfrutar lentamente de su aroma y notas amaderadas." },

  // --- Cócteles: Especiales ---
  { id: "p17", subcategoria: "Especiales", nombre: "Piña Colada", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel6Image, descripcion: "Cóctel tropical cremoso preparado tradicionalmente con piña, crema o leche de coco y ron." },
  { id: "p18", subcategoria: "Especiales", nombre: "Caipiriña", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel7Image, descripcion: "Cóctel de origen brasileño preparado tradicionalmente con cachaça, limón verde, azúcar y hielo." },
  { id: "p19", subcategoria: "Especiales", nombre: "Daiquiri", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel8Image, descripcion: "Cóctel de inspiración caribeña elaborado tradicionalmente con ron, jugo de limón y azúcar." },
  { id: "p20", subcategoria: "Especiales", nombre: "Gin Tonic de Frutos Rojos", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel9Image, descripcion: "Cóctel preparado tradicionalmente con ginebra, agua tónica y frutos rojos." },
  { id: "p21", subcategoria: "Especiales", nombre: "Gin Tonic", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel10Image, descripcion: "Cóctel clásico preparado con ginebra, agua tónica, hielo y un toque cítrico." },

  // --- Cerveza (Industrial / Botellas) ---
  { id: "p22", subcategoria: "Cerveza Industrial", nombre: "Paulaner", categoria: "Cerveza", precio: 45, icon: "cerveza", imagen: paulinerImage, descripcion: "Cerveza importada de alta calidad (variedades Weissbier, Dunkel y Lemon Radler)." },
  { id: "p23", subcategoria: "Cerveza Industrial", nombre: "Corona", categoria: "Cerveza", precio: 30, icon: "cerveza", imagen: coronaImage, descripcion: "Cerveza importada en botella individual." },
  { id: "p24", subcategoria: "Cerveza Industrial", nombre: "Balde de Corona", categoria: "Cerveza", precio: 150, icon: "cerveza", imagen: promoCervezaImage, descripcion: "Balde con selección de cervezas Corona en hielo." },
  { id: "p25", subcategoria: "Cerveza Industrial", nombre: "Prost", categoria: "Cerveza", precio: 40, icon: "cerveza", imagen: prostImage, descripcion: "Cerveza artesanal en botella." },
  { id: "p26", subcategoria: "Cerveza Industrial", nombre: "Heineken", categoria: "Cerveza", precio: 30, icon: "cerveza", imagen: heinekenImage, descripcion: "Cerveza Heineken en botella individual." },
  { id: "p27", subcategoria: "Cerveza Industrial", nombre: "Heineken 6 Pack", categoria: "Cerveza", precio: 150, icon: "cerveza", imagen: heinekenSixImage, descripcion: "Pack de 6 unidades de cerveza Heineken." },

  // --- Refrescos y Otros ---
  { id: "p28", subcategoria: "Gaseosas", nombre: "Refresco", categoria: "Refrescos", precio: 10, icon: "soda", imagen: ga1Image, descripcion: "Línea de gaseosas heladas, sabor a elección." },
  { id: "p29", subcategoria: "Naturales", nombre: "Limonada de la Casa", categoria: "Refrescos", precio: 12, icon: "soda", imagen: natu2Image, descripcion: "Limonada natural con un toque de hierbabuena." },
  
  // --- Rock & Wings ---
  { id: "p30", nombre: "Alitas Rock & Wings", categoria: "Rock & Wings", precio: 38, icon: "wings", imagen: rock1Image, descripcion: "8 alitas al estilo Rock & Wings, elige tu salsa: BBQ, picante o miel mostaza." },
  { id: "p31", nombre: "Pipocas de Pollo", categoria: "Rock & Wings", precio: 28, icon: "wings", imagen: piqueo3Image, descripcion: "Popcorn chicken crocante, bañado en la salsa de la casa Rock & Wings." },
  { id: "p32", subcategoria: "Cigarrillos", nombre: "Cajetilla de cigarrillos", categoria: "Refrescos", precio: 30, icon: "cigarrillos", imagen: ciga1Image, descripcion: "Cajetilla de cigarrillos." },
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
  { id: "b1", nombre: "Cerveza Pilsen", capacidadL: 50, litrosActuales: 36 },
  { id: "b2", nombre: "Cerveza Negra Dulce", capacidadL: 50, litrosActuales: 17 },
  { id: "b3", nombre: "Cerveza Miel", capacidadL: 50, litrosActuales: 30 },
  { id: "b4", nombre: "Cerveza Frutos Rojos", capacidadL: 50, litrosActuales: 17 },
  { id: "b5", nombre: "Cerveza Dunkel", capacidadL: 50, litrosActuales: 40 },
  { id: "b6", nombre: "Cerveza Chocolate", capacidadL: 50, litrosActuales: 50 },
  { id: "b7", nombre: "Cerveza Stout", capacidadL: 50, litrosActuales: 30 },
  { id: "b8", nombre: "Cerveza San Patricio", capacidadL: 50, litrosActuales: 30 },
];

export const PROMOCIONES_SEED: Promocion[] = [
  { id: "promo1", titulo: "2x1 en Cerveza Rubia", descripcion: "Pide una cerveza rubia de 500ml y la segunda va por la casa.", categoria: "Cerveza", precio: 22, imagen: promoCervezaImage, vigencia: "Hoy de 18:00 a 21:00", activa: true },
  { id: "promo2", titulo: "Combo Haus", descripcion: "Hamburguesa Haus + papas especiales + refresco a elección.", categoria: "Comidas", precio: 65, imagen: papasJamonImage, vigencia: "Hoy", activa: true },
];

export function formatHora(d: Date): string {
  return d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
}

export function minutosDesde(ts: number): number {
  return Math.max(0, Math.round((Date.now() - ts) / 60000));
}

/** Base de datos de demostración — sincronizada con el sistema. */
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
      { id: 101, mesa: 3, mesero: "Carlos", estado: "preparando", items: [{ nombre: "Piqueo Munich", cant: 1, precio: 89 }, { nombre: "Cuba Libre", cant: 2, precio: 30 }], hora: formatHora(new Date(haceMin(20))), ts: haceMin(20), total: 149 },
      { id: 102, mesa: 5, mesero: "Carlos", estado: "entregado", items: [{ nombre: "Tabla de Picaña", cant: 1, precio: 75 }, { nombre: "Refresco", cant: 2, precio: 10 }], hora: formatHora(new Date(haceMin(35))), ts: haceMin(35), total: 95 },
      { id: 103, mesa: 2, mesero: "Carlos", estado: "pendiente", items: [{ nombre: "Alitas Rock & Wings", cant: 2, precio: 38 }, { nombre: "Paulaner", cant: 2, precio: 45 }], hora: formatHora(new Date(haceMin(6))), ts: haceMin(6), total: 166 },
      { id: 104, mesa: 8, mesero: "Carlos", estado: "listo", items: [{ nombre: "Papas con jamón y queso", cant: 2, precio: 30 }, { nombre: "Piña Colada", cant: 2, precio: 35 }], hora: formatHora(new Date(haceMin(3))), ts: haceMin(3), total: 130 },
    ],
    ventas: [
      { id: 1, mesa: 4, mesero: "Carlos", items: [{ nombre: "Pique Rústico — Medio", cant: 1 }, { nombre: "Corona", cant: 2 }], subtotal: 120, propina: 10, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(240))), ts: haceMin(240) },
      { id: 2, mesa: 6, mesero: "Ana", items: [{ nombre: "Nachos", cant: 1 }, { nombre: "Refresco", cant: 2 }], subtotal: 45, propina: 8, metodoPago: "qr", calificacion: 5, hora: formatHora(new Date(haceMin(210))), ts: haceMin(210) },
      { id: 3, mesa: 1, mesero: "Luis", items: [{ nombre: "Alitas Rock & Wings", cant: 2 }, { nombre: "Heineken", cant: 2 }], subtotal: 136, propina: 12, metodoPago: "qr", calificacion: 4, hora: formatHora(new Date(haceMin(190))), ts: haceMin(190) },
      { id: 4, mesa: 7, mesero: "Ana", items: [{ nombre: "Tabla de Giba", cant: 2 }], subtotal: 150, propina: 15, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(160))), ts: haceMin(160) },
    ],
    productos: [
      ...MENU_SEED.map((p) => ({ ...p })),
      ...productosCervezaDeBarriles(BARRILES.map((b) => b.nombre)),
    ],
    nextProductoId: 33,
    promociones: PROMOCIONES_SEED.map((p) => ({ ...p })),
    nextPromocionId: 3,
    nextBarrilId: 9,
    notificaciones: [
      { id: 1, mesero: "Carlos", mesa: 8, pedidoId: 104, mensaje: "Pedido #104 listo para servir — Mesa 8", hora: formatHora(new Date(haceMin(3))), leida: false },
    ],
    nextPedidoId: 105,
    nextVentaId: 5,
    nextNotifId: 2,
    ventasSemana: [820, 1010, 940, 1180, 1400, 1850, 1620],
    meseros: [
      { id: "u1", nombre: "Carlos" },
      { id: "u2", nombre: "Luis" },
      { id: "u3", nombre: "Ana" },
    ],
    barriles: BARRILES.map((b) => ({ ...b })),
    rockWingsVentasManual: [
      { id: 1, monto: 340, fecha: "Hoy", nota: "Ventas del local Rock & Wings", hora: formatHora(new Date(haceMin(180))), ts: haceMin(180) },
    ],
    nextRockWingsManualId: 2,
    solicitudesFactura: [],
    nextFacturaId: 1,
  };
}