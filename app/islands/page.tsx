"use client"

import Link from "next/link"
import Image from "next/image"
import { WorkIsland } from "@/components/islands/work-island"
import { FamilyIsland } from "@/components/islands/family-island"
import { RelationshipsIsland } from "@/components/islands/relationships-island"
import { HealthIsland } from "@/components/islands/health-island"

export default function IslandsPage() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main content */}
      <div className="flex-1 px-4 pt-6 pb-24 flex flex-col overflow-hidden">
        <h1 className="text-[#FF6171] text-2xl font-bold text-center mb-6 flex-shrink-0">Recorre islas</h1>

        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full overflow-hidden py-1">
          {/* Trabajo/Educación - Arriba izquierda */}
          <Link href="/islands/work" className="block flex-shrink-0 island-container">
            <div className="relative w-4/5 -ml-2 island-float">
              <WorkIsland />
              <p className="text-[#0096C7] text-center font-semibold mt-1 text-sm">Trabajo/Educación</p>
            </div>
          </Link>

          {/* Familia - Debajo de Trabajo, a la derecha */}
          <Link href="/islands/family" className="block flex-shrink-0 island-container">
            <div className="relative ml-auto w-4/5 -mr-2 island-float" style={{ animationDelay: "0.5s" }}>
              <FamilyIsland />
              <p className="text-[#FFC832] text-center font-semibold mt-1 text-sm">Familia</p>
            </div>
          </Link>

          {/* Vínculos - Debajo de Familia, a la izquierda */}
          <Link href="/islands/relationships" className="block flex-shrink-0 island-container">
            <div className="relative w-4/5 -ml-2 island-float" style={{ animationDelay: "1s" }}>
              <RelationshipsIsland />
              <p className="text-[#FE814A] text-center font-semibold mt-1 text-sm">Vínculos</p>
            </div>
          </Link>

          {/* Salud - Debajo de Relaciones, a la derecha */}
          <Link href="/islands/health" className="block flex-shrink-0 island-container">
            <div className="relative ml-auto w-4/5 -mr-2 island-float" style={{ animationDelay: "1.5s" }}>
              <HealthIsland />
              <p className="text-[#52B788] text-center font-semibold mt-0 text-sm">Salud</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0096C7] px-1 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-center gap-12">
          <Link href="/islands" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-islas.png" alt="Islas" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Islas</span>
          </Link>

          <Link href="/mento" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/cerebro.png" alt="Mento" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Mento</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-perfil.png" alt="Perfil" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Perfil</span>
          </Link>

          <Link href="/settings" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-ajustes.png" alt="Ajustes" width={28} height={28} />
            <span className="text-xs" style={{ fontFamily: "var(--font-poppins)" }}>Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

