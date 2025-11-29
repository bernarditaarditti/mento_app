import Image from "next/image"

export function WorkIsland() {
  return (
    <div className="relative w-full h-28">
      <Image
        src="/images/island-work.png"
        alt="Isla de Trabajo/Educación"
        fill
        className="object-contain"
      />
    </div>
  )
}
