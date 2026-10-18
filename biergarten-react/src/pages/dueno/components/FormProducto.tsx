import { useFormProducto } from "../../../hooks/useFormProducto";
import { useImagenUpload } from "../../../hooks/useImagenUpload";
import { ImageUpload } from "../../../components/ui/ImageUpload";
import { Modal } from "../../../components/ui/Modal";
import { INPUT_CLASS } from "../../../lib/constants";
import { SUBCATEGORIAS_SUGERIDAS, CATEGORIAS } from "../../../lib/menu";
import type { Producto } from "../../../types";

interface FormProductoProps {
  producto: Producto | null;
  productos: Producto[];
  categoriaInicial: string;
  subcategoriaInicial: string;
  presentacionInicial: string;
  presentaciones: string[];
  onClose: () => void;
  onSave: (id: string | null, producto: Omit<Producto, "id">) => void;
}

export function FormProducto({
  producto,
  productos,
  categoriaInicial,
  subcategoriaInicial,
  presentacionInicial,
  presentaciones,
  onClose,
  onSave,
}: FormProductoProps) {
  const form = useFormProducto(producto ? {
    nombre: producto.nombre,
    categoria: producto.categoria,
    subcategoria: producto.subcategoria ?? "",
    presentacion: producto.presentacion ?? "",
    precio: String(producto.precio),
    descripcion: producto.descripcion,
  } : {
    nombre: "",
    categoria: categoriaInicial,
    subcategoria: subcategoriaInicial,
    presentacion: presentacionInicial,
    precio: "",
    descripcion: "",
  });
  const upload = useImagenUpload(producto?.imagen ?? null);

  function guardar(datos: typeof form.form) {
    const subcategoria = datos.categoria === "Rock & Wings" ? "" : datos.subcategoria.trim();
    const presentacion = datos.categoria === "Cerveza" && subcategoria === "Cerveza artesanal" ? datos.presentacion : "";
    onSave(producto?.id ?? null, {
      nombre: datos.nombre,
      categoria: datos.categoria,
      subcategoria,
      presentacion,
      precio: Number(datos.precio),
      descripcion: datos.descripcion,
      icon: datos.categoria === "Cerveza" ? "cerveza" : producto?.icon ?? "plate",
      imagen: upload.imagen,
    });
  }

  const sugerencias = Array.from(new Set([
    ...(SUBCATEGORIAS_SUGERIDAS[form.form.categoria] ?? []),
    ...productos.filter((item) => item.categoria === form.form.categoria && item.subcategoria).map((item) => item.subcategoria as string),
  ]));
  const presentacionesCerveza = form.form.categoria === "Cerveza" && form.form.subcategoria === "Cerveza artesanal";

  return (
    <Modal title={producto ? "Editar producto" : "Nuevo producto"} onClose={onClose}>
      <form onSubmit={form.handleSubmit(guardar)} className="space-y-4">
        <ImageUpload image={upload.imagen} fileName={upload.nombreArchivo} onFileChange={upload.seleccionarArchivo} error={upload.error} label="Imagen del producto" />
        <div>
          <label htmlFor="producto-nombre" className="text-xs text-cream-dim block mb-1">Nombre del producto</label>
          <input id="producto-nombre" required value={form.form.nombre} onChange={(event) => form.setForm({ ...form.form, nombre: event.target.value })} placeholder="Ej: Pilsen" className={INPUT_CLASS} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-cream-dim">Categoría
            <select value={form.form.categoria} onChange={(event) => form.setForm({ ...form.form, categoria: event.target.value, subcategoria: "", presentacion: "" })} className={INPUT_CLASS}>
              {CATEGORIAS.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
            </select>
          </label>
          <label className="text-xs text-cream-dim">Precio (Bs.)
            <input required type="number" min="0" value={form.form.precio} onChange={(event) => form.setForm({ ...form.form, precio: event.target.value })} placeholder="0" className={INPUT_CLASS} />
          </label>
        </div>
        {form.form.categoria !== "Rock & Wings" && (
          <div>
            <label htmlFor="producto-subcategoria" className="text-xs text-cream-dim block mb-1">Subcategoría (opcional)</label>
            <input id="producto-subcategoria" list="subcategorias-sugeridas" value={form.form.subcategoria} onChange={(event) => form.setForm({ ...form.form, subcategoria: event.target.value, presentacion: "" })} placeholder={sugerencias.length ? `Ej: ${sugerencias.join(", ")}` : "Ej: Postres"} className={INPUT_CLASS} />
            <datalist id="subcategorias-sugeridas">{sugerencias.map((sugerencia) => <option key={sugerencia} value={sugerencia} />)}</datalist>
          </div>
        )}
        {presentacionesCerveza && (
          <label className="block text-xs text-cream-dim">Presentación
            <select value={form.form.presentacion} onChange={(event) => form.setForm({ ...form.form, presentacion: event.target.value })} className={INPUT_CLASS}>
              {presentaciones.map((presentacion) => <option key={presentacion} value={presentacion}>{presentacion}</option>)}
            </select>
          </label>
        )}
        <label className="block text-xs text-cream-dim">Descripción
          <textarea rows={3} value={form.form.descripcion} onChange={(event) => form.setForm({ ...form.form, descripcion: event.target.value })} className={INPUT_CLASS} />
        </label>
        {form.error && <p role="alert" className="text-xs text-danger">{form.error}</p>}
        <div className="flex justify-end gap-3 pt-2 border-t border-line">
          <button type="button" className="btn-outline text-sm" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-gold text-sm">Guardar producto</button>
        </div>
      </form>
    </Modal>
  );
}
