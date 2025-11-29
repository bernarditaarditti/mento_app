# 🎯 REFERENCIA RÁPIDA - Frontend-Backend MENTO

## Import Copy-Paste

### Para obtener datos del usuario
```tsx
import { useAuth } from "@/context/AuthContext"

const { user, isLoggedIn, isLoading, logout } = useAuth()
```

### Para hacer llamadas al backend
```tsx
import { 
  loginUser, 
  registerUser, 
  getUser, 
  updateProgress, 
  getProgress, 
  saveOnboarding,
  apiCall 
} from "@/lib/api"
```

### Para usar el hook de API
```tsx
import { useApi } from "@/hooks/use-api"
```

---

## Snippets Comunes

### 1. Login
```tsx
const response = await loginUser("email@example.com", "password123")

if (response.success) {
  // Éxito - response.data contiene los datos del usuario
  login(response.data.user) // Guardar en context
} else {
  // Error - response.message contiene el mensaje
  setError(response.message)
}
```

### 2. Registro
```tsx
const response = await registerUser("email@example.com", "password123")

if (!response.success) {
  setError(response.message)
  return
}

// Ir al onboarding
router.push("/onboarding/welcome")
```

### 3. Obtener datos del usuario
```tsx
const response = await getUser("user-123")

if (response.success) {
  setUserData(response.data)
}
```

### 4. Guardar progreso
```tsx
const response = await updateProgress("user-123", {
  island: "family",
  level: 1,
  score: 85,
  completed: true
})
```

### 5. Guardar datos de onboarding
```tsx
const response = await saveOnboarding("user-123", {
  edad: 25,
  genero: "masculino",
  intensidad_emocional: 7,
  experiencia: "intermedio",
  metas: "mejorar relaciones"
})
```

### 6. Llamada genérica personalizada
```tsx
const response = await apiCall("/api/mi-endpoint", {
  method: "POST",
  body: { datos: "aquí" }
})
```

---

## Estructura de Respuesta

Todas las funciones devuelven:
```tsx
{
  success: boolean,      // true o false
  data?: any,           // Los datos (si es exitoso)
  message?: string      // El error (si falla)
}
```

### Usar:
```tsx
if (response.success) {
  const datos = response.data
} else {
  const error = response.message
}
```

---

## Estados Útiles

### Para todas las páginas
```tsx
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState("")
```

### Patrón completo
```tsx
const handleSubmit = async () => {
  setIsLoading(true)
  setError("")

  try {
    const response = await miFunction()

    if (!response.success) {
      setError(response.message)
      return
    }

    // Éxito
    console.log(response.data)

  } catch (err: any) {
    setError(err.message || "Error desconocido")
  } finally {
    setIsLoading(false)
  }
}
```

---

## useAuth Hook

```tsx
import { useAuth } from "@/context/AuthContext"

const { user, isLoggedIn, isLoading, login, logout, updateUser } = useAuth()

// user = { id_usuario, email, nombre, apellido, edad, genero, ... }
// isLoggedIn = true si hay usuario
// isLoading = true mientras carga desde localStorage
// login(user) = guardar usuario
// logout() = cerrar sesión
// updateUser({nombre: "Juan"}) = actualizar datos
```

---

## Proteger una página (requiere login)

```tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function ProtectedPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoading, isLoggedIn, router])

  if (isLoading) return <div>Cargando...</div>

  return <div>Contenido protegido</div>
}
```

---

## Mostrar datos del usuario

```tsx
import { useAuth } from "@/context/AuthContext"

export default function UserInfo() {
  const { user } = useAuth()

  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>ID: {user?.id_usuario}</p>
      <p>Edad: {user?.edad}</p>
      <p>Género: {user?.genero}</p>
    </div>
  )
}
```

---

## Formulario completo con validación

```tsx
"use client"

import { useState } from "react"
import { updateProgress } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function LevelForm() {
  const { user } = useAuth()
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar
    if (score < 0 || score > 100) {
      setError("Score debe estar entre 0 y 100")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    // Llamar API
    const response = await updateProgress(user!.id_usuario, {
      level: 1,
      score,
    })

    if (!response.success) {
      setError(response.message)
    } else {
      setSuccess(true)
      setScore(0) // Reset form
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(parseInt(e.target.value) || 0)}
        min="0"
        max="100"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>¡Guardado!</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  )
}
```

---

## Debug: Ver qué estás enviando/recibiendo

```tsx
const handleClick = async () => {
  console.log("Enviando:", { email, password })
  
  const response = await loginUser(email, password)
  
  console.log("Respuesta completa:", response)
  console.log("Éxito:", response.success)
  console.log("Datos:", response.data)
  console.log("Mensaje:", response.message)
}
```

---

## Variables de Entorno

```
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Si cambia el puerto del backend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Checklist para nueva página

- [ ] `"use client"` en la parte superior
- [ ] Importé funciones de API que necesito
- [ ] Importé `useAuth` si necesito datos del usuario
- [ ] Tengo estados: `isLoading`, `error`
- [ ] Llamadas a API tienen try-catch
- [ ] Muestro loading mientras se envía
- [ ] Muestro error si falla
- [ ] Manejo la respuesta exitosa

---

## Errores Comunes

### ❌ Error: "Cannot read property 'email' of null"
**Causa:** Usuario es null
**Solución:** Verifica `if (user)` antes de usar

```tsx
if (!user) return <div>Cargando...</div>
return <div>{user.email}</div>
```

### ❌ Error: "useAuth must be used within AuthProvider"
**Causa:** La página no está envuelta por AuthProvider
**Solución:** Ya lo agregué en `app/layout.tsx`, debería funcionar

### ❌ Error: "NEXT_PUBLIC_API_URL is undefined"
**Causa:** Variable de entorno no configurada
**Solución:** Agrega a `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### ❌ API retorna error 404
**Causa:** El endpoint no existe en el backend
**Solución:** Verifica que tu backend tiene la ruta `/api/...`

### ❌ CORS error
**Causa:** El backend no permite peticiones del frontend
**Solución:** Configura CORS en tu backend

---

## Atajos Rápidos

**Hacer una página protegida:**
Copia el código de "Proteger una página" arriba

**Mostrar datos del usuario:**
Copia el código de "Mostrar datos del usuario"

**Guardar datos:**
Copia el código de "Formulario completo"

**Debug:**
Copia el código de "Debug"

---

¡Listo! Ya tienes todo lo que necesitas para conectar el frontend con el backend. 🚀
