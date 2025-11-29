"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ForwardArrow } from "@/components/forward-arrow"
import Link from "next/link"
import { BackButton } from "@/components/back-button"
import { registerUser } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return

    setError("")
    setIsLoading(true)

    try {
      const response = await registerUser(email, password)

      if (!response.success) {
        setError(response.message || "Error al registrarse")
        setIsLoading(false)
        return
      }

      // Si el registro es exitoso, guardar usuario en el contexto y ir al onboarding
      // La respuesta viene como { success: true, data: { user: {...} } }
      if (response.success && response.data?.user) {
        console.log("✅ Guardando usuario en contexto después de registro:", response.data.user)
        login(response.data.user)
        console.log("✅ Usuario guardado en contexto y localStorage")
      } else {
        console.error("❌ Error: No se recibió usuario en la respuesta del registro:", response)
        setError("Error al procesar los datos del usuario.")
        setIsLoading(false)
        return
      }

      router.push("/onboarding/welcome")
    } catch (err) {
      console.error("Error en registro:", err)
      setError("Error de conexión con el servidor")
      setIsLoading(false)
    }
  }

  const isValid = email.trim() !== "" && password.trim() !== ""

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 bg-background relative">
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 justify-center flex-1">
        {/* Back button */}
        <div className="absolute top-10 left-10">
          <BackButton />
        </div>

        {/* Title */}
        <h1 className="text-[#0096C7] text-3xl font-bold text-center">Registrarse</h1>

        {/* Form fields */}
        <div className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
            className="w-4/5 px-6 py-4 bg-[#E2E2E2] rounded-xl text-[#FF6171] placeholder:text-[#FF6171]/60 text-base focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {error && (
            <div className="w-4/5 px-4 py-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end pr-8">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Continuar"
          >
            <ForwardArrow strokeColor="#00C49A" />
          </button>
        </div>

        {/* Login link */}
        <div className="text-center pt-8">
          <span className="text-[#0096C7]">¿Ya tienes cuenta? </span>
          <Link href="/login" className="text-[#0096C7] underline font-semibold">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  )
}
