import { useState } from "react";
import type { ChangeEvent } from "react";

const SIN_ARCHIVOS = "Sin archivos seleccionados";

export function useImagenUpload(imagenInicial: string | null = null) {
  const [imagen, setImagen] = useState<string | null>(imagenInicial);
  const [nombreArchivo, setNombreArchivo] = useState(imagenInicial ? "Imagen actual" : SIN_ARCHIVOS);
  const [error, setError] = useState<string | null>(null);

  function seleccionarArchivo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setNombreArchivo(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("No se pudo leer la imagen seleccionada.");
        return;
      }
      setImagen(reader.result);
    };
    reader.onerror = () => {
      setError(reader.error?.message || "No se pudo leer la imagen seleccionada.");
    };
    reader.readAsDataURL(file);
  }

  function reset(nextImage: string | null = null, nextFileName?: string) {
    setImagen(nextImage);
    setNombreArchivo(nextFileName ?? (nextImage ? "Imagen actual" : SIN_ARCHIVOS));
    setError(null);
  }

  return { imagen, nombreArchivo, error, setImagen, seleccionarArchivo, reset };
}
