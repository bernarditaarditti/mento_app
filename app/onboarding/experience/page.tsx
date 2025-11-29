"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"

export default function OnboardingExperiencePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { update } = useOnboarding()

  const options = ["Sí", "No"]

  const handleContinue = async () => {
    if (!selectedOption) return
    setIsLoading(true)
    update({ experiencia: selectedOption })
    setIsLoading(false)
    router.push("/onboarding/emotional-intensity")
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
            ¿Alguna vez trabajaste
            <br />
            en tus emociones?
          </h1>

          {/* Options */}
          <div className="w-full flex flex-col gap-3 items-center">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className="w-4/5 h-14 rounded-xl font-semibold text-base text-white transition-colors hover:opacity-90"
                style={{
                  backgroundColor: selectedOption === option ? "#00749A" : "#0096C7",
                }}
              >
                {option}
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
            disabled={!selectedOption || isLoading}
          >
            {isLoading ? "Guardando..." : "CONTINUAR"}
          </Button>
        </div>
      </div>
    </div>
  )
}
