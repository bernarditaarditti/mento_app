"use client"

import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { obtenerProgresoNiveles } from "@/lib/api"

export default function WorkLevel2Page() {
  const router = useRouter()
  const { user } = useAuth()
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set())
  const [ultimoNivelDesbloqueado, setUltimoNivelDesbloqueado] = useState<number>(1)
  const totalLevels = 5

  // Función para cargar progreso
  const cargarProgreso = useCallback(async () => {
    if (!user?.id_usuario) return
    
    try {
      const idIsla = 1 // Work
      const idUsuario = parseInt(user.id_usuario.toString(), 10)
      const response = await obtenerProgresoNiveles(idUsuario, idIsla)
      
      if (response.success && response.data) {
        const nivelesCompletados = response.data.nivelesCompletados || []
        const ultimoDesbloqueado = response.data.ultimoNivelDesbloqueado || 1
        setCompletedLevels(new Set(nivelesCompletados))
        setUltimoNivelDesbloqueado(ultimoDesbloqueado)
      } else {
        setUltimoNivelDesbloqueado(1)
        setCompletedLevels(new Set())
      }
    } catch (error) {
      console.error("Error al cargar progreso:", error)
      setUltimoNivelDesbloqueado(1)
      setCompletedLevels(new Set())
    }
  }, [user])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!user?.id_usuario) return
    cargarProgreso()
  }, [user, cargarProgreso])

  // También verificar localStorage como respaldo para niveles completados
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const completed = new Set<number>()
    for (let i = 1; i <= 5; i++) {
      if (localStorage.getItem(`work_level_${i}_completed`) === "true") {
        completed.add(i)
      }
    }
    if (completed.size > 0) {
      setCompletedLevels(prev => new Set([...prev, ...completed]))
    }
  }, [])

  const isLevelUnlocked = (level: number) => {
    // El nivel 1 siempre está desbloqueado
    if (level === 1) return true
    // Un nivel está desbloqueado si es menor o igual al último nivel desbloqueado
    // O si el nivel anterior está completado
    return level <= ultimoNivelDesbloqueado || completedLevels.has(level - 1)
  }

  const getLevelColor = (level: number) => {
    // Si está bloqueado: color tenue (#ACD7E5 - azul claro)
    if (!isLevelUnlocked(level)) {
      return "#ACD7E5"
    }
    // Si está desbloqueado o completado: color brillante (#0096C7 - azul)
    return "#0096C7"
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

  const levelPositions = [
    { top: "5%", left: "15%", transform: "translateX(0)" }, // Nivel 1 - top izquierda
    { top: "20%", right: "15%", transform: "translateX(0)" }, // Nivel 2 - below and derecha
    { top: "40%", left: "15%", transform: "translateX(0)" }, // Nivel 3 - below and izquierda
    { top: "53%", right: "15%", transform: "translateX(0)" }, // Nivel 4 - below and derecha
    { top: "72%", left: "15%", transform: "translateX(0)" }, // Nivel 5 - bottom izquierda
  ]

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Redirigir a islands/work al hacer click en el fondo
    router.push("/islands/work")
  }

  return (
    <div 
      className="min-h-screen flex flex-col bg-background"
      onClick={handleBackgroundClick}
    >
      {/* Title with Back Button */}
      <div className="px-4 pt-8 pb-2 relative">
        <div className="absolute left-10 top-10" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => router.push("/islands/work")}
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
        <h1 className="text-[#0096C7] text-xl font-bold text-center mt-16">Trabajo/Educación</h1>
      </div>

      {/* Levels Path with Popup Card */}
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
                zIndex: level === 2 ? 10 : 1,
              }}
            >
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

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{
                  backgroundColor: getLevelColor(level),
                  boxShadow: "0 4px 12px rgba(0, 150, 199, 0.3)",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                {level}
              </div>
            </div>
          )
        })}

        {/* Popup Card for Level 2 - positioned below level 2 circle */}
        <div
          className="absolute"
          style={{
            top: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "80%",
            maxWidth: "320px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="rounded-3xl shadow-2xl relative"
            style={{ backgroundColor: "#FFCFD7", fontFamily: "var(--font-poppins)", padding: "1.25rem 1.25rem 0 1.25rem" }}
          >
            {/* Speech bubble tail pointing up to level 2 circle */}
            {/* Nivel 2 está en right: 15%, top: 20%, el recuadro está centrado, así que el triángulo debe apuntar hacia arriba-derecha */}
            <div
              className="absolute"
              style={{
                top: "-14px",
                right: "20%",
                width: "28px",
                height: "28px",
                transform: "rotate(45deg)",
                backgroundColor: "#FFCFD7",
              }}
            />

            {/* Content */}
            <div className="flex flex-col items-center gap-1.5" style={{ fontFamily: "var(--font-poppins)" }}>
              {/* NIVEL 2 */}
              <h2
                className="font-bold uppercase"
                style={{ color: "#F36E86", fontSize: "32px", fontWeight: "900" }}
              >
                NIVEL 2
              </h2>

              {/* Repurposing */}
              <p
                className="font-bold"
                style={{ color: "#F36E86", fontSize: "20px", fontWeight: "900" }}
              >
                Repurposing
              </p>

              {/* Star - larger */}
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill={getStarColor(2)}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>

              {/* Description */}
              <p
                className="text-center leading-relaxed font-bold"
                style={{ color: "#F36E86", fontSize: "20px", fontWeight: "900" }}
              >
                Plan B
              </p>

              {/* Play button - positioned at bottom of card, half extending below */}
              <div className="flex justify-center mt-2" style={{ marginBottom: "-32px" }}>
                <Link href="/islands/work/level-2/game">
                <button
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 relative z-10"
                  style={{ backgroundColor: "#52B788" }}
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
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

