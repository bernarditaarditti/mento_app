import Image from "next/image"

export function FamilyIsland() {
  return (
    <div className="relative w-full h-32">
      <Image
        src="/images/familia-isla.png"
        alt="Isla de Familia"
        fill
        className="object-contain"
        style={{ objectPosition: "center" }}
      />
    </div>
  )
}
