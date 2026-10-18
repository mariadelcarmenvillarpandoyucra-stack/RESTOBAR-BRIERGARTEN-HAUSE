import { useState } from "react";
import type { MetodoPago } from "../types";

export function useCobro(subtotal: number) {
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo");
  const [propina, setPropina] = useState(0);
  const [propinaManual, setPropinaManual] = useState("");
  const [usarPropinaManual, setUsarPropinaManual] = useState(false);
  const [calificacion, setCalificacion] = useState(0);

  const propinaFinal = usarPropinaManual ? Number(propinaManual) || 0 : propina;
  const totalFinal = subtotal + propinaFinal;

  function reset() {
    setMetodoPago("efectivo");
    setPropina(0);
    setPropinaManual("");
    setUsarPropinaManual(false);
    setCalificacion(0);
  }

  return {
    metodoPago,
    setMetodoPago,
    propina,
    setPropina,
    propinaManual,
    setPropinaManual,
    usarPropinaManual,
    setUsarPropinaManual,
    calificacion,
    setCalificacion,
    propinaFinal,
    totalFinal,
    reset,
  };
}
