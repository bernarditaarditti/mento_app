# Guía de Conexión Frontend-Backend

## ✅ Lo que ya está configurado

### Servicios de API (en `lib/api.ts`)
- `loginUser()` - Login de usuario
- `registerUser()` - Registro de usuario
- `getUser()` - Obtener datos del usuario
- `updateProgress()` - Actualizar progreso
- `getProgress()` - Obtener progreso
- `saveOnboarding()` - Guardar datos de onboarding
- `apiCall()` - Función genérica para cualquier llamada

### Páginas ya conectadas
- ✅ `/app/login/page.tsx` - Conectada con `loginUser()`
- ✅ `/app/register/page.tsx` - Conectada con `registerUser()`

---

## 🔧 Cómo usar las funciones de API

### 1. **Import la función en tu página**
```tsx
import { loginUser, registerUser, getUser } from "@/lib/api"
```

### 2. **Usa la función en tu componente**
```tsx
"use client"

import { useState } from "react"
import { getUser } from "@/lib/api"

export default function MyPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUser = async () => {
    setIsLoading(true)
    const response = await getUser("user-123")
    
    if (response.success) {
      setUser(response.data)
    } else {
      console.error(response.message)
    }
    setIsLoading(false)
  }

  return (
    <button onClick={fetchUser} disabled={isLoading}>
      {isLoading ? "Cargando..." : "Cargar usuario"}
    </button>
  )
}
```

---

## 📋 Pasos para conectar una nueva página

### Paso 1: Asegúrate que sea un componente cliente
```tsx
"use client"
```

### Paso 2: Importa la función de API que necesitas
```tsx
import { updateProgress } from "@/lib/api"
```

### Paso 3: Crea un manejador que llame a la API
```tsx
const handleSave = async (data) => {
  setIsLoading(true)
  
  const response = await updateProgress("user-id", data)
  
  if (response.success) {
    // ✅ Éxito
    console.log("Guardado:", response.data)
  } else {
    // ❌ Error
    setError(response.message)
  }
  
  setIsLoading(false)
}
```

### Paso 4: Llama el manejador desde un botón o evento
```tsx
<button onClick={() => handleSave(myData)}>
  Guardar
</button>
```

---

## ⚙️ Configuración necesaria

### 1. **Crear archivo `.env.local`**
En la raíz del proyecto, crea un archivo `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Si tu backend está en otro puerto:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. **Verificar que el backend está corriendo**
Antes de ejecutar el frontend, asegúrate de que tu backend esté corriendo en el puerto configurado.

---

## 📦 Estructura de respuestas

Todas las funciones devuelven un objeto `ApiResponse`:

```typescript
{
  success: boolean      // true si fue exitoso, false si hubo error
  data?: any           // Los datos devueltos por el backend (si es exitoso)
  message?: string     // Mensaje de error o info
}
```

### Ejemplo de uso:
```tsx
const response = await loginUser("user@example.com", "password123")

if (response.success) {
  // response.data contiene los datos del usuario
  console.log("Usuario:", response.data)
} else {
  // response.message contiene el error
  console.error("Error:", response.message)
}
```

---

## 🛠️ Agregar nuevas funciones de API

Si necesitas conectar con nuevos endpoints, agrega la función en `lib/api.ts`:

```typescript
export async function miNuevaFuncion(parametro: string) {
  return apiCall("/api/mi-nuevo-endpoint", {
    method: "POST",
    body: { parametro },
  })
}
```

Luego úsala en tu página:
```tsx
import { miNuevaFuncion } from "@/lib/api"

// ...
const response = await miNuevaFuncion("valor")
```

---

## 🧹 Manejo de errores

### Patrones comunes:

```tsx
// Opción 1: Mostrar error en un estado
const handleSubmit = async () => {
  const response = await loginUser(email, password)
  
  if (!response.success) {
    setError(response.message)
    return
  }
  
  // Éxito
}

// Opción 2: Mostrar toast/notificación
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()

const handleSubmit = async () => {
  const response = await loginUser(email, password)
  
  if (!response.success) {
    toast({
      title: "Error",
      description: response.message,
      variant: "destructive",
    })
    return
  }
}

// Opción 3: Try-catch (si prefieres manejar excepciones)
try {
  const response = await loginUser(email, password)
  if (!response.success) throw new Error(response.message)
  
  // Éxito
} catch (error) {
  console.error(error)
}
```

---

## 🔐 Variables de entorno importantes

```
# Backend API URL (requiere NEXT_PUBLIC_ para usarla en el cliente)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Si tienes otros datos sensibles, NO uses NEXT_PUBLIC_
# Usa variables de servidor en .env (sin NEXT_PUBLIC_)
DATABASE_URL=...
SECRET_KEY=...
```

---

## 📝 Checklist para conectar una página

- [ ] Página es un componente cliente (`"use client"`)
- [ ] Importé la función de API necesaria
- [ ] Cree un estado para loading y error
- [ ] Cree un manejador que llame a la función de API
- [ ] Manejo la respuesta (éxito y error)
- [ ] Tengo `.env.local` con `NEXT_PUBLIC_API_URL`
- [ ] El backend está corriendo en el puerto correcto
- [ ] Probé en el navegador (abre DevTools → Network para ver las llamadas)

---

## 🐛 Debugging

### Abre DevTools para ver las llamadas:
1. Presiona `F12` o `Ctrl+Shift+I`
2. Ve a la pestaña "Network"
3. Recarga la página o realiza una acción
4. Busca las llamadas a `/api/...`
5. Verifica:
   - Status (200 = éxito, 4xx/5xx = error)
   - Request body (datos que envías)
   - Response (respuesta del servidor)

### Logs en consola:
```tsx
console.log("Enviando:", { email, password })
console.log("Respuesta:", response)
console.error("Error:", error)
```

---

## 📚 Ejemplos completos

Ver archivo: `lib/EJEMPLOS_API.ts` para más ejemplos de uso.

---

## ✨ Próximos pasos

1. **Conecta la página de onboarding** - Usa `saveOnboarding()`
2. **Conecta las páginas de islas** - Usa `updateProgress()` y `getProgress()`
3. **Conecta la página de perfil** - Usa `getUser()` y actualiza datos
4. **Manejo de sesión** - Guarda el userId en localStorage o context
5. **Autenticación** - Implementa protección de rutas (middleware)

¡Listo! Ya puedes conectar tu frontend con el backend. 🚀
