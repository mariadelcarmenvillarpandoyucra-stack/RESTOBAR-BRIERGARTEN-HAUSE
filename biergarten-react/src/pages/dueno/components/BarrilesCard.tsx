import { useRef, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useStore } from "../../../store/StoreContext";
import { productosCervezaDeBarriles } from "../../../lib/menu";
import { INPUT_CLASS } from "../../../lib/constants";
import { Icon } from "../../../lib/icons";

interface FilaBarril {
  key: string;
  id: string | null;
  nombre: string;
  capacidad: string;
  litros: string;
}

export function BarrilesCard() {
  const { db, mutate } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [filas, setFilas] = useState<FilaBarril[]>([]);
  const keyCounter = useRef(0);

  function nuevaKey() {
    keyCounter.current += 1;
    return `barril-${keyCounter.current}`;
  }

  function abrirEditar() {
    setFilas(db.barriles.map((barril) => ({
      key: nuevaKey(),
      id: barril.id,
      nombre: barril.nombre,
      capacidad: String(barril.capacidadL),
      litros: String(barril.litrosActuales),
    })));
    setModalOpen(true);
  }

  function actualizar(key: string, cambios: Partial<FilaBarril>) {
    setFilas((actuales) => actuales.map((fila) => fila.key === key ? { ...fila, ...cambios } : fila));
  }

  function guardar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate((estado) => {
      estado.barriles = filas.map((fila) => {
        const litrosActuales = Math.max(0, Number(fila.litros) || 0);
        const capacidadL = Math.max(Number(fila.capacidad) || 0, litrosActuales, 1);
        const nombre = fila.nombre.trim();
        if (fila.id) return { id: fila.id, nombre, capacidadL, litrosActuales };
        const id = `b${estado.nextBarrilId}`;
        estado.nextBarrilId += 1;
        return { id, nombre, capacidadL, litrosActuales };
      });
      const existentes = estado.productos.filter((producto) => producto.id.startsWith("cerveza-barril-"));
      estado.productos = estado.productos.filter((producto) => !producto.id.startsWith("cerveza-barril-"));
      estado.productos.push(...productosCervezaDeBarriles(estado.barriles.map((barril) => barril.nombre)).map((producto) => {
        const existente = existentes.find((item) => item.nombre === producto.nombre && item.presentacion === producto.presentacion);
        return existente ? { ...existente, id: producto.id } : producto;
      }));
    });
    setModalOpen(false);
  }

  return (
    <section className="card p-5">
      <div className="flex justify-between items-center gap-3 mb-4">
        <h3 className="font-display text-cream">Stock de cerveza — barriles</h3>
        <button className="btn-outline text-xs flex items-center gap-1.5 !py-1.5" onClick={abrirEditar}>
          <Icon name="edit" className="w-3.5 h-3.5" /> Editar
        </button>
      </div>
      <div className="space-y-4">
        {db.barriles.map((barril) => {
          const nivel = barril.capacidadL > 0 ? Math.min(100, Math.round((barril.litrosActuales / barril.capacidadL) * 100)) : 0;
          return (
            <div key={barril.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cream">{barril.nombre}</span>
                <span className="text-cream-dim">{nivel}% · {barril.litrosActuales}/{barril.capacidadL}L</span>
              </div>
              <div className="w-full h-2 bg-bg-card-hi rounded-full overflow-hidden">
                <div className={`h-full ${nivel < 20 ? "bg-danger" : nivel < 50 ? "bg-warn" : "bg-gold-dim"}`} style={{ width: `${nivel}%` }} />
              </div>
              {nivel < 20 && <p className="text-[11px] text-danger mt-1">⚠ Nivel crítico — reponer pronto</p>}
            </div>
          );
        })}
        {db.barriles.length === 0 && <p className="text-sm text-cream-dim">No hay barriles registrados. Pulsa “Editar” para añadir una cerveza.</p>}
      </div>
      {modalOpen && (
        <Modal title="Editar barriles de cerveza" onClose={() => setModalOpen(false)} widthClass="max-w-xl">
          <form onSubmit={guardar} className="space-y-4">
            <p className="text-xs text-cream-dim">Aumenta los litros, añade otro tipo de cerveza o elimina una. Los cambios se aplican al guardar.</p>
            <div className="space-y-3">
              {filas.map((fila) => {
                const litros = Number(fila.litros) || 0;
                const capacidad = Number(fila.capacidad) || 0;
                return (
                  <div key={fila.key} className="rounded-sm border border-line bg-bg-card-hi p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <input required value={fila.nombre} onChange={(event) => actualizar(fila.key, { nombre: event.target.value })} placeholder="Nombre de la cerveza" aria-label="Nombre de la cerveza" className={INPUT_CLASS} />
                      <button type="button" onClick={() => setFilas((actuales) => actuales.filter((item) => item.key !== fila.key))} className="w-9 h-9 rounded-sm border border-line text-danger hover:border-danger flex items-center justify-center" aria-label={`Eliminar ${fila.nombre || "cerveza"}`}>
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-[11px] text-cream-dim">Litros actuales
                        <input required type="number" min="0" value={fila.litros} onChange={(event) => actualizar(fila.key, { litros: event.target.value })} className={INPUT_CLASS} />
                      </label>
                      <label className="text-[11px] text-cream-dim">Capacidad (L)
                        <input required type="number" min="1" value={fila.capacidad} onChange={(event) => actualizar(fila.key, { capacidad: event.target.value })} className={INPUT_CLASS} />
                      </label>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-cream-dim">Aumentar:</span>
                      {[10, 20, 30, 50].map((cantidad) => (
                        <button key={cantidad} type="button" onClick={() => actualizar(fila.key, { litros: String((Number(fila.litros) || 0) + cantidad) })} className="btn-outline text-xs !py-1 !px-2.5">+ {cantidad} L</button>
                      ))}
                    </div>
                    {capacidad > 0 && litros > capacidad && <p className="text-[11px] text-warn">Supera la capacidad: al guardar, la capacidad subirá a {litros} L.</p>}
                  </div>
                );
              })}
              {filas.length === 0 && <p className="text-sm text-cream-dim text-center py-4 border border-dashed border-line rounded-sm">No queda ninguna cerveza. Añade una o cancela para conservar las actuales.</p>}
            </div>
            <button type="button" onClick={() => setFilas((actuales) => [...actuales, { key: nuevaKey(), id: null, nombre: "", capacidad: "30", litros: "30" }])} className="btn-outline w-full text-sm flex items-center justify-center gap-2 border-dashed">
              <Icon name="plus" className="w-4 h-4" /> Añadir otra cerveza
            </button>
            <div className="flex justify-end gap-3 pt-3 border-t border-line">
              <button type="button" className="btn-outline text-sm" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button type="submit" className="btn-gold text-sm">Guardar cambios</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
