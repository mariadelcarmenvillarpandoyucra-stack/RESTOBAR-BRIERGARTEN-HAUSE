export function bs(monto: number): string {
  return `Bs. ${monto.toLocaleString("es-BO", { maximumFractionDigits: 0 })}`;
}

export function tiempoMesaDesde(timestamp: number | null, now = Date.now()): string {
  if (timestamp === null || !Number.isFinite(timestamp) || timestamp <= 0) return "—";

  const timestampMs = timestamp < 100_000_000_000 ? timestamp * 1000 : timestamp;
  const minutos = Math.max(0, Math.floor((now - timestampMs) / 60000));

  if (minutos < 60) return `${minutos} min`;

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  if (horas < 24) return `${horas} h${minutosRestantes ? ` ${minutosRestantes} min` : ""}`;

  const dias = Math.floor(horas / 24);
  const horasRestantes = horas % 24;
  return `${dias} d${horasRestantes ? ` ${horasRestantes} h` : ""}`;
}
