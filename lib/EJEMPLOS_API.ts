/**
 * EJEMPLOS DE CÓMO CONECTAR EL FRONTEND CON EL BACKEND
 * 
 * Este archivo contiene ejemplos de patrones comunes para usar en tus páginas
 */

// ============================================================
// EJEMPLO 1: En una página "use client" - Llamada simple
// ============================================================

/*
"use client"

import { useState, useEffect } from "react"
import { getUser } from "@/lib/api"

export default function MyPage() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const userId = "123" // Obtener del contexto o localStorage
      const response = await getUser(userId)
      
      if (response.success) {
        setUserData(response.data)
      } else {
        setError(response.message)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return <div>{JSON.stringify(userData)}</div>
}
*/

// ============================================================
// EJEMPLO 2: Enviar datos (POST) con manejo de errores
// ============================================================

/*
"use client"

import { useState } from "react"
import { updateProgress } from "@/lib/api"

export default function ProgressPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSaveProgress = async () => {
    setIsLoading(true)
    setError("")

    const response = await updateProgress("user-123", {
      island: "family",
      level: 3,
      score: 100,
    })

    if (!response.success) {
      setError(response.message)
    } else {
      console.log("Progreso guardado:", response.data)
    }

    setIsLoading(false)
  }

  return (
    <button onClick={handleSaveProgress} disabled={isLoading}>
      {isLoading ? "Guardando..." : "Guardar progreso"}
    </button>
  )
}
*/

// ============================================================
// EJEMPLO 3: Guardar datos en localStorage después del login
// ============================================================

/*
import { loginUser } from "@/lib/api"

const handleLogin = async (email: string, password: string) => {
  const response = await loginUser(email, password)
  
  if (response.success) {
    // Guardar datos del usuario en localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user))
    localStorage.setItem("userId", response.data.user.id_usuario)
    
    // Redirigir
    router.push("/home")
  }
}
*/

// ============================================================
// EJEMPLO 4: Hook personalizado para reutilizar lógica
// ============================================================

/*
import { useState, useCallback } from "react"
import { apiCall } from "@/lib/api"

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const execute = useCallback(
    async (method = "GET", body = null) => {
      setIsLoading(true)
      setError("")

      const response = await apiCall(endpoint, { method, body })

      if (response.success) {
        setData(response.data as T)
      } else {
        setError(response.message)
      }

      setIsLoading(false)
    },
    [endpoint]
  )

  return { data, isLoading, error, execute }
}

// Uso:
// const { data, isLoading, error, execute } = useApi("/api/user")
// await execute("GET")
*/

// ============================================================
// EJEMPLO 5: Validación antes de enviar
// ============================================================

/*
const handleSubmit = async (email: string, password: string) => {
  // Validar antes de enviar
  if (!email.includes("@")) {
    setError("Email inválido")
    return
  }

  if (password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres")
    return
  }

  const response = await registerUser(email, password)
  // ... resto del código
}
*/

// ============================================================
// EJEMPLO 6: Enviar formData (para archivos)
// ============================================================

/*
export async function uploadFile(file: File, userId: string) {
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("userId", userId)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || data.error,
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
*/

// ============================================================
// CONFIGURACIÓN: Variable de entorno necesaria
// ============================================================

/*
En tu archivo .env.local o .env, agrega:

NEXT_PUBLIC_API_URL=http://localhost:3000

O si tu backend está en otro servidor:

NEXT_PUBLIC_API_URL=http://localhost:5000
*/

export {}
