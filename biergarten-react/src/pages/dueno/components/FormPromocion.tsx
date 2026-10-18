import { useState } from "react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ImageUpload } from "../../../components/ui/ImageUpload";
import { Modal } from "../../../components/ui/Modal";
import { INPUT_CLASS } from "../../../lib/constants";
import { bs } from "../../../lib/format";
import { Icon } from "../../../lib/icons";
import { CATEGORIAS, TAB_PROMOS } from "../../../lib/menu";
import { useImagenUpload } from "../../../hooks/useImagenUpload";
import { useStore } from "../../../store/StoreContext";
import type { Promocion } from "../../../types";

const FORM_VACIO = {
  titulo: "",
  descripcion: "",
  categoria: CATEGORIAS[0],
  precio: "",
  vigencia: "",
  activa: true,
};

interface FormPromocionProps {
  conTitulo: boolean;
}

export function FormPromocion({ conTitulo }: FormPromocionProps) {
  const { db, agregarPromocion, editarPromocion, eliminarPromocion } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(FORM_VACIO);
  const upload = useImagenUpload();

  function abrirNueva() {
    setEditId(null);
    setForm(FORM_VACIO);
    upload.reset();
    setModalOpen(true);
  }

  function abrirEditar(promo: Promocion) {
    setEditId(promo.id);
    setForm({
      titulo: promo.titulo,
      descripcion: promo.descripcion,
      categoria: promo.categoria || "Otros",
      precio: String(promo.precio),
      vigencia: promo.vigencia,
      activa: promo.activa,
    });
    upload.reset(promo.imagen ?? null);
    setModalOpen(true);
  }

  function guardar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria,
      precio: Number(form.precio) || 0,
      imagen: upload.imagen,
      vigencia: form.vigencia.trim(),
      activa: form.activa,
    };
    if (editId) editarPromocion(editId, datos);
    else agregarPromocion(datos);
    setModalOpen(false);
  }

  const activas = db.promociones.filter((promo) => promo.activa).length;

  return (
    <section className="space-y-3">
      {conTitulo && (
        <div className="flex items-center gap-3">
          <h4 className="font-display text-gold text-sm tracking-wide">{TAB_PROMOS}</h4>
          <span className="flex-1 h-px bg-line" />
        </div>
      )}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-cream-dim">
          {db.promociones.length} promociones · {activas} activas · las activas aparecen al instante en el panel del mesero
        </p>
        <button className="btn-outline text-xs flex items-center gap-1.5 !py-1.5" onClick={abrirNueva}>
          <Icon name="plus" className="w-3.5 h-3.5" /> Nueva promoción
        </button>
      </div>
      {db.promociones.length === 0 ? (
        <EmptyState message="Todavía no hay promociones. Crea la primera con “Nueva promoción”." icon="promo" />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {db.promociones.map((promo) => (
            <article
              key={promo.id}
              className={`card overflow-hidden relative cursor-pointer flex flex-col ${promo.activa ? "border-gold/50" : "opacity-60"}`}
              onClick={() => abrirEditar(promo)}
            >
              <button type="button" className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-cream-dim hover:text-danger flex items-center justify-center z-10" onClick={(event) => { event.stopPropagation(); eliminarPromocion(promo.id); }} aria-label={`Eliminar promoción ${promo.titulo}`}>×</button>
              <div className="h-14 bg-gradient-to-br from-gold/25 to-bg-card-hi flex items-center justify-center text-gold">
                {promo.imagen ? <img src={promo.imagen} alt={promo.titulo} className="w-full h-full object-cover" /> : <Icon name="promo" className="w-6 h-6" />}
              </div>
              <div className="p-3 flex flex-col flex-1">
                <p className="text-sm text-cream font-semibold leading-tight">{promo.titulo}</p>
                <p className="text-[11px] text-cream-dim">{promo.categoria || "Otros"}</p>
                {promo.vigencia && <p className="text-[11px] text-gold-soft mt-0.5">{promo.vigencia}</p>}
                <p className="text-xs text-cream-dim mt-1.5 leading-snug">{promo.descripcion}</p>
                <div className="flex items-center justify-between gap-2 mt-auto pt-3">
                  <p className="text-sm text-gold font-semibold">{bs(promo.precio)}</p>
                  <button
                    type="button"
                    onClick={(event) => { event.stopPropagation(); editarPromocion(promo.id, { activa: !promo.activa }); }}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${promo.activa ? "bg-ok/20 text-ok" : "bg-line text-cream-dim"}`}
                  >
                    {promo.activa ? "Activa" : "Pausada"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {modalOpen && (
        <Modal title={editId ? "Editar promoción" : "Nueva promoción"} onClose={() => setModalOpen(false)}>
          <form onSubmit={guardar} className="space-y-4">
            <label className="block text-xs text-cream-dim">Título
              <input required value={form.titulo} onChange={(event) => setForm({ ...form, titulo: event.target.value })} placeholder="Ej: 2x1 en cerveza rubia" className={INPUT_CLASS} />
            </label>
            <label className="block text-xs text-cream-dim">Tipo de promoción
              <select value={form.categoria} onChange={(event) => setForm({ ...form, categoria: event.target.value })} className={INPUT_CLASS}>
                {[...CATEGORIAS, "Otros"].map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
              </select>
            </label>
            <label className="block text-xs text-cream-dim">Descripción
              <textarea required rows={3} value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} placeholder="Qué incluye la promoción — la verá el mesero" className={INPUT_CLASS} />
            </label>
            <ImageUpload image={upload.imagen} fileName={upload.nombreArchivo} onFileChange={upload.seleccionarArchivo} error={upload.error} label="Foto de la promoción" buttonText="Subir foto" imageAlt="Vista previa de la promoción" previewClassName="h-24 w-24" />
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-cream-dim">Precio (Bs.)
                <input required type="number" min="0" value={form.precio} onChange={(event) => setForm({ ...form, precio: event.target.value })} placeholder="0" className={INPUT_CLASS} />
              </label>
              <label className="text-xs text-cream-dim">Vigencia (opcional)
                <input value={form.vigencia} onChange={(event) => setForm({ ...form, vigencia: event.target.value })} placeholder="Hoy hasta las 21:00" className={INPUT_CLASS} />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-cream cursor-pointer">
              <input type="checkbox" checked={form.activa} onChange={(event) => setForm({ ...form, activa: event.target.checked })} className="accent-[#c9a23e] w-4 h-4" />
              Activa hoy (visible para los meseros)
            </label>
            <div className="flex justify-end gap-3 pt-2 border-t border-line">
              <button type="button" className="btn-outline text-sm" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button type="submit" className="btn-gold text-sm">Guardar promoción</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
