"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { BackButton } from "@/components/back-button"
import useProgress from "@/hooks/use-progress"
import { useAuth } from "@/context/AuthContext"

export default function FamilyLevel5PlayPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading: authLoading } = useAuth()
  const { saveProgress, completarNivelActual } = useProgress()
  const [showGame, setShowGame] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [evaluated, setEvaluated] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  
  // Opciones correctas: índices 1, 2, 4
  // Opciones incorrectas: índices 0, 3, 5
  const correctAnswers = [1, 2, 4]
  const incorrectAnswers = [0, 3, 5]
  
  // Mostrar el escenario por 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGame(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleOptionClick = (index: number) => {
    // Si ya se evaluó, no permitir cambios
    if (evaluated) return
    
    // Permitir selección múltiple: agregar o quitar la opción del array
    setSelectedOptions(prev => {
      if (prev.includes(index)) {
        // Si ya está seleccionada, quitarla
        return prev.filter(i => i !== index)
      } else {
        // Si no está seleccionada, agregarla
        return [...prev, index]
      }
    })
  }

  const handleSubmit = () => {
    // Debe haber al menos una opción seleccionada
    if (selectedOptions.length === 0) return
    
    // Evaluar todas las opciones seleccionadas
    setEvaluated(true)
    
    // Verificar si hay alguna opción incorrecta seleccionada
    const hasIncorrect = selectedOptions.some(option => incorrectAnswers.includes(option))
    if (hasIncorrect) {
      // Si hay alguna incorrecta, mostrar error
      setShowErrorPopup(true)
      return
    }
    
    // Verificar si hay al menos una opción correcta seleccionada
    const hasCorrect = selectedOptions.some(option => correctAnswers.includes(option))
    
    if (hasCorrect) {
      // Si hay opciones correctas (aunque no todas) y ninguna incorrecta, mostrar éxito
      setShowSuccessPopup(true)
      
      // Marcar el nivel 5 como completado en localStorage
      localStorage.setItem("family_level_5_completed", "true")
    } else {
      // Si no hay ninguna opción correcta seleccionada
      setShowErrorPopup(true)
    }
  }

  const handleSuccessPopupClick = async () => {
    const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "")
    const levelMatch = path.match(/level-(\d+)/)
    const levelNum = levelMatch ? parseInt(levelMatch[1], 10) : 5
    const islandMatch = path.match(/islands\/([^\/]+)/)
    const islandKey = islandMatch ? islandMatch[1] : "family"
    const ISLAND_MAP: Record<string, number> = { work: 1, family: 2, relationships: 3, health: 4 }
    const idIsla = ISLAND_MAP[islandKey] ?? 2

    console.log(`🎮 Guardando progreso nivel ${levelNum}: isla=${idIsla}`)
    console.log(`👤 Usuario actual:`, user)

    if (!user || !user.id_usuario) {
      console.error("❌ No hay usuario logueado, redirigiendo a login...")
      router.push("/login")
      return
    }

    try {
      // Marcar el nivel como completado en la base de datos
      const resultCompletar = await completarNivelActual(idIsla, levelNum)
      console.log("📊 Resultado de completarNivelActual:", resultCompletar)
      
      if (!resultCompletar.success) {
        console.error("❌ Error al completar nivel:", resultCompletar.message)
      }
      
      // También guardar el progreso (nivel actual) por si acaso
      const resultSave = await saveProgress(idIsla, levelNum + 1)
      console.log("💾 Resultado de saveProgress:", resultSave)
    } catch (e: any) {
      console.error("❌ Error en handleSuccessPopupClick:", e)
      console.error("Stack:", e?.stack)
    }

    router.push(`/islands/${islandKey}`)
  }

  const handleRetry = () => {
    // Resetear el juego
    setSelectedOptions([])
    setEvaluated(false)
    setHoveredOption(null)
    setShowErrorPopup(false)
  }

  const handleCloseErrorPopup = () => {
    // Cerrar el popup de error
    setShowErrorPopup(false)
  }

  // Verificar si hay opciones incorrectas seleccionadas (después de evaluar)
  const hasIncorrectOption = evaluated && selectedOptions.some(option => incorrectAnswers.includes(option))

  const getOptionStyle = (index: number) => {
    // Si el usuario ganó (showSuccessPopup), pintar todas las opciones de sus respectivos colores
    if (showSuccessPopup) {
      if (correctAnswers.includes(index)) {
        return { backgroundColor: "#5CD98C" } // Opción correcta → verde #5CD98C
      } else if (incorrectAnswers.includes(index)) {
        return { backgroundColor: "#FF6464" } // Opción incorrecta → rojo
      }
    }
    
    // Si ya se evaluó, mostrar colores solo para las opciones seleccionadas
    if (evaluated && selectedOptions.includes(index)) {
      if (correctAnswers.includes(index)) {
        return { backgroundColor: "#5CD98C" } // Opción correcta seleccionada → verde #5CD98C
      } else if (incorrectAnswers.includes(index)) {
        return { backgroundColor: "#FF6464" } // Opción incorrecta seleccionada → rojo
      }
    }
    
    // Si está seleccionada pero aún no evaluada, mostrar color amarillo
    if (selectedOptions.includes(index) && !evaluated) {
      return { backgroundColor: "#F9B702" } // Amarillo cuando está seleccionada
    }
    
    // Estado inicial: amarillo claro
    return { backgroundColor: "#FED45F" }
  }

  // Pantalla inicial del escenario
  if (!showGame) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
        style={{ backgroundColor: "#FFCF4A" }}
      >
        {/* Scenario Text - centered at top */}
        <div className="absolute top-44 left-0 right-0 flex justify-center">
          <h1
            className="text-center text-white font-semibold px-4"
            style={{ 
              fontFamily: "var(--font-poppins)",
              fontSize: "32px"
            }}
          >
            Escenario:
            <br />
            Consejo a tu hermano
          </h1>
        </div>

        {/* Brain Character - centered */}
        <div className="flex items-center justify-center flex-1 pt-20">
          <Image
            src="/images/cerebro-familia.png"
            alt="Cerebro familia"
            width={270}
            height={232}
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  // Pantalla del juego
  const options = [
    "Es cierto, el mercado laboral es imposible",
    "Una negativa no define tu camino; esto te ayuda a ver qué mejorar",
    "Quizás esta experiencia te preparó para la próxima entrevista",
    "No le des importancia, ya fue",
    "Podemos revisar juntos tu CV o practicar para la próxima, no estás solo",
    "Si no te tomaron, seguramente algo hiciste mal"
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Back Button */}
      <div className="px-4 pt-6 pb-2 relative flex-shrink-0">
        {/* Back Button */}
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pb-24 flex flex-col gap-5 max-w-sm mx-auto w-full justify-center pt-10">
        {/* Scenario Box - Pink */}
        <div
          className="rounded-lg p-5 mx-auto"
          style={{ backgroundColor: "#FFC7D1", maxWidth: "85%" }}
        >
          <div className="flex flex-col gap-3" style={{ color: "#F36E86", fontFamily: "var(--font-poppins)" }}>
            <p className="font-medium text-center" style={{ fontSize: "15px" }}>
              Un hermano no es aceptado en un trabajo. Dice: <span className="font-bold">"Nunca voy a conseguir nada"</span>
            </p>
          </div>
        </div>

        {/* Instructions */}
        <h2
          className="text-center"
          style={{ 
            color: "#FFC832", 
            fontFamily: "var(--font-poppins)",
            fontSize: "16px",
            paddingLeft: "16px",
            paddingRight: "16px"
          }}
        >
          Elegí las frases constructivas
        </h2>

        {/* Options Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-3 relative max-w-[280px] mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              id={`option-${index}`}
              onClick={() => {
                if (!evaluated) {
                  handleOptionClick(index)
                }
              }}
              className="aspect-square rounded-lg p-2 text-white text-center font-normal transition-colors flex items-center justify-center"
              style={{
                ...getOptionStyle(index),
                fontFamily: "var(--font-poppins)",
                fontSize: "13px",
                opacity: evaluated && !selectedOptions.includes(index) ? 0.6 : 1,
                cursor: evaluated ? "default" : "pointer"
              }}
              onMouseEnter={(e) => {
                if (!evaluated && !selectedOptions.includes(index)) {
                  e.currentTarget.style.backgroundColor = "#F9B702"
                }
                // Mostrar popup si está evaluado
                if (evaluated) {
                  // Para opciones incorrectas: siempre mostrar
                  // Para opciones correctas: solo si fue seleccionada
                  if (incorrectAnswers.includes(index) || (correctAnswers.includes(index) && selectedOptions.includes(index))) {
                    setHoveredOption(index)
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!evaluated && !selectedOptions.includes(index)) {
                  e.currentTarget.style.backgroundColor = "#FED45F"
                }
                setHoveredOption(null)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Popup de error cuando se seleccionan opciones incorrectas */}
      {showErrorPopup && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4 cursor-pointer"
          onClick={handleCloseErrorPopup}
        >
          <div className="relative w-full max-w-[70%]">
            <div
              className="rounded-3xl p-6 shadow-2xl relative"
              style={{ backgroundColor: "#FF6464" }}
            >
              {/* Content */}
              <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-poppins)" }}>
                <h3
                  className="text-lg text-center text-white"
                  style={{ fontSize: "20px" }}
                >
                  ¡INCORRECTO!
                </h3>
                <p
                  className="text-center text-white"
                  style={{ fontSize: "16px" }}
                >
                  Esa interpretación aumenta la frustración
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de éxito cuando se seleccionan ambas opciones correctas */}
      {showSuccessPopup && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4 cursor-pointer"
          onClick={handleSuccessPopupClick}
        >
          <div className="relative w-full max-w-[70%]">
            <div
              className="rounded-3xl p-6 shadow-2xl relative"
              style={{ backgroundColor: "#5CD98C" }}
            >
              {/* Content */}
              <div className="flex flex-col gap-3" style={{ fontFamily: "var(--font-poppins)" }}>
                <h3
                  className="text-lg text-center text-white"
                  style={{ fontSize: "20px" }}
                >
                  ¡MUY BIEN!
                </h3>
                <p
                  className="text-center text-white"
                  style={{ fontSize: "16px" }}
                >
                  Reinterpretar la crítica como una oportunidad reduce el malestar y te ayuda a crecer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup para opciones después de evaluar */}
      {hoveredOption !== null && evaluated && !showSuccessPopup && !showErrorPopup && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center px-4 pointer-events-none" style={{ alignItems: "flex-start", paddingTop: "40%" }}>
          <div className="relative w-full max-w-[70%]">
            {incorrectAnswers.includes(hoveredOption) ? (
              // Popup para opciones incorrectas (rojo)
              <div
                className="rounded-3xl p-5 shadow-2xl relative"
                style={{ backgroundColor: "#FF6464" }}
              >
                {/* Arrow pointing up */}
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderBottom: "16px solid #FF6464",
                  }}
                />
                
                {/* Content */}
                <div className="flex flex-col gap-2.5" style={{ fontFamily: "var(--font-poppins)" }}>
                  <h3
                    className="text-lg text-center text-white"
                    style={{ fontSize: "18px" }}
                  >
                    ¡INCORRECTO!
                  </h3>
                  <p
                    className="text-center text-white"
                    style={{ fontSize: "14px" }}
                  >
                    Esa interpretación aumenta la frustración
                  </p>
                </div>
              </div>
            ) : (
              // Popup para opciones correctas (verde)
              <div
                className="rounded-3xl p-5 shadow-2xl relative"
                style={{ backgroundColor: "#5CD98C" }}
              >
                {/* Arrow pointing up */}
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderBottom: "16px solid #5CD98C",
                  }}
                />
                
                {/* Content */}
                <div className="flex flex-col gap-2.5" style={{ fontFamily: "var(--font-poppins)" }}>
                  <h3
                    className="text-lg text-center text-white"
                    style={{ fontSize: "18px" }}
                  >
                    ¡MUY BIEN!
                  </h3>
                  <p
                    className="text-center text-white"
                    style={{ fontSize: "14px" }}
                  >
                    Reinterpretar la crítica como una oportunidad reduce el malestar y te ayuda a crecer
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 pt-4 pb-8 flex justify-center items-center max-w-md mx-auto">
        {hasIncorrectOption ? (
          // Botón "Volver a intentar" centrado cuando hay opciones incorrectas
          <button
            onClick={handleRetry}
            className="px-8 py-4 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#00C49A", marginBottom: "5px" }}
          >
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-poppins)", fontSize: "18px" }}>
              Volver a intentar
            </span>
          </button>
        ) : (
          // Layout normal con cerebrito y botón verde
          <div className="flex justify-center items-center gap-28 w-full">
            {/* Brain Icon with Question Mark - Left */}
            <div 
              className="flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95" 
              style={{ transform: "translateY(-4px)" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("reconstrual_return_path", pathname)
                }
                router.push("/reconstrual")
              }}
            >
              <svg width="78" height="74" viewBox="0 0 78 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.4664 61.3984C38.4664 63.4197 38.4664 68.1361 38.4664 70.8312C39.1319 70.921 40.7822 71.3163 42.0599 72.1787" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.0924 61.3984C24.0924 62.6114 24.0924 64.1156 24.0924 66.1148C24.0924 67.447 24.0924 68.999 24.0924 70.8312C23.427 70.921 21.7766 71.3163 20.499 72.1787" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M46.3738 63.5214C47.8584 61.1277 54.167 64.5208 55.503 62.3771C56.839 60.2333 55.4777 56.4755 55.503 55.8446" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round"/>
                <path d="M14.6044 64.8286C13.1197 62.4349 6.81112 65.828 5.47513 63.6842C4.13915 61.5404 5.5005 57.7826 5.47512 57.1517" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round"/>
                <path d="M47.0306 60.7579C44.2501 62.8955 39.1881 62.7174 37.0047 62.3611C31.7739 64.0379 27.4311 62.7336 25.5314 61.6823C25.5179 61.6755 25.5043 61.6679 25.4907 61.6596C25.3483 61.5796 25.2203 61.5012 25.1072 61.4259C17.942 65.3805 13.4771 62.3611 12.1404 60.3571C3.47794 59.5021 2.20353 53.1427 2.64913 50.0699C-1.73555 42.8021 3.13929 38.135 6.12479 36.7099C7.19423 29.2283 13.6999 27.8923 16.8191 28.1595C20.5622 22.7086 27.3669 25.1798 30.8426 26.783C40.4675 22.7216 46.0058 27.4914 47.0306 30.6978C55.0514 31.8735 55.7198 37.8678 55.0514 40.7179C59.3291 44.8862 56.8338 51.3614 55.0514 54.0779C54.4097 59.5288 49.4369 60.8024 47.0306 60.7579Z" fill="#FF8FA3"/>
                <path d="M55.0514 54.0779C54.4097 59.5288 49.4369 60.8024 47.0306 60.7579C44.2501 62.8955 39.1881 62.7174 37.0047 62.3611C31.7739 64.0379 27.4311 62.7336 25.5314 61.6823M55.0514 54.0779C56.8338 51.3614 59.3291 44.8862 55.0514 40.7179M55.0514 54.0779C55.0471 53.3964 54.8781 51.7395 54.2365 50.5639M55.0514 40.7179C55.7198 37.8678 55.0514 31.8735 47.0306 30.6978C46.0058 27.4914 40.4675 22.7216 30.8426 26.783M55.0514 40.7179C54.6461 40.2591 53.6483 39.3147 52.8997 39.2078M30.8426 26.783C27.3669 25.1798 20.5622 22.7086 16.8191 28.1595C13.6999 27.8923 7.19423 29.2283 6.12479 36.7099M30.8426 26.783C31.3285 27.42 32.7676 29.0202 32.4467 30.6979M6.12479 36.7099C3.13929 38.135 -1.73555 42.8021 2.64913 50.0699C2.20353 53.1427 3.47794 59.5021 12.1404 60.3571C13.4771 62.3611 17.942 65.3805 25.1072 61.4259C25.231 61.5084 25.3727 61.5944 25.5314 61.6823M6.12479 36.7099C6.65951 36.4292 8.23692 35.8678 10.2688 35.8678M21.7653 30.1635C23.0129 29.3174 26.043 28.2396 28.1819 30.6979M6.12479 49.5355C5.0108 47.1307 4.28001 42.2142 10.2688 41.7867M10.2688 52.8755C10.1797 54.0779 10.5629 56.6965 12.8088 57.5515M24.2923 59.3815C24.4946 60.0432 25.0255 61.4299 25.5314 61.6823M39.3981 29.3214C40.4229 29.4281 42.5529 30.264 42.8737 32.7546M51.4292 52.1671C51.652 53.1333 51.4559 55.3144 48.8893 56.3087" stroke="#F36E86" strokeWidth="1.79672" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30.6259 44.4111H34.2193" stroke="black" strokeWidth="1.79672" strokeLinecap="round"/>
                <path d="M22.9495 36.8159C26.8564 36.8161 30.054 40.0531 30.054 44.0845C30.0539 48.1158 26.8563 51.3528 22.9495 51.353C19.0424 51.353 15.844 48.1159 15.844 44.0845C15.844 40.053 19.0424 36.8159 22.9495 36.8159Z" stroke="black" strokeWidth="1.79672"/>
                <path d="M41.869 36.8159C45.7939 36.816 49.0018 40.0559 49.0018 44.0845C49.0018 48.113 45.7939 51.353 41.869 51.353C37.9441 51.353 34.7363 48.113 34.7362 44.0845C34.7362 40.0559 37.9441 36.8159 41.869 36.8159Z" stroke="black" strokeWidth="1.79672"/>
                <ellipse cx="24.0183" cy="45.2388" rx="1.618" ry="2.28708" transform="rotate(-2.4504 24.0183 45.2388)" fill="black"/>
                <ellipse cx="41.1754" cy="45.0757" rx="1.618" ry="2.28708" transform="rotate(-2.4504 41.1754 45.0757)" fill="black"/>
                <path d="M29.3368 52.2515C29.2251 52.9184 29.6048 54.3058 32.017 54.5192C34.4292 54.7326 35.1439 53.0963 35.1997 52.2515" stroke="black" strokeWidth="1.63338" strokeLinecap="round"/>
                <path d="M67.9301 11.4678C70.1955 11.4678 72.0057 12.0606 73.3607 13.2462C74.7368 14.4318 75.4249 16.1044 75.4249 18.2639C75.4249 20.254 74.7686 21.8101 73.4559 22.9322C72.1645 24.0331 70.4496 24.5942 68.3112 24.6153L68.1524 26.9971H63.3888L63.2301 21.0903H65.1355C66.7657 21.0903 68.0042 20.8891 68.8511 20.4869C69.7191 20.0846 70.1532 19.3542 70.1532 18.2956C70.1532 17.5546 69.952 16.9724 69.5498 16.549C69.1475 16.1255 68.5865 15.9138 67.8666 15.9138C67.1045 15.9138 66.5117 16.1361 66.0882 16.5807C65.6648 17.0042 65.4531 17.5864 65.4531 18.3274H60.3401C60.2978 17.0359 60.5624 15.8715 61.1341 14.8341C61.7269 13.7967 62.5949 12.9816 63.7382 12.3887C64.9026 11.7748 66.2999 11.4678 67.9301 11.4678ZM65.8342 35.2541C64.8814 35.2541 64.0981 34.9788 63.4841 34.4284C62.8913 33.8567 62.5949 33.1581 62.5949 32.3324C62.5949 31.4855 62.8913 30.7763 63.4841 30.2046C64.0981 29.633 64.8814 29.3472 65.8342 29.3472C66.7657 29.3472 67.5279 29.633 68.1207 30.2046C68.7347 30.7763 69.0417 31.4855 69.0417 32.3324C69.0417 33.1581 68.7347 33.8567 68.1207 34.4284C67.5279 34.9788 66.7657 35.2541 65.8342 35.2541Z" fill="#FF8FA3"/>
              </svg>
            </div>

            {/* Checkmark Button - Right */}
            <button
              onClick={handleSubmit}
              disabled={evaluated || selectedOptions.length === 0}
              className="transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ transform: "translate(4px, 2px)" }}
            >
              <svg width="65" height="57" viewBox="0 0 65 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="65" height="57" rx="15" fill="#00C49A"/>
                <path d="M21 27.1935L29.4 37L45 18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

