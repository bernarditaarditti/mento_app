"use client"

import Link from "next/link"
import Image from "next/image"
import { BackButton } from "@/components/back-button"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"
import { obtenerProgresoNiveles } from "@/lib/api"

interface CompletedIsland {
  id: number
  nombre: string
  imagen: string
  color: string
}

// Definir todas las islas con su información y colores
const allIslands = [
  { id: 1, nombre: "Trabajo/Educación", imagen: "/images/island-work.png", color: "#0096C7" },
  { id: 2, nombre: "Familia", imagen: "/images/familia-isla.png", color: "#FFC832" },
  { id: 3, nombre: "Vínculos", imagen: "/images/relaciones-isla.png", color: "#FE814A" },
  { id: 4, nombre: "Salud", imagen: "/images/salud-isla.png", color: "#52B788" },
]

export default function ProfilePage() {
  // Obtener el mes y año actual para "Se unió en"
  const currentDate = new Date()
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ]
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  const { user } = useAuth()
  const { data: onboardingData, update } = useOnboarding()
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [completedIslands, setCompletedIslands] = useState<CompletedIsland[]>([])

  useEffect(() => {
    if (onboardingData?.nombre) {
      setDisplayName(onboardingData.nombre)
      return
    }

    const fetchOnboarding = async () => {
      if (!user?.id_usuario) return
      try {
        const res = await fetch(`/api/onboarding/${user.id_usuario}`)
        const json = await res.json()
        if (json.success && json.data) {
          const name = json.data.nombre || null
          setDisplayName(name)
          if (name) update({ nombre: name })
        }
      } catch (e) {
        console.error("Error fetching onboarding for profile:", e)
      }
    }

    fetchOnboarding()
  }, [onboardingData, user, update])

  // Verificar qué islas están completas
  useEffect(() => {
    const checkCompletedIslands = async () => {
      if (!user?.id_usuario) return

      const idUsuario = parseInt(user.id_usuario.toString(), 10)
      const completed: CompletedIsland[] = []

      // Verificar cada isla
      for (const island of allIslands) {
        try {
          const response = await obtenerProgresoNiveles(idUsuario, island.id)
          
          if (response.success && response.data) {
            // La API devuelve { success: true, nivelesCompletados, ultimoNivelDesbloqueado }
            // y apiCall lo envuelve en { success: true, data: { success: true, nivelesCompletados, ... } }
            const nivelesCompletados = response.data.nivelesCompletados || []
            
            // Una isla está completa si tiene los niveles 1, 2, 3, 4 y 5 completados
            const allLevelsCompleted = [1, 2, 3, 4, 5].every(level => 
              nivelesCompletados.includes(level)
            )
            
            if (allLevelsCompleted) {
              completed.push({
                id: island.id,
                nombre: island.nombre,
                imagen: island.imagen,
                color: island.color
              })
            }
          }
        } catch (error) {
          console.error(`Error al verificar isla ${island.nombre}:`, error)
        }
      }

      setCompletedIslands(completed)
    }

    checkCompletedIslands()
  }, [user])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24 pt-12 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="110" cy="87" r="87" fill="#D9D9D9"/>
            <circle cx="110" cy="87" r="87" fill="#D9D9D9"/>
            <path d="M109.71 112.358C124.572 112.358 136.62 100.31 136.62 85.4481C136.62 70.5861 124.572 58.5381 109.71 58.5381C94.8481 58.5381 82.8 70.5861 82.8 85.4481C82.8 100.31 94.8481 112.358 109.71 112.358Z" fill="white" stroke="white" strokeWidth="24.84" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M50.2838 168.25C50.2838 145.25 81.1397 133.75 111.996 133.75C142.852 133.75 173.708 145.25 173.708 168.25" fill="white"/>
            <path d="M50.2838 168.25C50.2838 145.25 81.1397 133.75 111.996 133.75C142.852 133.75 173.708 145.25 173.708 168.25H50.2838Z" stroke="white" strokeWidth="24.84" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-1 mb-8">
          <p className="text-lg font-medium" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            {displayName || user?.email || "Usuario"}
          </p>
          <p className="text-base" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            Se unió en {month} de {year}
          </p>
        </div>

        {/* Completed Islands */}
        <div className="w-full max-w-md flex flex-col items-center px-8">
          <h2 className="text-lg font-semibold mb-6 text-center" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
            Islas completadas:
          </h2>
          {completedIslands.length === 0 ? (
            <p className="text-base text-center" style={{ fontFamily: "var(--font-poppins)", color: "#0096C7" }}>
              Aún no has completado ninguna isla. ¡Sigue jugando!
            </p>
          ) : (
            <div className="flex flex-wrap gap-8 justify-center items-start w-full px-4">
              {completedIslands.map((island, index) => (
                <div
                  key={island.id}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="relative w-32 h-32 flex items-center justify-center island-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    <Image
                      src={island.imagen}
                      alt={island.nombre}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p
                    className="text-sm font-semibold text-center"
                    style={{ fontFamily: "var(--font-poppins)", color: island.color || "#0096C7" }}
                  >
                    {island.nombre}
                  </p>
                </div>
              ))}
            </div>
          )}
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

