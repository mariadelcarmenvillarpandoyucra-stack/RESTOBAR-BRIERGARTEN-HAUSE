import { useStore } from "../../../store/StoreContext";
import { SectionCard } from "../../../components/ui/SectionCard";

export function FacturacionView() {
  const { db } = useStore();

  return (
    <SectionCard title="Solicitudes de factura" subtitle="Solicitudes registradas por los meseros al cerrar una mesa">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-cream-dim text-xs border-b border-line">
              <th className="py-2 pr-4">Mesa</th>
              <th className="py-2 pr-4">Cliente</th>
              <th className="py-2 pr-4">NIT</th>
              <th className="py-2 pr-4">Mesero</th>
              <th className="py-2 pr-4">Fecha</th>
              <th className="py-2 pr-4">Notas</th>
            </tr>
          </thead>
          <tbody>
            {db.solicitudesFactura.map((f) => (
              <tr key={f.id} className="border-b border-line last:border-0">
                <td className="py-2.5 pr-4 text-cream">Mesa {f.mesa}</td>
                <td className="py-2.5 pr-4 text-cream">{f.nombreCliente}</td>
                <td className="py-2.5 pr-4 text-cream-dim">{f.nit || "—"}</td>
                <td className="py-2.5 pr-4 text-cream-dim">{f.mesero || "—"}</td>
                <td className="py-2.5 pr-4 text-cream-dim">{f.hora || "—"}</td>
                <td className="py-2.5 pr-4 text-cream-dim">{f.notas || "—"}</td>
              </tr>
            ))}
            {db.solicitudesFactura.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-cream-dim">
                  Todavía no hay solicitudes de factura — acá aparecerán en cuanto un mesero cargue una.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}