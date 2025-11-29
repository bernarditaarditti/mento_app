"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function HelpNumbersPage() {
  const router = useRouter()

  const helpNumbers = [
    { number: "135", description: "Prevención del suicidio (CABA y GBA)" },
    { number: "911", description: "Emergencias generales" },
    { number: "141", description: "Apoyo emocional y consumo problemático (SEDRONAR)" },
    { number: "144", description: "Violencia de género (24 hs)" },
    { number: "107", description: "Emergencias médicas" },
    { number: "102", description: "Niñas, niños y adolescentes" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Title with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Volver atrás"
          >
            <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6.12428" y1="14.0193" x2="41.6506" y2="14.0193" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
              <line x1="14.019" y1="2.3685" x2="2.3685" y2="14.019" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
              <line x1="2.3685" y1="14.019" x2="14.019" y2="25.6696" stroke="#00C49A" strokeWidth="4.73684" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <h1 className="text-[#FF8FA3] text-2xl text-center mt-16" style={{ fontFamily: "var(--font-poppins)", fontWeight: "normal" }}>
          Números telefónicos
          <br />
          de ayuda
        </h1>
      </div>

      {/* Help Numbers List */}
      <div className="flex-1 px-12 pt-8 pb-24">
        <div className="max-w-md mx-auto flex flex-col gap-6">
          {helpNumbers.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 px-4"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-semibold"
                  style={{ color: "#0096C7", fontFamily: "var(--font-poppins)" }}
                >
                  {item.number}
                </span>
                <span
                  className="text-base"
                  style={{ color: "#0096C7", fontFamily: "var(--font-poppins)" }}
                >
                  –
                </span>
                <span
                  className="text-base flex-1"
                  style={{ color: "#0096C7", fontFamily: "var(--font-poppins)" }}
                >
                  {item.description}
                </span>
              </div>
            </div>
          ))}
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

