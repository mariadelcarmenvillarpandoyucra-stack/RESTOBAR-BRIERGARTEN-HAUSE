import { useState } from "react";
import type { FormEvent } from "react";
import { Modal } from "../../../components/ui/Modal";

export interface DatosFactura {
  nombreCliente: string;
  nit: string;
  notas: string;
}

interface ModalFacturaProps {
  mesa: number;
  onClose: () => void;
  onSubmit: (datos: DatosFactura) => void;
}

export function ModalFactura({ mesa, onClose, onSubmit }: ModalFacturaProps) {
  const [nombreCliente, setNombreCliente] = useState("");
  const [nit, setNit] = useState("");
  const [notas, setNotas] = useState("");

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ nombreCliente, nit, notas });
  }

  return (
    <Modal title={`Solicitar factura — Mesa ${mesa}`} onClose={onClose}>
      <form onSubmit={enviar} className="space-y-3">
        <div>
          <label htmlFor="factura-cliente" className="text-xs text-cream-dim block mb-1">Nombre del cliente</label>
          <input id="factura-cliente" required value={nombreCliente} onChange={(event) => setNombreCliente(event.target.value)} className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
        </div>
        <div>
          <label htmlFor="factura-nit" className="text-xs text-cream-dim block mb-1">NIT (opcional)</label>
          <input id="factura-nit" value={nit} onChange={(event) => setNit(event.target.value)} className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
        </div>
        <div>
          <label htmlFor="factura-notas" className="text-xs text-cream-dim block mb-1">Notas (opcional)</label>
          <textarea id="factura-notas" rows={3} value={notas} onChange={(event) => setNotas(event.target.value)} placeholder="Cualquier detalle extra para el dueño" className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream" />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t border-line">
          <button type="button" className="btn-outline text-sm" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-gold text-sm">Enviar al dueño</button>
        </div>
      </form>
    </Modal>
  );
}
