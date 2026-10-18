import { useState } from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { TabBar } from "../../../components/ui/TabBar";
import { MenuSecciones } from "../../../components/menu/MenuSecciones";
import { SubTabs } from "../../../components/menu/SubTabs";
import { bs } from "../../../lib/format";
import { Icon } from "../../../lib/icons";
import {
  CATEGORIAS,
  filtrarPorPresentacion,
  filtrarPorSub,
  PRESENTACIONES_CERVEZA_ARTESANAL,
  presentacionesDe,
  subcategoriasDe,
  TAB_PROMOS,
} from "../../../lib/menu";
import { useStore } from "../../../store/StoreContext";
import { CATEGORIA_ICONS } from "../../../store/seed";
import type { Producto } from "../../../types";
import { BarrilesCard } from "../components/BarrilesCard";
import { FormProducto } from "../components/FormProducto";
import { FormPromocion } from "../components/FormPromocion";

const TABS = ["Todos", ...CATEGORIAS, TAB_PROMOS];

export function ProductosView() {
  const { db, agregarProducto, editarProducto, eliminarProducto } = useStore();
  const [tab, setTab] = useState("Todos");
  const [subSel, setSubSel] = useState("");
  const [presentacionSel, setPresentacionSel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  const [categoriaInicial, setCategoriaInicial] = useState(CATEGORIAS[0]);
  const [subcategoriaInicial, setSubcategoriaInicial] = useState("");
  const [presentacionInicial, setPresentacionInicial] = useState("");

  function abrirNuevo() {
    const categoria = CATEGORIAS.includes(tab) ? tab : CATEGORIAS[0];
    const subcategoria = categoria === "Rock & Wings"
      ? ""
      : categoria === "Cerveza"
        ? subSel || "Cerveza artesanal"
        : categoria === "Botellas"
          ? subSel || "Combo en botella"
          : "";
    const presentacion = categoria === "Cerveza" && subcategoria === "Cerveza artesanal"
      ? presentacionSel || PRESENTACIONES_CERVEZA_ARTESANAL[0]
      : "";
    setProductoEditar(null);
    setCategoriaInicial(categoria);
    setSubcategoriaInicial(subcategoria);
    setPresentacionInicial(presentacion);
    setModalOpen(true);
  }

  function abrirEditar(producto: Producto) {
    setProductoEditar(producto);
    setModalOpen(true);
  }

  function guardarProducto(id: string | null, producto: Omit<Producto, "id">) {
    if (id) editarProducto(id, producto);
    else agregarProducto(producto);
    setModalOpen(false);
  }

  const esPromos = tab === TAB_PROMOS;
  const deLaCategoria = tab === "Todos" || esPromos ? [] : db.productos.filter((producto) => producto.categoria === tab);
  const subs = subcategoriasDe(deLaCategoria, tab);
  const sub = subs.length ? (subs.includes(subSel) ? subSel : subs[0]) : "";
  const cervezaArtesanal = tab === "Cerveza" && sub === "Cerveza artesanal";
  const productosDeSub = tab === "Todos"
    ? db.productos
    : esPromos
      ? []
      : subs.length
        ? filtrarPorSub(deLaCategoria, sub)
        : deLaCategoria;
  const presentaciones = cervezaArtesanal ? presentacionesDe(productosDeSub, true) : [];
  const presentacion = presentaciones.length
    ? presentaciones.includes(presentacionSel) ? presentacionSel : presentaciones[0]
    : "";
  const productosFiltrados = cervezaArtesanal
    ? filtrarPorPresentacion(productosDeSub, presentacion)
    : productosDeSub;

  return (
    <div className="space-y-6">
      <BarrilesCard />
      <section className="card p-5">
        <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-display text-cream mb-1">Menú / Productos</h3>
            <p className="text-xs text-cream-dim">Lo que añadas aquí aparece al instante en el panel del mesero</p>
          </div>
          <button className="btn-gold text-sm flex items-center gap-2" onClick={abrirNuevo}>
            <Icon name="plus" className="w-4 h-4" /> Añadir producto
          </button>
        </div>

        <TabBar
          tabs={TABS.map((categoria) => ({
            value: categoria,
            label: <><Icon name={(CATEGORIA_ICONS[categoria] as any) ?? "productos"} className="w-3.5 h-3.5" />{categoria}</>,
          }))}
          active={tab}
          onChange={(categoria) => { setTab(categoria); setSubSel(""); setPresentacionSel(""); }}
          className="mb-3"
        />

        {!esPromos && <p className="text-xs text-gold mb-4">{productosFiltrados.length} productos en el menú</p>}
        {subs.length > 0 && (
          <div className="mb-4">
            <SubTabs titulo={tab} subs={subs} activa={sub} onChange={(value) => { setSubSel(value); setPresentacionSel(""); }} />
          </div>
        )}
        {presentaciones.length > 0 && (
          <div className="mb-4">
            <SubTabs titulo="Presentación" subs={presentaciones} activa={presentacion} onChange={setPresentacionSel} />
          </div>
        )}

        {esPromos && <FormPromocion conTitulo={false} />}
        {!esPromos && (
          <>
            {productosFiltrados.length === 0 ? (
              <EmptyState message="No hay productos en esta categoría." />
            ) : (
              <MenuSecciones
                productos={productosFiltrados}
                mostrarCategorias={tab === "Todos"}
                mostrarSubsecciones={tab === "Todos"}
                renderProducto={(producto) => (
                  <article key={producto.id} className="card overflow-hidden relative cursor-pointer flex flex-col" onClick={() => abrirEditar(producto)}>
                    <button
                      type="button"
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-cream-dim hover:text-danger flex items-center justify-center z-10"
                      onClick={(event) => { event.stopPropagation(); eliminarProducto(producto.id); }}
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      ×
                    </button>
                    <div className="h-20 bg-bg-card-hi flex items-center justify-center text-gold">
                      {producto.imagen && producto.categoria !== "Cerveza"
                        ? <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
                        : <Icon name={(producto.icon as any) ?? "plate"} className="w-7 h-7" />}
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <p className="text-sm text-cream font-semibold leading-tight">{producto.nombre}</p>
                      <p className="text-[11px] text-cream-dim">
                        {producto.categoria}{producto.subcategoria ? ` · ${producto.subcategoria}` : ""}{producto.presentacion ? ` · ${producto.presentacion}` : ""}
                      </p>
                      {producto.descripcion && <p className="text-xs text-cream-dim mt-1.5 leading-snug">{producto.descripcion}</p>}
                      <p className="text-sm text-gold font-semibold mt-auto pt-2">{bs(producto.precio)}</p>
                    </div>
                  </article>
                )}
              />
            )}
          </>
        )}

        {tab === "Todos" && db.promociones.length > 0 && (
          <div className="mt-6"><FormPromocion conTitulo /></div>
        )}
      </section>
      {modalOpen && (
        <FormProducto
          key={productoEditar?.id ?? "nuevo"}
          producto={productoEditar}
          productos={db.productos}
          categoriaInicial={categoriaInicial}
          subcategoriaInicial={subcategoriaInicial}
          presentacionInicial={presentacionInicial}
          presentaciones={PRESENTACIONES_CERVEZA_ARTESANAL}
          onClose={() => setModalOpen(false)}
          onSave={guardarProducto}
        />
      )}
    </div>
  );
}
