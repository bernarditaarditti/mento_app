import Image from "next/image"

export function HealthIsland() {
  return (
    <div className="relative w-full h-32">
      <Image
        src="/images/salud-isla.png"
        alt="Isla de Salud"
        fill
        className="object-contain"
        style={{ objectPosition: "center" }}
      />
    </div>
  )
}
