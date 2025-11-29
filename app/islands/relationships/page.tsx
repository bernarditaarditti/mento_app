"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { obtenerProgresoNiveles } from "@/lib/api"

export default function RelationshipsIslandPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  
  // Estado para saber si el componente está montado en el cliente
  const [isMounted, setIsMounted] = useState(false)
  // Estado para rastrear qué niveles están completados
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  // Estado para el último nivel desbloqueado (1 por defecto para usuarios nuevos)
  const [ultimoNivelDesbloqueado, setUltimoNivelDesbloqueado] = useState<number>(1)

  // Función para cargar progreso
  const cargarProgreso = useCallback(async () => {
    if (!user?.id_usuario) return
    
    try {
      // Isla de relaciones/vínculos = 3
      const idIsla = 3
      const idUsuario = parseInt(user.id_usuario.toString(), 10)
      
      const response = await obtenerProgresoNiveles(idUsuario, idIsla)
      
      if (response.success && response.data) {
        const nivelesCompletados = response.data.nivelesCompletados || []
        const ultimoDesbloqueado = response.data.ultimoNivelDesbloqueado || 1
        
        console.log("✅ Progreso cargado en relationships page:", { nivelesCompletados, ultimoDesbloqueado });
        setCompletedLevels(new Set(nivelesCompletados))
        setUltimoNivelDesbloqueado(ultimoDesbloqueado)
      } else {
        // Si no hay progreso, usuario nuevo: nivel 1 desbloqueado
        setUltimoNivelDesbloqueado(1)
        setCompletedLevels(new Set())
      }
    } catch (error) {
      console.error("Error al cargar progreso:", error)
      // En caso de error, por defecto nivel 1 desbloqueado
      setUltimoNivelDesbloqueado(1)
      setCompletedLevels(new Set())
    }
  }, [user])

  // Cargar progreso desde la base de datos cuando se monta o cuando el usuario cambia
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!user?.id_usuario) return
    
    setIsMounted(true)
    cargarProgreso()
  }, [user, cargarProgreso])

  // Recargar progreso cuando la página vuelve a tener foco o cuando cambia la ruta
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!user?.id_usuario) return

    const handleFocus = () => {
      cargarProgreso()
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [user, cargarProgreso])

  // Recargar progreso cuando la ruta cambia (cuando vuelves desde un juego)
  useEffect(() => {
    if (pathname === "/islands/relationships") {
      cargarProgreso()
    }
  }, [pathname, cargarProgreso])

  const totalLevels = 5

  const isLevelUnlocked = (level: number) => {
    // El nivel 1 siempre está desbloqueado
    if (level === 1) return true
    // Un nivel está desbloqueado si es menor o igual al último nivel desbloqueado
    // O si el nivel anterior está completado
    return level <= ultimoNivelDesbloqueado || completedLevels.has(level - 1)
  }

  const getLevelColor = (level: number) => {
    // Si está bloqueado: color tenue (#FFAAA0 - rosa claro)
    if (!isLevelUnlocked(level)) {
      return "#FFAAA0"
    }
    // Si está desbloqueado o completado: color brillante (#FF916D - naranja/coral)
    return "#FF916D"
  }

  const getStarColor = (level: number) => {
    // Completado: estrella amarilla #FFBC03
    if (completedLevels.has(level)) {
      return "#FFBC03"
    }
    // Desbloqueado pero no completado: estrella gris #A6A6A5
    if (isLevelUnlocked(level)) {
      return "#A6A6A5"
    }
    // Bloqueado: no mostrar estrella
    return null
  }

  // Posiciones zigzag para los niveles - formato zigzag más separado
  const levelPositions = [
    { top: "5%", left: "15%", transform: "translateX(0)" }, // Nivel 1 - top izquierda
    { top: "20%", right: "15%", transform: "translateX(0)" }, // Nivel 2 - below and derecha
    { top: "40%", left: "15%", transform: "translateX(0)" }, // Nivel 3 - below and izquierda
    { top: "53%", right: "15%", transform: "translateX(0)" }, // Nivel 4 - below and derecha
    { top: "72%", left: "15%", transform: "translateX(0)" }, // Nivel 5 - bottom izquierda
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Title with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10">
          <button
            onClick={() => router.push("/home")}
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
        <h1 className="text-[#FE814A] text-xl font-bold text-center mt-16">Vínculos</h1>
      </div>

      {/* Levels Path */}
      <div className="flex-1 relative px-4 pb-24 pt-2">
        {/* SVG Container for curved connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Curved paths - zigzag pattern with precise circle connections touching edges */}
          {/* Level 1 to Level 2 - desde borde inferior derecho del círculo 1 (izq) hasta borde superior izquierdo del círculo 2 (der) */}
          {/* Círculo 1: left 15%, top 5%, centro aprox (18, 8.5), radio 2.5, borde derecho aprox (20.5, 11) */}
          {/* Círculo 2: right 15%, top 20%, centro aprox (82, 23.5), radio 2.5, borde izquierdo aprox (79.5, 21) */}
          <path
            d="M 20.5 11 Q 50 10 79.5 21"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 2 to Level 3 - desde borde inferior izquierdo del círculo 2 (der) hasta borde superior derecho del círculo 3 (izq) */}
          {/* Círculo 2: borde inferior izquierdo aprox (79.5, 26) */}
          {/* Círculo 3: borde superior derecho aprox (20.5, 39) */}
          <path
            d="M 79.5 26 Q 50 32 20.5 39"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 3 to Level 4 - desde borde inferior derecho del círculo 3 (izq) hasta borde superior izquierdo del círculo 4 (der) */}
          {/* Círculo 3: borde inferior derecho aprox (20.5, 46) */}
          {/* Círculo 4: borde superior izquierdo aprox (79.5, 52) */}
          <path
            d="M 20.5 46 Q 50 42 79.5 52"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Level 4 to Level 5 - desde borde inferior izquierdo del círculo 4 (der) hasta borde superior derecho del círculo 5 (izq) */}
          {/* Círculo 4: borde inferior izquierdo aprox (79.5, 59) */}
          {/* Círculo 5: borde superior derecho aprox (20.5, 71) */}
          <path
            d="M 79.5 59 Q 50 64 20.5 71"
            stroke="#D1D5DB"
            strokeWidth="0.8"
            strokeDasharray="2,1.5"
            fill="none"
          />
        </svg>

        {/* Levels */}
        {Array.from({ length: totalLevels }, (_, i) => {
          const level = i + 1
          const position = levelPositions[i]
          const starColor = getStarColor(level)

          return (
            <div
              key={level}
              className="absolute"
              style={{
                ...position,
                zIndex: 1,
              }}
            >
              {/* Star above levels */}
              {/* Mostrar estrella con el color correspondiente (gris para actual/bloqueado, amarillo para completados) */}
              {starColor && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={starColor}
                    className="drop-shadow-sm"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={starColor} strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Level Circle - más grande */}
              {isLevelUnlocked(level) ? (
                <Link href={`/islands/relationships/level-${level}`} className="block">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: getLevelColor(level),
                      boxShadow: "0 4px 12px rgba(255, 145, 109, 0.3)",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {level}
                  </div>
                </Link>
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg select-none"
                  style={{
                    backgroundColor: getLevelColor(level),
                    boxShadow: "0 4px 12px rgba(255, 170, 160, 0.3)",
                    fontFamily: "var(--font-poppins)",
                    cursor: "not-allowed",
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {level}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0096C7] px-1 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-center gap-12">
          <Link href="/islands" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-islas.png" alt="Islas" width={28} height={28} />
            <span className="text-xs">Islas</span>
          </Link>

          <Link href="/mento" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/cerebro.png" alt="Mento" width={28} height={28} />
            <span className="text-xs">Mento</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-perfil.png" alt="Perfil" width={28} height={28} />
            <span className="text-xs">Perfil</span>
          </Link>

          <Link href="/settings" className="flex flex-col items-center gap-1 text-white">
            <Image src="/images/icono-ajustes.png" alt="Ajustes" width={28} height={28} />
            <span className="text-xs">Ajustes</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

