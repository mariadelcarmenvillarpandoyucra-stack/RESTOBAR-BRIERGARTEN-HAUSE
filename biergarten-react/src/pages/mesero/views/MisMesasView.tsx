import { useState } from "react";
import { MesaGrid } from "../../../components/mesa/MesaGrid";
import { Modal } from "../../../components/ui/Modal";
import { SectionCard } from "../../../components/ui/SectionCard";
import { useMesa } from "../../../hooks/useMesa";
import { useStore } from "../../../store/StoreContext";
import { MenuGrid } from "../components/MenuGrid";
import { CarritoPanel } from "../components/CarritoPanel";
import { ModalCobro } from "../components/ModalCobro";
import { ModalFactura } from "../components/ModalFactura";
import type { DatosFactura } from "../components/ModalFactura";
import { ResumenMesa } from "../components/ResumenMesa";
import type { MetodoPago } from "../../../types";

export function MisMesasView({ meseroNombre }: { meseroNombre: string }) {
  const {
    db,
    crearPedido,
    crearSolicitudFactura,
    cobrarMesa,
  } = useStore();
  const mesa = useMesa();
  const [modalFactura, setModalFactura] = useState(false);
  const [modalCobro, setModalCobro] = useState(false);

  const pedidosMesa = mesa.mesaActiva === null
    ? []
    : db.pedidos.filter((pedido) => pedido.mesa === mesa.mesaActiva);
  const totalMesa = pedidosMesa.reduce((total, pedido) => total + pedido.total, 0);

  function cerrarMesa() {
    setModalCobro(false);
    mesa.cerrarMesa();
  }

  function abrirMesa(num: number) {
    const seleccionada = db.mesas.find((item) => item.num === num);
    if (!seleccionada) return;
    mesa.abrirMesa(num, seleccionada.estado !== "libre");
  }

  function enviarPedido() {
    if (mesa.mesaActiva === null || mesa.carrito.length === 0) return;
    crearPedido(mesa.mesaActiva, meseroNombre, mesa.carrito, mesa.notaPedido);
    cerrarMesa();
  }

  function agregarMasProductos() {
    mesa.setCarrito([]);
    mesa.setNotaPedido("");
    mesa.setVistaModal("productos");
  }

  function solicitarFactura(datos: DatosFactura) {
    if (mesa.mesaActiva === null) return;
    crearSolicitudFactura({
      mesa: mesa.mesaActiva,
      mesero: meseroNombre,
      ...datos,
    });
    setModalFactura(false);
  }

  function abrirCobro() {
    if (mesa.mesaActiva === null || pedidosMesa.length === 0) return;
    setModalCobro(true);
  }

  function confirmarCobro(propina: number, metodoPago: MetodoPago, calificacion: number) {
    if (mesa.mesaActiva === null || pedidosMesa.length === 0) return;
    cobrarMesa(mesa.mesaActiva, pedidosMesa.map((pedido) => pedido.id), propina, metodoPago, calificacion);
    setModalCobro(false);
    cerrarMesa();
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Estado de mesas" subtitle="Toca una mesa para tomar el pedido, agregar productos o cobrar">
        <MesaGrid mesas={db.mesas} pedidos={db.pedidos} onSelect={abrirMesa} />
      </SectionCard>

      {mesa.mesaActiva !== null && (
        <Modal title={`Mesa ${mesa.mesaActiva}`} onClose={cerrarMesa} widthClass="max-w-2xl">
          {mesa.vistaModal === "productos" ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-cream">Selecciona los productos</p>
                <p className="text-xs text-cream-dim mt-1">Agrega los productos que desea el cliente.</p>
              </div>
              <div className="max-h-[50vh] overflow-y-auto pr-1">
                <MenuGrid
                  productos={db.productos}
                  promociones={db.promociones.filter((promo) => promo.activa)}
                  onAgregar={mesa.agregarAlCarrito}
                />
              </div>
              <CarritoPanel
                items={mesa.carrito}
                nota={mesa.notaPedido}
                onNotaChange={mesa.setNotaPedido}
                onCambiarCantidad={mesa.cambiarCantidad}
                onEnviar={enviarPedido}
              />
            </div>
          ) : (
            <ResumenMesa
              pedidos={pedidosMesa}
              onSolicitarFactura={() => setModalFactura(true)}
              onAgregarProductos={agregarMasProductos}
              onCobrar={abrirCobro}
            />
          )}
        </Modal>
      )}

      {modalFactura && mesa.mesaActiva !== null && (
        <ModalFactura
          mesa={mesa.mesaActiva}
          onClose={() => setModalFactura(false)}
          onSubmit={solicitarFactura}
        />
      )}

      {modalCobro && mesa.mesaActiva !== null && (
        <ModalCobro
          mesa={mesa.mesaActiva}
          subtotal={totalMesa}
          onClose={() => setModalCobro(false)}
          onConfirm={confirmarCobro}
        />
      )}
    </div>
  );
}
