"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ForwardArrow } from "@/components/forward-arrow"
import Link from "next/link"
import { BackButton } from "@/components/back-button"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (email.trim()) {
      // TODO: Add password reset logic here
      setSubmitted(true)
      // Optionally redirect back to login after a delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }
  }

  const isValid = email.trim() !== ""

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <div className="w-full max-w-md text-center flex flex-col gap-6">
          <h2 className="text-[#0096C7] text-2xl font-bold mb-4">Correo enviado</h2>
          <p className="text-[#0096C7] text-lg">Revisa tu email para restablecer tu contraseña</p>
          <Link href="/login" className="text-[#0096C7] underline mt-4">
            Volver a inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-background relative">
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 justify-center flex-1 relative">
        {/* Back button */}
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>

        {/* Title */}
        <h1 className="text-[#0096C7] text-3xl font-bold text-center px-8 max-w-xs mx-auto leading-tight">
          Recuperar contraseña
        </h1>

        {/* Description */}
        <p className="text-[#0096C7] text-center text-base">
          Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña
        </p>

        {/* Form field */}
        <div className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pr-8">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Continuar"
          >
            <ForwardArrow strokeColor="#00C49A" />
          </button>
        </div>

        {/* Back to login link */}
        <div className="text-center pt-8">
          <Link href="/login" className="text-[#0096C7] underline">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
