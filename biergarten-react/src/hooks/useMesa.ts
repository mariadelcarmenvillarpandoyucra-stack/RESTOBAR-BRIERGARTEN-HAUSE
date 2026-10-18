import { useState } from "react";
import type { ItemPedido } from "../types";

export function useMesa() {
  const [mesaActiva, setMesaActiva] = useState<number | null>(null);
  const [vistaModal, setVistaModal] = useState<"productos" | "resumen">("productos");
  const [carrito, setCarrito] = useState<ItemPedido[]>([]);
  const [notaPedido, setNotaPedido] = useState("");

  function abrirMesa(num: number, ocupada: boolean) {
    setMesaActiva(num);
    setCarrito([]);
    setNotaPedido("");
    setVistaModal(ocupada ? "resumen" : "productos");
  }

  function cerrarMesa() {
    setMesaActiva(null);
    setCarrito([]);
    setNotaPedido("");
    setVistaModal("productos");
  }

  function agregarAlCarrito(producto: Pick<ItemPedido, "nombre" | "precio">) {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return prev.map((item) =>
          item.nombre === producto.nombre ? { ...item, cant: item.cant + 1 } : item
        );
      }
      return [...prev, { nombre: producto.nombre, cant: 1, precio: producto.precio }];
    });
  }

  function cambiarCantidad(nombre: string, delta: number) {
    setCarrito((prev) =>
      prev
        .map((item) => item.nombre === nombre ? { ...item, cant: item.cant + delta } : item)
        .filter((item) => item.cant > 0)
    );
  }

  return {
    mesaActiva,
    setMesaActiva,
    vistaModal,
    setVistaModal,
    carrito,
    setCarrito,
    notaPedido,
    setNotaPedido,
    abrirMesa,
    cerrarMesa,
    agregarAlCarrito,
    cambiarCantidad,
  };
}
