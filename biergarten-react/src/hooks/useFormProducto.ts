import { useState } from "react";
import type { FormEvent } from "react";

export interface FormProductoData {
  nombre: string;
  categoria: string;
  subcategoria: string;
  presentacion: string;
  precio: string;
  descripcion: string;
}

const FORM_INICIAL: FormProductoData = {
  nombre: "",
  categoria: "Comidas",
  subcategoria: "",
  presentacion: "",
  precio: "",
  descripcion: "",
};

export function useFormProducto(initialForm: FormProductoData = FORM_INICIAL) {
  const [form, setForm] = useState<FormProductoData>(initialForm);
  const [error, setError] = useState<string | null>(null);

  function reset(nextForm: FormProductoData = initialForm) {
    setForm(nextForm);
    setError(null);
  }

  function handleSubmit(onSubmit: (data: FormProductoData) => void) {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const precio = Number(form.precio);
      if (!form.nombre.trim()) {
        setError("El nombre del producto es obligatorio.");
        return;
      }
      if (!form.precio.trim() || !Number.isFinite(precio) || precio < 0) {
        setError("Ingresa un precio válido.");
        return;
      }
      setError(null);
      onSubmit({ ...form, nombre: form.nombre.trim() });
    };
  }

  return { form, setForm, error, reset, handleSubmit };
}
