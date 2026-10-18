import { useCobro } from "../../../hooks/useCobro";
import { StarRating } from "../../../components/ui/StarRating";
import { Modal } from "../../../components/ui/Modal";
import type { MetodoPago } from "../../../types";

const OPCIONES_CALIFICACION = [
  { valor: 1, nombre: "Malo" },
  { valor: 2, nombre: "Regular" },
  { valor: 3, nombre: "Bueno" },
  { valor: 4, nombre: "Satisfecho" },
  { valor: 5, nombre: "Muy satisfecho" },
];

interface ModalCobroProps {
  mesa: number;
  subtotal: number;
  onClose: () => void;
  onConfirm: (propina: number, metodoPago: MetodoPago, calificacion: number) => void;
}

export function ModalCobro({ mesa, subtotal, onClose, onConfirm }: ModalCobroProps) {
  const cobro = useCobro(subtotal);

  function confirmar() {
    if (cobro.propinaFinal < 0) return;
    onConfirm(cobro.propinaFinal, cobro.metodoPago, cobro.calificacion);
  }

  return (
    <Modal title={`Cobrar Mesa ${mesa}`} onClose={onClose}>
      <div className="space-y-5">
        <div className="rounded-sm border border-line bg-bg-card-hi p-4">
          <p className="text-xs text-cream-dim">Total a cobrar</p>
          <p className="font-display text-3xl text-gold mt-1">Bs. {cobro.totalFinal.toFixed(0)}</p>
          {cobro.propinaFinal > 0 && (
            <p className="text-xs text-cream-dim mt-1">
              Consumo: Bs. {subtotal.toFixed(0)} · Propina: Bs. {cobro.propinaFinal.toFixed(0)}
            </p>
          )}
        </div>
        <fieldset>
          <legend className="text-xs text-cream-dim mb-2">Método de pago</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["efectivo", "qr"] as const).map((metodo) => (
              <button
                key={metodo}
                type="button"
                onClick={() => cobro.setMetodoPago(metodo)}
                className={`min-h-[48px] rounded-sm border text-sm transition ${cobro.metodoPago === metodo ? "bg-gold text-bg-deep border-gold font-semibold" : "border-line text-cream hover:border-gold"}`}
              >
                {metodo === "efectivo" ? "💵 Efectivo" : "📱 QR"}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <p className="text-xs text-cream-dim mb-2">Propina</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((monto) => (
              <button
                key={monto}
                type="button"
                onClick={() => { cobro.setPropina(monto); cobro.setUsarPropinaManual(false); }}
                className={`py-3 rounded-sm border text-sm ${cobro.propina === monto && !cobro.usarPropinaManual ? "bg-gold text-bg-deep border-gold font-semibold" : "border-line text-cream hover:border-gold"}`}
              >
                {monto === 0 ? "Sin propina" : `Bs. ${monto}`}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => cobro.setUsarPropinaManual(true)} className={`w-full mt-2 py-2.5 rounded-sm border text-sm ${cobro.usarPropinaManual ? "bg-gold text-bg-deep border-gold font-semibold" : "border-line text-cream hover:border-gold"}`}>
            ✏️ Ingresar monto manual
          </button>
          {cobro.usarPropinaManual && (
            <label className="block mt-2 text-xs text-cream-dim">
              Monto de propina
              <input
                type="number"
                min="0"
                step="1"
                value={cobro.propinaManual}
                onChange={(event) => cobro.setPropinaManual(event.target.value)}
                placeholder="Ej. 20"
                className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2.5 text-sm text-cream mt-1"
              />
            </label>
          )}
        </div>
        <div>
          <label htmlFor="calificacion-cliente" className="text-xs text-cream-dim block mb-2">Calificación</label>
          <select id="calificacion-cliente" value={cobro.calificacion} onChange={(event) => cobro.setCalificacion(Number(event.target.value))} className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2.5 text-sm text-cream">
            <option value={0} disabled>Selecciona una opción…</option>
            {OPCIONES_CALIFICACION.map((opcion) => <option key={opcion.valor} value={opcion.valor}>{opcion.nombre}</option>)}
          </select>
          <div className="flex justify-center mt-4">
            <StarRating value={cobro.calificacion} readOnly />
          </div>
        </div>
        <div className="pt-3 border-t border-line flex flex-col-reverse sm:flex-row gap-2">
          <button type="button" onClick={onClose} className="btn-outline w-full text-sm">Cancelar</button>
          <button type="button" onClick={confirmar} className="btn-gold w-full text-sm font-semibold">Confirmar cobro y liberar</button>
        </div>
      </div>
    </Modal>
  );
}
