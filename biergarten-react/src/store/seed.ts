import type { Barril, DB, Producto, Promocion } from "../types";
import { productosCervezaDeBarriles } from "../lib/menu";

const imagenPublica = (nombre: string) => `${import.meta.env.BASE_URL}imagenes/${nombre}`;

// Botellas y Licores
const bo1Image = imagenPublica("bo1.jpg"); // Jägermeister
const bo2Image = imagenPublica("bo2.jpg"); // Tequila Jose Cuervo
const bo3Image = imagenPublica("bo3.jpg"); // Gin La República
const bo4Image = imagenPublica("bo4.jpg"); // Fernet Branca
const bo5Image = imagenPublica("bo5.webp"); // Ron Havana / Fernet
const bo6Image = imagenPublica("bo6.jpg"); // Casa Real

// Comidas / Carnes / Piqueos
const carnes1Image = imagenPublica("carnes2.jpg"); // Pique Rústico
const carnes2Image = imagenPublica("carnes1.jpg"); // Piqueo Munich
const carnes3Image = imagenPublica("carnes3.jpg"); // Tabla de Giba
const carnes4Image = imagenPublica("carnes4.jpg"); // Tabla de Picaña
const carnes5Image = imagenPublica("carnes5.jpg"); // Tabla Bife de Chorizo
const salchihauseImage = imagenPublica("carnes6.jpg"); // Salchihaus 
const carnes6Image = imagenPublica("piqueo3.jpg"); // Nachos / Piqueo
const papajamonImage = imagenPublica("papajamon.jpg"); // Papas jamón y queso
const pajamoImage = imagenPublica("pajamo.jpg"); // Salchihaus / Papas cheddar

// Cigarros
const ciga1Image = imagenPublica("ciga1.webp"); // Winston
const ciga2Image = imagenPublica("ciga2.webp"); // Bohem

// Cócteles
const coctel1Image = imagenPublica("coctel1.jpg"); // Cuba Libre
const coctel2Image = imagenPublica("coctel2.jpg"); // Fernet
const coctel3Image = imagenPublica("coctel3.jpg"); // Chuflay
const coctel4Image = imagenPublica("coctel4.jpg"); // Tequila Sunrise
const coctel5Image = imagenPublica("coctel5.jpg"); // Wisky a las rocas
const coctel6Image = imagenPublica("coctel6.jpg"); // Piña Colada
const coctel7Image = imagenPublica("coctel7.jpg"); // Caipiriña
const coctel8Image = imagenPublica("coctel8.jpg"); // Daiquiri
const coctel9Image = imagenPublica("coctel9.jpg"); // Gin Tonic Frutos Rojos
const coctel10Image = imagenPublica("coctel10.jpg"); // Gin Tonic

// Cervezas Industriales y Baldes
const coronaImage = imagenPublica("corona.jpg");
const baldeCoronaImage = imagenPublica("balde-corona.webp");
const paulanerImage = imagenPublica("paulaner.jpg");
const prostImage = imagenPublica("prost.jpg");
const heinekenImage = imagenPublica("heineken.jpg");
const heinekenSixImage = imagenPublica("heineken six.jpg");


// Gaseosas y Refrescos Naturales
const ga1Image = imagenPublica("ga1.jpg"); // Coca Cola / Fanta / Sprite 500ml
const ga2Image = imagenPublica("ga2.jpg"); // Gaseosas variadas
const ga3Image = imagenPublica("ga3.webp"); // Agua Vital
const ga4Image = imagenPublica("ga4.jpg"); // Coca Cola 1L
const natu1Image = imagenPublica("natu1.jpg"); // Jugo Natural Normal
const natu2Image = imagenPublica("natu2.jpg"); // Jugo Frapeado

// Rock & Wings
const rock1Image = imagenPublica("rock1.jpg"); // Alitas
const rock2Image = imagenPublica("rock2.jpg"); // Alitas Bañadas
const rock3Image = imagenPublica("rock3.jpg"); // Tenders

// Vinos
const vi1Image = imagenPublica("vi1.jpg"); // Vino Tinto
const vi2Image = imagenPublica("vi2.jpg"); // Vino Blanco
const vi3Image = imagenPublica("vi3.jpg"); // Vino Rosé
const vi4Image = imagenPublica("vi4.webp"); // Vino Rosé Semidulce

/* ==========================================================================
   MENÚ SEMILLA COMPLETO (Sincronizado 1:1 con las capturas de pantalla)
   ========================================================================== */
export const MENU_SEED: Producto[] = [
  // ------------------ COMIDAS: PIQUEO ------------------
  { id: "p1", subcategoria: "Piqueo", nombre: "Papas con jamón y queso", categoria: "Comidas", precio: 30, icon: "papas", imagen: papajamonImage, descripcion: "Crujientes papas fritas acompañadas de trocitos de jamón y una deliciosa capa de queso fundido." },
  { id: "p2", subcategoria: "Piqueo", nombre: "Papas con queso cheddar y tocino", categoria: "Comidas", precio: 30, icon: "papas", imagen: pajamoImage, descripcion: "Deliciosas papas fritas doradas cubiertas con cremosa salsa de queso cheddar y crujientes trocitos de tocino." },
  { id: "p3", subcategoria: "Piqueo", nombre: "Nachos", categoria: "Comidas", precio: 25, icon: "pizza", imagen: carnes6Image, descripcion: "Crujientes totopos de maíz, ideales para picar y compartir." },

  // ------------------ COMIDAS: CARNES ------------------
  { id: "p4", subcategoria: "Carnes", nombre: "Piqueo Munich", categoria: "Comidas", precio: 89, icon: "plate", imagen: carnes2Image, descripcion: "Piqueo abundante para compartir, preparado con una variedad de carnes, salchichas, papas fritas y salsas para acompañar. Ideal para disfrutar entre amigos en un ambiente cervecero." },
  { id: "p5", subcategoria: "Carnes", nombre: "Pique Rústico — Entero", categoria: "Comidas", precio: 100, icon: "plate", imagen: carnes1Image, descripcion: "Delicioso pique rústico preparado con jugosos trozos de carne, papas doradas, chorizo y salchichas, acompañado de salsas que realzan cada bocado." },
  { id: "p6", subcategoria: "Carnes", nombre: "Pique Rústico — Medio", categoria: "Comidas", precio: 60, icon: "plate", imagen: carnes1Image, descripcion: "Delicioso pique rústico preparado con jugosos trozos de carne, papas doradas, chorizo y salchichas, acompañado de salsas que realzan cada bocado." },
  { id: "p7", subcategoria: "Carnes", nombre: "Tabla de Giba", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes3Image, descripcion: "Tabla de giba preparada a la parrilla, servida en porciones y acompañada de guarniciones y salsas. Una opción ideal para los amantes de la carne asada." },
  { id: "p8", subcategoria: "Carnes", nombre: "Tabla de Picaña", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes4Image, descripcion: "Picaña de res preparada a la parrilla y cortada en porciones, servida con guarniciones y salsas para acompañar." },
  { id: "p9", subcategoria: "Carnes", nombre: "Tabla de Bife de Chorizo", categoria: "Comidas", precio: 75, icon: "plate", imagen: carnes5Image, descripcion: "Bife de chorizo de res cocinado a la parrilla y servido en una tabla, con guarniciones y salsas para complementar su sabor." },
  { id: "p10", subcategoria: "Carnes", nombre: "Salchihaus - Medio", categoria: "Comidas", precio: 35, icon: "plate", imagen: salchihauseImage, descripcion: "Deliciosa salchipapa preparada con crujientes papas fritas y salchichas doradas, acompañadas de salsas que realzan su sabor." },
  { id: "p11", subcategoria: "Carnes", nombre: "Salchihaus - Entero", categoria: "Comidas", precio: 60, icon: "plate", imagen: salchihauseImage, descripcion: "Deliciosa salchipapa preparada con crujientes papas fritas y salchichas doradas, acompañadas de salsas que realzan su sabor." },

  // ------------------ CÓCTELES: CLÁSICOS ------------------
  { id: "p12", subcategoria: "Clásicos", nombre: "Cuba Libre", categoria: "Cócteles", precio: 30, icon: "coctel", imagen: coctel1Image, descripcion: "Refrescante cóctel preparado con ron, bebida de cola, hielo y un toque de limón. Una combinación clásica, cítrica y perfecta para disfrutar bien frío." },
  { id: "p13", subcategoria: "Clásicos", nombre: "Fernet", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel2Image, descripcion: "Cóctel de sabor intenso y herbal, preparado tradicionalmente con fernet, bebida de cola y hielo. Ideal para quienes disfrutan de sabores marcados y refrescantes." },
  { id: "p14", subcategoria: "Clásicos", nombre: "Chuflay", categoria: "Cócteles", precio: 25, icon: "coctel", imagen: coctel3Image, descripcion: "Cóctel tradicional boliviano elaborado con singani, ginger ale, hielo y limón. Ligero, burbujeante y con un agradable equilibrio entre notas cítricas y dulces." },
  { id: "p15", subcategoria: "Clásicos", nombre: "Tequila Sunrise", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel4Image, descripcion: "Colorido cóctel preparado tradicionalmente con tequila, jugo de naranja y granadina. Destaca por sus tonos degradados y su combinación de sabores cítricos y dulces." },
  { id: "p16", subcategoria: "Clásicos", nombre: "Wisky a las rocas", categoria: "Cócteles", precio: 30, icon: "coctel", imagen: coctel5Image, descripcion: "Whisky servido con cubos de hielo para disfrutar lentamente de su aroma, sus notas amaderadas y su sabor característico." },

  // ------------------ CÓCTELES: ESPECIALES ------------------
  { id: "p17", subcategoria: "Especiales", nombre: "Piña Colada", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel6Image, descripcion: "Cóctel tropical cremoso preparado tradicionalmente con piña, crema o leche de coco y ron. Su textura suave y su sabor dulce evocan una refrescante combinación de frutas tropicales." },
  { id: "p18", subcategoria: "Especiales", nombre: "Caipiriña", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel7Image, descripcion: "Cóctel de origen brasileño preparado tradicionalmente con cachaça, limón verde, azúcar y hielo. Ofrece un perfil cítrico, dulce y refrescante." },
  { id: "p19", subcategoria: "Especiales", nombre: "Daiquiri", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel8Image, descripcion: "Cóctel de inspiración caribeña elaborado tradicionalmente con ron, jugo de limón y azúcar. Su sabor combina notas cítricas y dulces." },
  { id: "p20", subcategoria: "Especiales", nombre: "Gin Tonic de Frutos Rojos", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel9Image, descripcion: "Cóctel preparado tradicionalmente con ginebra, agua tónica y frutos rojos que aportan notas frutales y un toque de acidez." },
  { id: "p21", subcategoria: "Especiales", nombre: "Gin Tonic", categoria: "Cócteles", precio: 35, icon: "coctel", imagen: coctel10Image, descripcion: "Cóctel clásico preparado con ginebra, agua tónica, hielo y un toque cítrico. Destaca por su frescura, sus notas botánicas y su característico equilibrio." },

  // ------------------ CERVEZA INDUSTRIAL ------------------
  { id: "p22", subcategoria: "Cerveza industrial", nombre: "Paulaner", categoria: "Cerveza", precio: 45, icon: "cerveza", imagen: paulanerImage, descripcion: "Cerveza importada de alta calidad (variedades Weissbier, Dunkel y Lemon Radler)." },
  { id: "p23", subcategoria: "Cerveza industrial", nombre: "Corona", categoria: "Cerveza", precio: 30, icon: "cerveza", imagen: coronaImage, descripcion: "Cerveza importada en botella individual." },
  { id: "p24", subcategoria: "Cerveza industrial", nombre: "Balde de Corona", categoria: "Cerveza", precio: 150, icon: "cerveza", imagen: baldeCoronaImage, descripcion: "Balde con selección de cervezas Corona en hielo." },
  { id: "p25", subcategoria: "Cerveza industrial", nombre: "Prost", categoria: "Cerveza", precio: 40, icon: "cerveza", imagen: prostImage, descripcion: "Cerveza artesanal en botella." },
  { id: "p26", subcategoria: "Cerveza industrial", nombre: "Heineken", categoria: "Cerveza", precio: 30, icon: "cerveza", imagen: heinekenImage, descripcion: "Cerveza Heineken en botella individual." },
  { id: "p27", subcategoria: "Cerveza industrial", nombre: "Heineken 6 Pack", categoria: "Cerveza", precio: 150, icon: "cerveza", imagen: heinekenSixImage, descripcion: "Pack de 6 unidades de cerveza Heineken." },

  // ------------------ BOTELLAS: COMBO EN BOTELLA ------------------
  { id: "p28", subcategoria: "Combo en botella", nombre: "Jägermeister", categoria: "Botellas", precio: 300, icon: "cerveza", imagen: bo1Image, descripcion: "Botella de licor Jägermeister." },
  { id: "p29", subcategoria: "Combo en botella", nombre: "Tequila Jose Cuervo", categoria: "Botellas", precio: 299, icon: "cerveza", imagen: bo2Image, descripcion: "Botella de Tequila Jose Cuervo Especial." },
  { id: "p30", subcategoria: "Combo en botella", nombre: "Gin La República", categoria: "Botellas", precio: 290, icon: "cerveza", imagen: bo3Image, descripcion: "Botella de Gin La República." },
  { id: "p31", subcategoria: "Combo en botella", nombre: "Fernet Branca", categoria: "Botellas", precio: 300, icon: "cerveza", imagen: bo4Image, descripcion: "Botella de Fernet Branca." },
  { id: "p32", subcategoria: "Combo en botella", nombre: "Botella de Fernet Branca.", categoria: "Botellas", precio: 300, icon: "cerveza", imagen: bo5Image, descripcion: "Botella de Ron Havana Club Reserva." },
  { id: "p33", subcategoria: "Combo en botella", nombre: "Casa Real Etiqueta Negra", categoria: "Botellas", precio: 280, icon: "cerveza", imagen: bo6Image, descripcion: "Botella de singani Casa Real Etiqueta Negra." },

  // ------------------ BOTELLAS: VINOS ------------------
  { id: "p34", subcategoria: "Vinos", nombre: "Vino Tinto (Campos de Solana)", categoria: "Botellas", precio: 55, icon: "cerveza", imagen: vi1Image, descripcion: "Botella de vino tinto." },
  { id: "p35", subcategoria: "Vinos", nombre: "Vino Blanco (Campos de Solana)", categoria: "Botellas", precio: 55, icon: "cerveza", imagen: vi2Image, descripcion: "Botella de vino blanco." },
  { id: "p36", subcategoria: "Vinos", nombre: "Vino Rosé", categoria: "Botellas", precio: 95, icon: "cerveza", imagen: vi3Image, descripcion: "Botella de vino rosado." },
  { id: "p37", subcategoria: "Vinos", nombre: "Vino Rosé Semidulce", categoria: "Botellas", precio: 65, icon: "cerveza", imagen: vi4Image, descripcion: "Botella de vino rosado semidulce." },

  // ------------------ REFRESCOS: NATURALES ------------------
  { id: "p38", subcategoria: "Naturales", nombre: "Jugo Natural - Normal", categoria: "Refrescos", precio: 12, icon: "soda", imagen: natu1Image, descripcion: "Jugo natural preparación normal (Sabores: Limonada, Frutilla, Piña, Maracuyá, Frutos Rojos)." },
  { id: "p39", subcategoria: "Naturales", nombre: "Jugo Natural (Frapeado)", categoria: "Refrescos", precio: 20, icon: "soda", imagen: natu2Image, descripcion: "Jugo natural preparación frapeada/hielo licuado (Sabores: Limonada, Frutilla, Piña, Maracuyá, Frutos Rojos)." },

  // ------------------ REFRESCOS: GASEOSAS ------------------
  { id: "p40", subcategoria: "Gaseosas", nombre: "Gaseosa 500ml (Coca Cola / Zero / Sprite / Fanta)", categoria: "Refrescos", precio: 12, icon: "soda", imagen: ga1Image, descripcion: "Gaseosa personal de 500ml (opciones: Coca Cola, Coca Cola Zero, Sprite, Fanta)." },
  { id: "p41", subcategoria: "Gaseosas", nombre: "Agua Vital 500ml", categoria: "Refrescos", precio: 6, icon: "soda", imagen: ga3Image, descripcion: "Botella de agua de 500ml." },
  { id: "p42", subcategoria: "Gaseosas", nombre: "Gaseosa 1L (Coca Cola / Sprite)", categoria: "Refrescos", precio: 20, icon: "soda", imagen: ga4Image, descripcion: "Botella de gaseosa de 1 Litro (Coca Cola o Sprite)." },

  // ------------------ CIGARRILLOS ------------------
  { id: "p43", subcategoria: "Cigarrillos", nombre: "Cigarros Winston", categoria: "Refrescos", precio: 30, icon: "cigarrillos", imagen: ciga1Image, descripcion: "Cajetilla de cigarros Winston." },
  { id: "p44", subcategoria: "Cigarrillos", nombre: "Cigarros Bohem", categoria: "Refrescos", precio: 30, icon: "cigarrillos", imagen: ciga2Image, descripcion: "Cajetilla de cigarros Bohem." },

  // ------------------ ROCK & WINGS ------------------
  { id: "p45", nombre: "Alitas - 6 piezas", categoria: "Rock & Wings", precio: 35, icon: "wings", imagen: rock1Image, descripcion: "6 Piezas incluye papas y salsa." },
  { id: "p46", nombre: "Alitas - 12 piezas", categoria: "Rock & Wings", precio: 65, icon: "wings", imagen: rock1Image, descripcion: "12 Piezas incluye papas y salsa." },
  { id: "p47", nombre: "Alitas Bañadas - 6 piezas", categoria: "Rock & Wings", precio: 40, icon: "wings", imagen: rock2Image, descripcion: "6 Piezas bañadas con salsa incluye papas." },
  { id: "p48", nombre: "Alitas Bañadas - 12 piezas", categoria: "Rock & Wings", precio: 70, icon: "wings", imagen: rock2Image, descripcion: "12 Piezas bañadas con salsa incluye papas." },
  { id: "p49", nombre: "Tenders", categoria: "Rock & Wings", precio: 35, icon: "wings", imagen: rock3Image, descripcion: "6 Filetes de pecho, papas + salsas." },
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
  { id: "promo1", titulo: "2x1 en Cerveza Rubia", descripcion: "Pide una cerveza rubia de 500ml y la segunda va por la casa.", categoria: "Cerveza", precio: 22, imagen: baldeCoronaImage, vigencia: "Hoy de 18:00 a 21:00", activa: true },
  { id: "promo2", titulo: "Combo Haus", descripcion: "Hamburguesa Haus + papas especiales + refresco a elección.", categoria: "Comidas", precio: 65, imagen: papajamonImage, vigencia: "Hoy", activa: true },
];

export function formatHora(d: Date): string {
  return d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
}

export function minutosDesde(ts: number): number {
  return Math.max(0, Math.round((Date.now() - ts) / 60000));
}

/** Base de datos de demostración — sincronizada completamente con la plataforma. */
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
      { id: 102, mesa: 5, mesero: "Carlos", estado: "entregado", items: [{ nombre: "Tabla de Picaña", cant: 1, precio: 75 }, { nombre: "Gaseosa 500ml (Coca Cola / Zero / Sprite / Fanta)", cant: 2, precio: 12 }], hora: formatHora(new Date(haceMin(35))), ts: haceMin(35), total: 99 },
      { id: 103, mesa: 2, mesero: "Carlos", estado: "pendiente", items: [{ nombre: "Alitas - 12 piezas", cant: 1, precio: 65 }, { nombre: "Paulaner", cant: 2, precio: 45 }], hora: formatHora(new Date(haceMin(6))), ts: haceMin(6), total: 155 },
      { id: 104, mesa: 8, mesero: "Carlos", estado: "listo", items: [{ nombre: "Papas con jamón y queso", cant: 2, precio: 30 }, { nombre: "Piña Colada", cant: 2, precio: 35 }], hora: formatHora(new Date(haceMin(3))), ts: haceMin(3), total: 130 },
    ],
    ventas: [
      { id: 1, mesa: 4, mesero: "Carlos", items: [{ nombre: "Pique Rústico — Medio", cant: 1 }, { nombre: "Corona", cant: 2 }], subtotal: 120, propina: 10, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(240))), ts: haceMin(240) },
      { id: 2, mesa: 6, mesero: "Ana", items: [{ nombre: "Nachos", cant: 1 }, { nombre: "Jugo Natural - Normal", cant: 2 }], subtotal: 49, propina: 8, metodoPago: "qr", calificacion: 5, hora: formatHora(new Date(haceMin(210))), ts: haceMin(210) },
      { id: 3, mesa: 1, mesero: "Luis", items: [{ nombre: "Alitas - 6 piezas", cant: 2 }, { nombre: "Heineken", cant: 2 }], subtotal: 130, propina: 12, metodoPago: "qr", calificacion: 4, hora: formatHora(new Date(haceMin(190))), ts: haceMin(190) },
      { id: 4, mesa: 7, mesero: "Ana", items: [{ nombre: "Tabla de Giba", cant: 2 }], subtotal: 150, propina: 15, metodoPago: "efectivo", calificacion: 5, hora: formatHora(new Date(haceMin(160))), ts: haceMin(160) },
    ],
    productos: [
      ...MENU_SEED.map((p) => ({ ...p })),
      ...productosCervezaDeBarriles(BARRILES.map((b) => b.nombre)),
    ],
    nextProductoId: 50,
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