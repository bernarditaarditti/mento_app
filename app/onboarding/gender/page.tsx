"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"

export default function OnboardingGenderPage() {
  const [selectedGender, setSelectedGender] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { update } = useOnboarding()

  // Mapeo a los ids de la tabla Genero
  const genderOptions: { id: number; label: string }[] = [
    { id: 2, label: "Femenino" },
    { id: 1, label: "Masculino" },
    { id: 3, label: "No binario" },
    { id: 4, label: "Prefiero no decirlo" },
  ]

  const handleContinue = async () => {
    if (selectedGender === null) return
    setIsLoading(true)
    update({ genero: selectedGender })
    setIsLoading(false)
    router.push("/onboarding/experience")
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
            ¿Con qué género te identificás?
          </h1>

          {/* Gender options */}
          <div className="w-full flex flex-col gap-3 items-center">
            {genderOptions.map((option) => (
              <Button
                key={option.id}
                onClick={() => setSelectedGender(option.id)}
                size="lg"
                className="w-4/5 h-14 rounded-xl font-semibold text-base transition-colors"
                style={{
                  backgroundColor: selectedGender === option.id ? "#00749A" : "#0096C7",
                  color: "white",
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <div className="w-full mt-auto flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-4/5 bg-accent hover:bg-accent/90 text-white font-bold text-base h-14 rounded-xl uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedGender || isLoading}
          >
            {isLoading ? "Guardando..." : "CONTINUAR"}
          </Button>
        </div>
      </div>
    </div>
  )
}
