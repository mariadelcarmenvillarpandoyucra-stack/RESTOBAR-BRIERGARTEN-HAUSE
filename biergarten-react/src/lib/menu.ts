import type { Producto } from "../types";

/** Categorías fijas del menú (Promociones es un apartado aparte, con su propia gestión). */
export const CATEGORIAS = ["Comidas", "Cócteles", "Cerveza", "Botellas", "Refrescos", "Rock & Wings"];

/**
 * Subcategorías sugeridas por categoría. El dueño puede escribir otras
 * al crear un producto; las que use aparecerán solas como secciones.
 */
export const SUBCATEGORIAS_SUGERIDAS: Record<string, string[]> = {
  Comidas: ["Piqueo", "Carnes"],
  "Cócteles": ["Clásicos", "Especiales"],
  Cerveza: ["Cerveza artesanal", "Cerveza industrial"],
  Botellas: ["Combo en botella", "Vinos"],
  Refrescos: ["Naturales", "Gaseosas", "Cigarrillos"],
};

export const PRESENTACIONES_CERVEZA_ARTESANAL = [
  "Chop de 350 ml",
  "Chop de 500 ml",
  "Chop de 1 L",
  "Torre de cerveza",
  "Metro de cerveza",
];

export const PRECIOS_CERVEZA_ARTESANAL: Record<string, number> = {
  "Chop de 350 ml": 16,
  "Chop de 500 ml": 26,
  "Chop de 1 L": 49,
  "Torre de cerveza": 139,
  "Metro de cerveza": 139,
};

export const VARIEDADES_CERVEZA_ARTESANAL = [
  { nombre: "Pilsen", descripcion: "Cerveza tipo pils, también conocida como Pilsen." },
  { nombre: "Frutos Rojos", descripcion: "Cerveza de tonalidad rojiza brillante, con gusto prominente a frutos rojos y cuerpo." },
  { nombre: "Negra Dulce", descripcion: "Cerveza negra dulce, elaborada con maltas." },
  { nombre: "Dunkel", descripcion: "Cerveza oscura de estilo alemán, con sabor suave a malta." },
  { nombre: "Miel", descripcion: "Cerveza elaborada con miel, de sabor dulce y mayor contenido alcohólico." },
  { nombre: "Chocolate", descripcion: "Cerveza con buena cantidad de malta y chocolate, de color y sabor intensos." },
  { nombre: "Stout", descripcion: "Cerveza de 7 a 8 % de alcohol; puede ser dulce o seca." },
  { nombre: "San Patricio", descripcion: "Cerveza verde tradicional irlandesa, celebrada el Día de San Patricio." },
];

const slug = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function productosCervezaDeBarriles(nombres: string[]): Producto[] {
  return Array.from(new Set(nombres.map((nombre) => nombre.trim()).filter(Boolean))).flatMap((nombre) =>
    PRESENTACIONES_CERVEZA_ARTESANAL.map((presentacion) => ({
    id: `cerveza-barril-${slug(nombre)}-${slug(presentacion)}`,
    nombre,
    categoria: "Cerveza",
    subcategoria: "Cerveza artesanal",
    presentacion,
    precio: PRECIOS_CERVEZA_ARTESANAL[presentacion],
    icon: "cerveza",
    imagen: null,
    descripcion: VARIEDADES_CERVEZA_ARTESANAL.find((variedad) => variedad.nombre === nombre.replace(/^Cerveza\s+/i, ""))?.descripcion ?? "",
    }))
  );
}

/** Pestaña del menú donde viven las promociones (junto a las categorías). */
export const TAB_PROMOS = "Promociones del día";

export const SUB_OTROS = "Otros";

/** Subcategorías de un conjunto de productos (de una sola categoría), en orden estable. */
export function subcategoriasDe(productos: Producto[], categoria?: string): string[] {
  const categoriaMenu = categoria ?? productos[0]?.categoria;
  if (!productos.length && !categoriaMenu) return [];
  const grupos = agruparMenu(productos);
  const subs = grupos.flatMap((g) => g.subgrupos);
  const nombres = subs.flatMap((sg) => sg.nombre === null ? [] : [sg.nombre]);
  const fijas = categoriaMenu === "Cerveza" || categoriaMenu === "Cócteles" || categoriaMenu === "Botellas"
    ? SUBCATEGORIAS_SUGERIDAS[categoriaMenu]
    : [];
  if (!fijas.length && !nombres.length) return [];

  const resultado = [...new Set([...fijas, ...nombres])];
  if (subs.some((sg) => sg.nombre === null)) resultado.push(SUB_OTROS);
  return resultado;
}

export function filtrarPorSub(productos: Producto[], sub: string): Producto[] {
  return productos.filter((p) => {
    const s = (p.subcategoria ?? "").trim();
    return sub === SUB_OTROS ? !s : s === sub;
  });
}

export function presentacionesDe(productos: Producto[], incluirVacias = false): string[] {
  const presentes = new Set(productos.map((p) => p.presentacion?.trim()).filter((p): p is string => Boolean(p)));
  const ordenadas = incluirVacias
    ? PRESENTACIONES_CERVEZA_ARTESANAL
    : PRESENTACIONES_CERVEZA_ARTESANAL.filter((presentacion) => presentes.has(presentacion));
  const adicionales = Array.from(presentes).filter((presentacion) => !PRESENTACIONES_CERVEZA_ARTESANAL.includes(presentacion)).sort();
  const resultado = [...ordenadas, ...adicionales];
  if (productos.some((p) => !p.presentacion?.trim())) resultado.push("Sin presentación");
  return resultado;
}

export function filtrarPorPresentacion(productos: Producto[], presentacion: string): Producto[] {
  return productos.filter((p) =>
    presentacion === "Sin presentación" ? !p.presentacion?.trim() : p.presentacion === presentacion
  );
}

export interface SubGrupo {
  /** null = productos sin subcategoría */
  nombre: string | null;
  productos: Producto[];
}

export interface GrupoCategoria {
  categoria: string;
  subgrupos: SubGrupo[];
}

/** Agrupa los productos por categoría → subcategoría, con un orden estable y predecible. */
export function agruparMenu(productos: Producto[]): GrupoCategoria[] {
  const ordenCat = (c: string) => {
    const i = CATEGORIAS.indexOf(c);
    return i === -1 ? CATEGORIAS.length : i;
  };
  const categorias = Array.from(new Set(productos.map((p) => p.categoria))).sort(
    (a, b) => ordenCat(a) - ordenCat(b) || a.localeCompare(b)
  );

  return categorias.map((categoria) => {
    const delaCat = productos.filter((p) => p.categoria === categoria);
    const sugeridas = SUBCATEGORIAS_SUGERIDAS[categoria] ?? [];
    const nombres = Array.from(
      new Set(delaCat.map((p) => (p.subcategoria ?? "").trim()).filter(Boolean))
    ).sort((a, b) => {
      const ia = sugeridas.indexOf(a);
      const ib = sugeridas.indexOf(b);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.localeCompare(b);
    });

    const subgrupos: SubGrupo[] = nombres.map((nombre) => ({
      nombre,
      productos: delaCat.filter((p) => (p.subcategoria ?? "").trim() === nombre),
    }));
    const sueltos = delaCat.filter((p) => !(p.subcategoria ?? "").trim());
    if (sueltos.length) subgrupos.push({ nombre: null, productos: sueltos });

    return { categoria, subgrupos };
  });
}
