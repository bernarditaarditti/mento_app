"use client"
import { createContext, useContext, useState } from "react"

interface OnboardingData {
  nombre?: string
  edad?: number
  genero?: number
  intensidad?: number
  objetivo?: number
  experiencia?: string
  emociones?: string[]
}

interface OnboardingContextType {
  data: OnboardingData
  update: (values: Partial<OnboardingData>) => void
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>({})

  const update = (values: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...values }))
  }

  const reset = () => {
    setData({})
  }

  return (
    <OnboardingContext.Provider value={{ data, update, reset }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error("useOnboarding debe usarse dentro de OnboardingProvider")
  return ctx
}
