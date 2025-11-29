# Ejemplos Prácticos - Conectar Páginas con el Backend

## 📚 Índice de Ejemplos

1. [Página de Home - Mostrar usuario](#página-de-home)
2. [Página de Onboarding - Guardar datos](#página-de-onboarding)
3. [Páginas de Islas - Guardar progreso](#página-de-isla)
4. [Hook personalizado para Islas](#hook-personalizado)
5. [Protección de rutas](#protección-de-rutas)
6. [Mostrar errores con Toast](#toast)
7. [Cargar datos al montar](#cargar-datos)

---

## Página de Home

Mostrar datos del usuario logueado:

```tsx
// app/home/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function HomePage() {
  const router = useRouter()
  const { user, isLoggedIn, isLoading } = useAuth()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Redirigir si no está logueado
    if (!isLoading && !isLoggedIn) {
      router.push("/login")
    } else if (!isLoading) {
      setIsInitialLoading(false)
    }
  }, [isLoading, isLoggedIn, router])

  if (isInitialLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bienvenido, {user?.email}</h1>
      <p>ID: {user?.id_usuario}</p>
      {/* Resto del contenido */}
    </div>
  )
}
```

---

## Página de Onboarding

Guardar datos progresivamente en cada paso:

```tsx
// app/onboarding/age/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { saveOnboarding } from "@/lib/api"

export default function AgePage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const [age, setAge] = useState<number | "">("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleNext = async () => {
    if (!age || !user) return

    setIsLoading(true)
    setError("")

    // Guardar en el backend
    const response = await saveOnboarding(user.id_usuario, {
      edad: age,
    })

    if (!response.success) {
      setError(response.message)
      setIsLoading(false)
      return
    }

    // Actualizar en el context local
    updateUser({ edad: age })

    // Ir al siguiente paso
    router.push("/onboarding/gender")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">¿Cuál es tu edad?</h1>
      
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
        placeholder="Ingresa tu edad"
        className="px-4 py-2 border rounded-lg mb-4"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleNext}
        disabled={!age || isLoading}
        className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Guardando..." : "Continuar"}
      </button>
    </div>
  )
}
```

---

## Página de Isla

Guardar progreso cuando el usuario completa un nivel:

```tsx
// app/islands/family/level-1/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { updateProgress } from "@/lib/api"

export default function FamilyLevel1Page() {
  const router = useRouter()
  const { user } = useAuth()
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleComplete = async () => {
    if (!user) return

    setIsLoading(true)

    // Guardar progreso en el backend
    const response = await updateProgress(user.id_usuario, {
      island: "family",
      level: 1,
      score: score,
      completed: true,
      completedAt: new Date().toISOString(),
    })

    if (response.success) {
      // Ir al siguiente nivel
      router.push("/islands/family/level-2")
    } else {
      console.error("Error al guardar progreso:", response.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Isla Familiar - Nivel 1</h1>
      
      <div className="text-center mb-8">
        <p className="text-2xl font-bold">Puntuación: {score}</p>
      </div>

      <button
        onClick={handleComplete}
        disabled={isLoading}
        className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Guardando..." : "Completar nivel"}
      </button>
    </div>
  )
}
```

---

## Hook Personalizado

Hook reutilizable para manejar el progreso de las islas:

```tsx
// hooks/useIslandProgress.ts
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { updateProgress } from "@/lib/api"

export function useIslandProgress(island: string, level: number) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState(0)

  const saveProgress = async (finalScore: number) => {
    if (!user) return

    setIsLoading(true)
    const response = await updateProgress(user.id_usuario, {
      island,
      level,
      score: finalScore,
      completed: true,
    })
    setIsLoading(false)

    return response.success
  }

  return { isLoading, saveProgress, score, setScore }
}

// Uso:
// const { isLoading, saveProgress } = useIslandProgress("family", 1)
// await saveProgress(100)
```

---

## Protección de Rutas

Crear un middleware para proteger rutas que necesitan autenticación:

```tsx
// middleware.ts (en la raíz del proyecto)
import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/home", "/islands", "/profile", "/settings"]

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value

  // Si intenta acceder a una ruta protegida sin usuario
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Si ya está logueado, no puede ir a login/register
  if ((request.nextUrl.pathname.startsWith("/login") || 
       request.nextUrl.pathname.startsWith("/register")) && user) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/home/:path*",
    "/islands/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
}
```

---

## Toast

Mostrar mensajes de error con notificaciones:

```tsx
"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from "@/lib/api"

export default function LoginWithToast() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)

    const response = await loginUser(email, password)

    if (!response.success) {
      toast({
        title: "Error en login",
        description: response.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Éxito",
        description: "¡Bienvenido!",
      })
    }

    setIsLoading(false)
  }

  return (
    <button onClick={() => handleLogin("user@example.com", "password")}>
      Iniciar sesión
    </button>
  )
}
```

---

## Cargar Datos

Cargar datos cuando el componente se monta:

```tsx
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { getProgress } from "@/lib/api"

export default function ProgressPage() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return

      const response = await getProgress(user.id_usuario)

      if (response.success) {
        setProgress(response.data)
      } else {
        setError(response.message)
      }

      setIsLoading(false)
    }

    fetchProgress()
  }, [user])

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return <div>{JSON.stringify(progress, null, 2)}</div>
}
```

---

## 🎯 Resumen de Pasos

Para conectar cualquier página:

1. ✅ Importa `useAuth` para acceder a los datos del usuario
2. ✅ Importa la función de API que necesitas (`loginUser`, `updateProgress`, etc.)
3. ✅ Crea estados para `isLoading` y `error`
4. ✅ Crea un manejador que llame a la función de API
5. ✅ Actualiza la UI basada en el estado
6. ✅ Maneja errores mostrando mensajes al usuario

¡Listo! Ahora tu frontend está conectado con el backend. 🚀
