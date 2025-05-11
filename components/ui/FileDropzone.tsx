"use client"
import { useRef, useState } from "react"
import { Image as LucideImage, UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFile: (file: File, url: string) => void
  previewUrl?: string | null
}

export function FileDropzone({ onFile, previewUrl }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const url = URL.createObjectURL(file)
      onFile(file, url)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      onFile(file, url)
    }
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-900",
        isDragActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
          : "border-orange-300 dark:border-orange-700 hover:border-blue-400"
      )}
      style={{ minHeight: 160 }}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={handleDrop}
      tabIndex={0}
      onFocus={() => setIsDragActive(true)}
      onBlur={() => setIsDragActive(false)}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="object-contain h-32 w-full rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 py-6">
          <UploadCloud className="w-8 h-8 text-orange-400" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Drag & drop or <span className="underline">browse</span> to upload
          </span>
          <span className="text-xs text-zinc-400">PNG, JPG, JPEG up to 10MB</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
    </div>
  )
}
