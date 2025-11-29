"use client"

import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOnboarding } from "@/context/OnboardingContext"

export default function OnboardingNamePage() {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { update } = useOnboarding()

  const handleContinue = async () => {
    if (!name.trim()) return
    setIsLoading(true)
    update({ nombre: name })
    setIsLoading(false)
    router.push("/onboarding/age")
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
            ¿Cuál es tu nombre?
          </h1>

          {/* Input field */}
          <div className="w-full flex justify-center">
          <Input
            type="text"
            placeholder="Escribe tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
              className="w-4/5 h-14 rounded-xl border-0 text-base px-4"
            style={{ backgroundColor: "#E2E2E2", color: "#999999" }}
          />
          </div>
        </div>

        {/* Continue button */}
        <div className="w-full mt-auto flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            className="w-4/5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? "Guardando..." : "CONTINUAR"}
          </Button>
        </div>
      </div>
    </div>
  )
}
