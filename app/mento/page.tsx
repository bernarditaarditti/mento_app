"use client"

import Link from "next/link"
import Image from "next/image"
import { BackButton } from "@/components/back-button"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function MentoPage() {
  const [expandedPink, setExpandedPink] = useState(true)
  const [expanded1, setExpanded1] = useState(false)
  const [expanded2, setExpanded2] = useState(false)
  const [hasOpenedBlue, setHasOpenedBlue] = useState(false)
  
  const handleExpandPink = () => {
    // Solo permite interactuar si alguna ventana azul ha sido abierta
    if (hasOpenedBlue) {
      setExpandedPink(!expandedPink)
      if (!expandedPink) {
        setExpanded1(false)
        setExpanded2(false)
      }
    }
  }
  
  const handleExpand1 = () => {
    setExpanded1(!expanded1)
    if (!expanded1) {
      setExpandedPink(false)
      setExpanded2(false)
      setHasOpenedBlue(true) // Marcar que se abrió una ventana azul
    }
  }
  
  const handleExpand2 = () => {
    setExpanded2(!expanded2)
    if (!expanded2) {
      setExpandedPink(false)
      setExpanded1(false)
      setHasOpenedBlue(true) // Marcar que se abrió una ventana azul
    }
  }
  
  // La rosa solo muestra flechita si alguna ventana azul ha sido abierta
  const showPinkChevron = hasOpenedBlue && !expandedPink

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}>
      {/* Header with Back Button */}
      <div className="px-4 pt-6 pb-2 relative flex-shrink-0">
        {/* Back Button - Same as onboarding */}
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>
      </div>

      {/* Main Content - Optimized for iPhone 16 */}
      <div className="flex-1 px-4 pb-24 flex flex-col gap-4 max-w-sm mx-auto w-full overflow-y-auto pt-12" style={{ minHeight: 0 }}>
        {/* Brain Icon - Positioned at the top, centered */}
        <div className="flex items-center justify-center mb-2">
          <svg width="90" height="78" viewBox="0 0 59 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.7603 37.7725C38.7603 39.8092 38.7603 44.5616 38.7603 47.2773C39.4308 47.3678 41.0937 47.7661 42.3811 48.6351" stroke="#F36E86" strokeWidth="1.81044" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.2764 38.7725C24.2764 39.9947 24.2764 41.5104 24.2764 43.5249C24.2764 44.8673 24.2764 46.4311 24.2764 48.2773C23.6058 48.3678 21.9429 48.7661 20.6555 49.6351" stroke="#F36E86" strokeWidth="1.81044" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.728 39.9119C48.224 37.4999 54.5808 40.9189 55.927 38.7588C57.2732 36.5986 55.9015 32.8121 55.927 32.1764" stroke="#F36E86" strokeWidth="1.81044" strokeLinecap="round"/>
            <path d="M14.7158 42.2293C13.2199 39.8173 6.86303 43.2363 5.51684 41.0761C4.17064 38.916 5.54239 35.1295 5.51683 34.4937" stroke="#F36E86" strokeWidth="1.81044" strokeLinecap="round"/>
            <path d="M47.3899 37.1273C44.5882 39.2812 39.4875 39.1017 37.2874 38.7427C32.0166 40.4324 27.6406 39.118 25.7265 38.0587C25.7128 38.0519 25.6991 38.0443 25.6854 38.0358C25.542 37.9552 25.4129 37.8763 25.299 37.8004C18.0791 41.7851 13.5801 38.7427 12.2331 36.7234C3.50448 35.8619 2.22034 29.4539 2.66934 26.3576C-1.74884 19.0343 3.16324 14.3315 6.17156 12.8956C7.24916 5.35679 13.8046 4.01057 16.9476 4.2798C20.7192 -1.21273 27.576 1.27739 31.0782 2.89284C40.7766 -1.19964 46.3572 3.60663 47.3899 6.83752C55.472 8.02219 56.1455 14.0622 55.472 16.9342C59.7824 21.1343 57.268 27.6589 55.472 30.3962C54.8254 35.8888 49.8145 37.1722 47.3899 37.1273Z" fill="#FF8FA3"/>
            <path d="M55.472 30.3962C54.8254 35.8888 49.8145 37.1722 47.3899 37.1273C44.5882 39.2812 39.4875 39.1017 37.2874 38.7427C32.0166 40.4324 27.6406 39.118 25.7265 38.0587M55.472 30.3962C57.268 27.6589 59.7824 21.1343 55.472 16.9342M55.472 30.3962C55.4676 29.7095 55.2974 28.04 54.6508 26.8553M55.472 16.9342C56.1455 14.0622 55.472 8.02219 47.3899 6.83752C46.3572 3.60663 40.7766 -1.19964 31.0782 2.89284M55.472 16.9342C55.0635 16.4718 54.0581 15.5203 53.3038 15.4126M31.0782 2.89284C27.576 1.27739 20.7192 -1.21273 16.9476 4.2798C13.8046 4.01057 7.24916 5.35679 6.17156 12.8956M31.0782 2.89284C31.5678 3.53466 33.0179 5.14705 32.6946 6.8376M6.17156 12.8956C3.16324 14.3315 -1.74884 19.0343 2.66934 26.3576C2.22034 29.4539 3.50448 35.8619 12.2331 36.7234C13.5801 38.7427 18.0791 41.7851 25.299 37.8004C25.4237 37.8834 25.5665 37.9702 25.7265 38.0587M6.17156 12.8956C6.71036 12.6127 8.29982 12.0471 10.3473 12.0471M21.9315 6.29914C23.1887 5.44652 26.2419 4.36055 28.3971 6.8376M6.17156 25.8192C5.04905 23.396 4.31268 18.4419 10.3473 18.0111M10.3473 29.1847C10.2575 30.3963 10.6436 33.0348 12.9066 33.8964M24.4779 35.7403C24.6817 36.4071 25.2167 37.8044 25.7265 38.0587M39.699 5.45063C40.7317 5.55806 42.878 6.40034 43.2013 8.90999M51.8221 28.4708C52.0466 29.4444 51.849 31.6421 49.2628 32.644" stroke="#F36E86" strokeWidth="1.81044" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30.8599 21.6553H34.4808" stroke="black" strokeWidth="1.81044" strokeLinecap="round"/>
            <path d="M23.124 14.002C27.0609 14.002 30.2842 17.2639 30.2842 21.3262C30.2841 25.3884 27.0609 28.6504 23.124 28.6504C19.1873 28.6503 15.9649 25.3883 15.9648 21.3262C15.9648 17.264 19.1872 14.0021 23.124 14.002Z" stroke="black" strokeWidth="1.81044"/>
            <path d="M42.189 13.002C46.1439 13.002 49.3755 16.2668 49.3755 20.3262C49.3754 24.3854 46.1438 27.6503 42.189 27.6504C38.2341 27.6504 35.0016 24.3855 35.0015 20.3262C35.0015 16.2668 38.234 13.002 42.189 13.002Z" stroke="black" strokeWidth="1.81044"/>
            <ellipse cx="24.202" cy="22.4896" rx="1.63036" ry="2.30455" transform="rotate(-2.4504 24.202 22.4896)" fill="black"/>
            <ellipse cx="41.4901" cy="21.3255" rx="1.63036" ry="2.30455" transform="rotate(-2.4504 41.4901 21.3255)" fill="black"/>
            <path d="M29.5608 29.5557C29.4483 30.2277 29.8309 31.6256 32.2615 31.8407C34.6921 32.0558 35.4123 30.407 35.4685 29.5557" stroke="black" strokeWidth="1.64586" strokeLinecap="round"/>
          </svg>
        </div>

        {/* First Box - Pink - ¿Qué es el "Reappraisal"? */}
        <div
          className={`rounded-xl px-8 py-4 flex-shrink-0 mx-auto w-full ${hasOpenedBlue ? 'cursor-pointer' : ''}`}
          style={{ backgroundColor: "rgba(255, 199, 209, 0.82)", maxWidth: "82%" }}
          onClick={handleExpandPink}
        >
          <div className="flex items-center justify-center">
            <h2
              className="font-bold text-center"
              style={{ fontSize: "18px", color: "#F36E86", fontFamily: "var(--font-poppins)" }}
            >
              ¿Qué es el <span style={{ color: "#F36E86", fontWeight: "bold" }}>"Reappraisal"</span>?
            </h2>
          </div>
          {expandedPink && (
            <div className="mt-2 pt-2">
              <p className="font-normal text-center" style={{ fontSize: "16px", lineHeight: "1.6", color: "#FF8FA3", fontFamily: "var(--font-poppins)" }}>
                Es una forma de regular tus emociones cambiando cómo interpretas una situación. No se trata de negar lo que pasa, sino de mirarlo desde otro ángulo que te haga sentir un poco mejor
              </p>
            </div>
          )}
        </div>

        {/* Second Box - Blue - ¿Por qué la usa MENTO? */}
        <div
          className="rounded-xl px-5 flex-shrink-0 mx-auto w-full cursor-pointer"
          style={{ backgroundColor: "#C7EAF5", maxWidth: "82%", paddingTop: expanded1 ? "1.5rem" : "1rem", paddingBottom: expanded1 ? "1.5rem" : "1rem" }}
          onClick={handleExpand1}
        >
          <div className="flex items-center justify-between">
            <h2
              className="font-bold"
              style={{ fontSize: "16px", color: "#0096C7", fontFamily: "var(--font-poppins)" }}
            >
              ¿Por qué la usa MENTO?
            </h2>
            <ChevronDown 
              className={`transition-transform duration-200 ${expanded1 ? 'rotate-180' : ''}`}
              style={{ color: "#0096C7", width: "20px", height: "20px" }}
            />
          </div>
          {expanded1 && (
            <div className="mt-2 pt-2">
              <div className="flex flex-col gap-2 font-normal text-center" style={{ fontSize: "15px", lineHeight: "1.6", color: "#0096C7", fontFamily: "var(--font-poppins)" }}>
                <p>
                  Ayuda a bajar la intensidad de emociones difíciles
                </p>
                <p>
                  Te permite ver las cosas con más claridad y calma
                </p>
                <p>
                  Es una habilidad simple, práctica y entrenable
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Third Box - Blue - ¿Cómo te ayudará MENTO? */}
        <div
          className="rounded-xl px-5 flex-shrink-0 mx-auto w-full cursor-pointer"
          style={{ backgroundColor: "#C7EAF5", maxWidth: "82%", paddingTop: expanded2 ? "1.5rem" : "1rem", paddingBottom: expanded2 ? "1.5rem" : "1rem" }}
          onClick={handleExpand2}
        >
          <div className="flex items-center justify-between">
            <h2
              className="font-bold"
              style={{ fontSize: "16px", color: "#0096C7", fontFamily: "var(--font-poppins)" }}
            >
              ¿Cómo te ayudará MENTO?
            </h2>
            <ChevronDown 
              className={`transition-transform duration-200 ${expanded2 ? 'rotate-180' : ''}`}
              style={{ color: "#0096C7", width: "20px", height: "20px" }}
            />
          </div>
          {expanded2 && (
            <div className="mt-2 pt-2">
              <div className="flex flex-col gap-2 font-normal text-center" style={{ fontSize: "15px", lineHeight: "1.6", color: "#0096C7", fontFamily: "var(--font-poppins)" }}>
                <p>
                  La app te guiará paso a paso para:
                </p>
                <p>
                  • Identificar el pensamiento que te genera malestar
                </p>
                <p>
                  • Explorar otras formas de verlo
                </p>
                <p>
                  • Elegir el reencuadre que te resulte realista y útil
                </p>
              </div>
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
