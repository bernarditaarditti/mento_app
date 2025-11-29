"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"

export default function OnboardingEmotionalIntensityPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { update } = useOnboarding()

  // Mapeo a ids de la tabla Intensidad
  const options: { id: number; label: string }[] = [
    { id: 1, label: "Muy intenso" },
    { id: 2, label: "Moderado" },
    { id: 3, label: "Tranquilo" },
  ]

  const iconByOption: Record<string, string> = {
    "Muy intenso": "/images/icono-panico.png",
    Moderado: "/images/icono-yoga.png",
    Tranquilo: "/images/emoji.png",
  }

  const handleContinue = async () => {
    if (!selectedOption) return
    setIsLoading(true)
    update({ intensidad: selectedOption })
    setIsLoading(false)
    router.push("/onboarding/goals")
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
            ¿Cómo sentís que se mueve
            <br />
            tu mundo emocional?
          </h1>

          {/* Options */}
          <div className="w-full flex flex-col gap-3 items-center">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className="w-4/5 min-h-20 py-3 rounded-xl font-semibold text-base text-white transition-colors hover:opacity-90 flex items-center gap-3 px-3"
                style={{
                  backgroundColor: selectedOption === option.id ? "#00749A" : "#0096C7",
                }}
              >
                <span className="flex items-center justify-center">
                  <Image
                    src={iconByOption[option.label] ?? "/placeholder.svg"}
                    alt={option.label}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </span>
                <span className="text-left flex-1">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <div className="w-full mt-auto flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-4/5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedOption === null || isLoading}
          >
            {isLoading ? "Guardando..." : "CONTINUAR"}
          </Button>
        </div>
      </div>
    </div>
  )
}
