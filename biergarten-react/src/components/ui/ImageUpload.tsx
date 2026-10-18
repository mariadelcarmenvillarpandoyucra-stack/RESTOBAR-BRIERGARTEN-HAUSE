import { useId } from "react";
import { Icon } from "../../lib/icons";

interface ImageUploadProps {
  image: string | null;
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  label?: string;
  buttonText?: string;
  imageAlt?: string;
  previewClassName?: string;
}

export function ImageUpload({
  image,
  fileName,
  onFileChange,
  error,
  label = "Imagen",
  buttonText = "Seleccionar archivo",
  imageAlt = "Vista previa",
  previewClassName = "h-16 w-16",
}: ImageUploadProps) {
  const inputId = useId();

  return (
    <div>
      <label htmlFor={inputId} className="text-xs text-cream-dim block mb-1">{label}</label>
      <div className="flex items-center gap-3">
        <div className={`${previewClassName} rounded-sm bg-bg-deep border border-line flex items-center justify-center overflow-hidden flex-shrink-0`}>
          {image
            ? <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
            : <Icon name="productos" className="w-6 h-6 text-gold-dim" />}
        </div>
        <label htmlFor={inputId} className="btn-outline text-xs cursor-pointer">{buttonText}</label>
        <input id={inputId} type="file" accept="image/*" className="sr-only" onChange={onFileChange} />
        <span className="text-xs text-cream-dim truncate">{fileName}</span>
      </div>
      {error && <p role="alert" className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}
