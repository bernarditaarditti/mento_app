# 🚀 RESUMEN - Frontend-Backend MENTO

## ✅ Ya está configurado

### 1. **Archivos de configuración creados**
- ✅ `lib/api.ts` - Funciones reutilizables para llamar al backend
- ✅ `hooks/use-api.ts` - Hook personalizado para manejo de API calls
- ✅ `context/AuthContext.tsx` - Context para manejar sesión del usuario
- ✅ `.env.local` - Variables de entorno configuradas

### 2. **Páginas conectadas**
- ✅ `app/login/page.tsx` - Conectada con backend
- ✅ `app/register/page.tsx` - Conectada con backend
- ✅ `app/layout.tsx` - AuthProvider envuelve toda la app

---

## 📂 Estructura de Carpetas

```
├── lib/
│   ├── api.ts                    ← Funciones para conectar con el backend
│   ├── EJEMPLOS_API.ts           ← Ejemplos de cómo usar las funciones
│   └── EJEMPLOS_PRACTICOS.md     ← Ejemplos prácticos de páginas conectadas
├── hooks/
│   ├── use-api.ts                ← Hook reutilizable para API calls
│   └── use-toast.ts              ← Hook para mostrar notificaciones
├── context/
│   ├── AuthContext.tsx           ← Context para manejar sesión
│   └── OnboardingContext.tsx      ← Context para onboarding
├── app/
│   ├── layout.tsx                ← Envuelve todo con AuthProvider
│   ├── login/page.tsx            ← ✅ Conectada
│   ├── register/page.tsx         ← ✅ Conectada
│   └── api/                      ← Routes del backend
└── .env.local                    ← Variables de entorno
```

---

## 🔌 Cómo Usar - Guía Rápida

### Opción 1: Funciones simples (Recomendado para empezar)

```tsx
"use client"

import { useState } from "react"
import { loginUser } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    const response = await loginUser(email, "password123")
    
    if (!response.success) {
      setError(response.message)
    } else {
      console.log("Login exitoso:", response.data)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </div>
  )
}
```

### Opción 2: Con useAuth para acceder a datos del usuario

```tsx
"use client"

import { useAuth } from "@/context/AuthContext"

export default function HomePage() {
  const { user, isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <div>Debes iniciar sesión</div>
  }

  return (
    <div>
      <h1>Bienvenido, {user?.email}</h1>
    </div>
  )
}
```

### Opción 3: Con el hook useApi para mayor flexibilidad

```tsx
"use client"

import { useApi } from "@/hooks/use-api"

export default function FetchUserPage() {
  const { data, isLoading, error, execute } = useApi()

  const handleFetch = async () => {
    await execute("/api/usuario/123", "GET")
  }

  return (
    <div>
      <button onClick={handleFetch} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Cargar usuario"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```

---

## 🔑 Funciones Disponibles

### Login y Registro
```tsx
import { loginUser, registerUser } from "@/lib/api"

// Login
const response = await loginUser("user@example.com", "password123")

// Registro
const response = await registerUser("user@example.com", "password123")
```

### Datos de Usuario
```tsx
import { getUser } from "@/lib/api"

// Obtener datos del usuario
const response = await getUser("user-123")
```

### Progreso
```tsx
import { updateProgress, getProgress } from "@/lib/api"

// Actualizar progreso
const response = await updateProgress("user-123", {
  island: "family",
  level: 1,
  score: 100
})

// Obtener progreso
const response = await getProgress("user-123")
```

### Onboarding
```tsx
import { saveOnboarding } from "@/lib/api"

// Guardar datos de onboarding
const response = await saveOnboarding("user-123", {
  edad: 25,
  genero: "masculino",
  experiencia: "principiante"
})
```

### API Genérica
```tsx
import { apiCall } from "@/lib/api"

// Para cualquier endpoint personalizado
const response = await apiCall("/api/mi-endpoint", {
  method: "POST",
  body: { datos: "aquí" }
})
```

---

## 🎯 Próximas Páginas a Conectar

### 1. Página Home
Mostrar bienvenida y opciones disponibles

### 2. Onboarding (paso a paso)
- `app/onboarding/age/page.tsx` - Guardar edad
- `app/onboarding/gender/page.tsx` - Guardar género
- `app/onboarding/emotional-intensity/page.tsx` - Guardar intensidad emocional
- ... (resto de pasos)

Usa: `saveOnboarding(userId, data)`

### 3. Islas
- `app/islands/family/level-1/page.tsx`
- `app/islands/family/level-2/page.tsx`
- ... (resto de niveles e islas)

Usa: `updateProgress(userId, { island, level, score })`

### 4. Perfil
Mostrar y actualizar datos del usuario

Usa: `getUser(userId)` y `updateProgress()`

### 5. Configuración
Permitir cambios en datos del usuario

Usa: `updateProgress()` o función similar

---

## 🔐 Seguridad Importante

### Variables de Entorno
En `.env.local` tienes:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

⚠️ **SOLO usa `NEXT_PUBLIC_`** para variables que deben estar disponibles en el cliente.
Para datos sensibles, usa variables sin `NEXT_PUBLIC_` en el servidor.

### Almacenamiento de Usuario
El usuario se guarda automáticamente en:
- localStorage (persiste entre sesiones)
- Context (accesible en toda la app)

---

## 🛠️ Debugging

### 1. Abre DevTools (F12)
### 2. Ve a la pestaña "Network"
### 3. Mira las llamadas a `/api/...`
### 4. Verifica:
- ✅ Status 200 = Éxito
- ❌ Status 4xx/5xx = Error
- Check Request body (datos enviados)
- Check Response (respuesta del servidor)

### 5. También puedes ver logs en Console
```tsx
console.log("Respuesta del servidor:", response)
```

---

## 📝 Checklist para cada página nueva

- [ ] Página es un componente cliente (`"use client"`)
- [ ] Importé `useAuth` o la función de API necesaria
- [ ] Tengo estados para `isLoading` y `error`
- [ ] Tengo un manejador que llama a la API
- [ ] Muestro loading mientras se envía
- [ ] Muestro errores si algo falla
- [ ] Actualizo el UI con los datos recibidos
- [ ] Probé en DevTools → Network tab

---

## 🚀 Próximos Pasos

1. **Conecta la página de Home** - Mostrar bienvenida
2. **Conecta Onboarding** - Guardar datos paso a paso
3. **Conecta una Isla** - Guardar progreso de niveles
4. **Implementa protección de rutas** - Usa middleware.ts
5. **Agrega validación** - Valida datos antes de enviar

---

## 📞 Resumen de Toda la Integración

```
Usuario → Frontend (React) → API (Next.js) → Backend (Database)
```

### Tu flujo:
1. Usuario llena formulario en la página (React)
2. Haces clic en botón
3. Se llama a una función de API (`loginUser`, `updateProgress`, etc.)
4. La función hace un `fetch` a `/api/...` 
5. Que conecta con tu backend
6. Backend responde con datos o error
7. Tu frontend muestra el resultado

---

¡Ya está todo listo para conectar! 🎉

Si necesitas ayuda con una página específica, revisa:
- `lib/EJEMPLOS_API.ts` - Ejemplos básicos
- `lib/EJEMPLOS_PRACTICOS.md` - Ejemplos completos de páginas
- `FRONTEND_BACKEND_CONEXION.md` - Documentación completa

¡Adelante! 🚀
