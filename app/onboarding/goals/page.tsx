"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { BackButton } from "@/components/back-button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"

export default function OnboardingGoalsPage() {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { update, data } = useOnboarding()

  // Mapeo a ids de la tabla Objetivo
  const goals = [
    { id: 1, label: "Manejar el estrés" },
    { id: 2, label: "Mejorar la concentración" },
    { id: 3, label: "Cultivar pensamientos positivos" },
    { id: 4, label: "Resignificar mi forma de pensar" },
  ]

  const toggleGoal = (goalId: number) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]))
  }

  const handleContinue = async () => {
    if (selectedGoals.length === 0) return
    setIsLoading(true)
    
    // Guardar en el contexto (id)
    update({ objetivo: selectedGoals[0] })

    // Si no hay usuario, redirigir al login
    if (!user) {
      router.push("/login")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/onboarding/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: user.id_usuario,
          nombre: data.nombre,
          edad: data.edad,
          emociones: data.emociones || null,
          id_genero: data.genero || null,
          id_intensidad: data.intensidad || null,
          id_objetivo: selectedGoals[0] || null,
        }),
      })

      const result = await response.json()
      
      if (!result.success) {
        console.error("Error al guardar onboarding:", result.error)
      }
      
      // Redirigir a home siempre, incluso si hay error
      router.push("/home")
    } catch (error) {
      console.error("Error al guardar onboarding:", error)
      // Aunque haya error, permitir continuar y redirigir a home
      router.push("/home")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative">
      <div className="absolute top-10 left-10">
        <BackButton />
      </div>
      <div className="w-full max-w-md flex flex-col items-center gap-12">
        {/* Title */}
        <div className="w-full flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold text-center leading-relaxed" style={{ color: "#0096C7" }}>
            Elegí tu objetivo principal:
          </h1>

          {/* Options with checkboxes */}
          <div className="w-full flex flex-col gap-3 items-center">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className="w-4/5 min-h-14 px-4 py-3 rounded-xl font-semibold text-base text-white transition-colors hover:opacity-90 flex items-center gap-3"
                style={{
                  backgroundColor: "#0096C7",
                }}
              >
                {/* Checkbox square */}
                <div
                  className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: selectedGoals.includes(goal.id) ? "#00749A" : "transparent",
                    border: selectedGoals.includes(goal.id) ? "none" : "2px solid white",
                  }}
                >
                  {selectedGoals.includes(goal.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-left">{goal.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <div className="w-full mt-auto flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-4/5 font-semibold text-base h-14 rounded-xl text-white hover:opacity-90"
            style={{ backgroundColor: "#FF6171" }}
            disabled={selectedGoals.length === 0 || isLoading}
          >
            {isLoading ? "Guardando..." : "¡EMPECEMOS!"}
          </Button>
        </div>
      </div>
    </div>
  )
}
