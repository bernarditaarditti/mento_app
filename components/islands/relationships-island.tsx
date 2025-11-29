import Image from "next/image"

export function RelationshipsIsland() {
  return (
    <div className="relative w-full h-32">
      <Image
        src="/images/relaciones-isla.png"
        alt="Isla de Relaciones"
        fill
        className="object-contain"
        style={{ objectPosition: "center" }}
      />
    </div>
  )
}
