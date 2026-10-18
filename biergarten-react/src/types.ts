/* ==========================================================================
   Tipos centrales del dominio — antes vivían implícitos en store.js,
   ahora quedan explícitos gracias a TypeScript.
   ========================================================================== */

export type Role = "dueno" | "mesero";

export interface Session {
  username: string;
  displayName: string;
  role: Role;
  roleLabel: string;
  ts: number;
}

export type EstadoMesa = "libre" | "ocupada";

export interface Mesa {
  num: number;
  estado: EstadoMesa;
  horaApertura: number | null;
}

export type EstadoPedido = "pendiente" | "preparando" | "listo" | "entregado";

export interface ItemPedido {
  nombre: string;
  cant: number;
  precio: number;
}

export interface Pedido {
  id: number;
  mesa: number;
  mesero: string;
  estado: EstadoPedido;
  items: ItemPedido[];
  /** Especificaciones del pedido (ej. "sin cebolla", "sin hielo"). */
  nota?: string;
  hora: string;
  ts: number;
  total: number;
  horaListo?: string;
}

export type MetodoPago = "efectivo" | "qr";

export interface Venta {
  id: number;
  mesa: number;
  mesero: string;
  items: { nombre: string; cant: number }[];
  subtotal: number;
  propina: number;
  metodoPago: MetodoPago;
  calificacion: number;
  hora: string;
  ts: number;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  icon: string;
  imagen: string | null;
  descripcion: string;
  /** Sección dentro de la categoría (ej. Comidas → Piqueo / Carnes). Opcional. */
  subcategoria?: string;
  /** Presentación de cerveza artesanal (ej. Chop de 350 ml). Opcional. */
  presentacion?: string;
}

export interface Promocion {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string | null;
  /** Texto libre: "Hoy hasta las 21:00", "Solo jueves", etc. */
  vigencia: string;
  /** Solo las activas aparecen en el panel del mesero. */
  activa: boolean;
}

export interface Notificacion {
  id: number;
  mesero: string;
  mesa: number;
  pedidoId: number;
  mensaje: string;
  hora: string;
  leida: boolean;
}

export interface Barril {
  id: string;
  nombre: string;
  /** Capacidad total del barril en litros. */
  capacidadL: number;
  /** Litros disponibles ahora mismo. */
  litrosActuales: number;
}

export interface Mesero {
  id: string;
  nombre: string;
}

export interface RockWingsVentaManual {
  id: number;
  monto: number;
  fecha: string;
  nota: string;
  hora: string;
  ts: number;
}

export interface SolicitudFactura {
  id: number;
  mesa: number;
  mesero: string;
  nombreCliente: string;
  nit: string;
  notas: string;
  hora: string;
  ts: number;
  atendida: boolean;
}

export interface DB {
  mesas: Mesa[];
  pedidos: Pedido[];
  ventas: Venta[];
  productos: Producto[];
  nextProductoId: number;
  promociones: Promocion[];
  nextPromocionId: number;
  nextBarrilId: number;
  notificaciones: Notificacion[];
  nextPedidoId: number;
  nextVentaId: number;
  nextNotifId: number;
  ventasSemana: number[];
  meseros: Mesero[];
  barriles: Barril[];
  rockWingsVentasManual: RockWingsVentaManual[];
  nextRockWingsManualId: number;
  solicitudesFactura: SolicitudFactura[];
  nextFacturaId: number;
}
