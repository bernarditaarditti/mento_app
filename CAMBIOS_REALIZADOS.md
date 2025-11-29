# 📋 Archivos Modificados - Conexión Frontend-Backend

## Nuevos archivos creados

### 1. **`lib/api.ts`** ⭐ IMPORTANTE
- Contiene todas las funciones para conectar con el backend
- Funciones principales:
  - `loginUser(email, password)`
  - `registerUser(email, password)`
  - `getUser(userId)`
  - `updateProgress(userId, data)`
  - `getProgress(userId)`
  - `saveOnboarding(userId, data)`
  - `apiCall(endpoint, options)` - función genérica

### 2. **`hooks/use-api.ts`**
- Hook personalizado para hacer llamadas a la API
- Maneja estados de loading, error y datos
- Ejemplo de uso:
  ```tsx
  const { data, isLoading, error, execute } = useApi()
  await execute("/api/user", "GET")
  ```

### 3. **`context/AuthContext.tsx`**
- Maneja la sesión del usuario en toda la aplicación
- Proporciona:
  - `user` - datos del usuario logueado
  - `isLoggedIn` - si el usuario está logueado
  - `isLoading` - si está cargando
  - `login()` - para guardar usuario
  - `logout()` - para cerrar sesión
  - `updateUser()` - para actualizar datos del usuario

### 4. **`.env.local`** (actualizado)
- Agregué: `NEXT_PUBLIC_API_URL=http://localhost:3000`
- Variable necesaria para que el frontend sepa dónde conectarse

### 5. **`.env.example`**
- Plantilla de variables de entorno para referencia

### 6. **Documentación creada:**
- `FRONTEND_BACKEND_CONEXION.md` - Guía completa de conexión
- `RESUMEN_CONEXION.md` - Resumen rápido y checklist
- `lib/EJEMPLOS_API.ts` - Ejemplos de cómo usar cada función
- `lib/EJEMPLOS_PRACTICOS.md` - Ejemplos de páginas conectadas

---

## Archivos modificados

### 1. **`app/layout.tsx`**
✅ Cambios:
- Importé `AuthProvider` de `context/AuthContext`
- Envolví `{children}` con `<AuthProvider>`
- Ahora toda la app tiene acceso a `useAuth()`

### 2. **`app/login/page.tsx`**
✅ Cambios:
- Importé `loginUser` de `lib/api`
- Importé `useAuth` del context
- Cambié `fetch()` manual por la función `loginUser()`
- Ahora guarda el usuario en el context con `login()`

### 3. **`app/register/page.tsx`**
✅ Cambios:
- Importé `registerUser` de `lib/api`
- Implementé la lógica que faltaba (estaba en TODO)
- Ahora hace la llamada al backend cuando se registra
- Muestra errores al usuario

### 4. **`app/home/page.tsx`**
✅ Cambios:
- Importé `useAuth` del context
- Agregué protección: redirige a login si no está logueado
- Muestra el email del usuario en el header
- Muestra spinner mientras carga

---

## 🎯 Cómo Usar Todo

### Paso 1: Verificar que `.env.local` existe
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Paso 2: En cualquier página "use client", importa y usa:

```tsx
"use client"

import { useAuth } from "@/context/AuthContext"
import { loginUser } from "@/lib/api"

// Acceder a datos del usuario:
const { user, isLoggedIn } = useAuth()

// Llamar al backend:
const response = await loginUser(email, password)
```

### Paso 3: Maneja la respuesta

```tsx
if (response.success) {
  console.log("Éxito:", response.data)
} else {
  console.error("Error:", response.message)
}
```

---

## 📊 Flujo de Conexión

```
Usuario en Página React
        ↓
    (hace clic)
        ↓
  Llamada a función API
  (loginUser, saveOnboarding, etc.)
        ↓
  Función hace fetch a /api/...
        ↓
  Backend procesa y devuelve respuesta
        ↓
Página muestra resultado (éxito o error)
```

---

## 🔄 Login - Flujo Específico

1. Usuario ingresa email y contraseña
2. Hace clic en "Iniciar sesión"
3. Se llama `loginUser(email, password)`
4. Que hace `fetch("/api/usuario/login", { ...})`
5. Backend verifica credenciales
6. Devuelve datos del usuario o error
7. Si es exitoso:
   - Se guarda en `AuthContext` con `login(user)`
   - Se redirige a `/home`
8. Si es error:
   - Se muestra el mensaje de error

---

## ✨ Diferencias Antes vs Después

### ANTES:
```tsx
// Manual, sin reutilización
const response = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
})
const data = await response.json()
```

### DESPUÉS:
```tsx
// Reutilizable, limpio
import { loginUser } from "@/lib/api"
const response = await loginUser(email, password)
```

---

## 🚀 Próximos Pasos

1. Prueba que el login funciona (prueba con un usuario de tu BD)
2. Conecta la página de `register` completamente
3. Conecta `onboarding` paso a paso
4. Conecta las islas para guardar progreso
5. Conecta la página de perfil

---

## 📞 Resumen en Una Línea

**Todo el frontend está ahora conectado al backend a través de funciones reutilizables en `lib/api.ts` y un context global en `context/AuthContext.tsx` que maneja la sesión del usuario.**

---

## ✅ Testing Quick

Abre DevTools (F12) → Network tab y:

1. Intenta hacer login
2. Busca la llamada a `/api/usuario/login`
3. Verifica:
   - Status: 200 (éxito) o error
   - Request body: email y contraseña
   - Response: datos del usuario o mensaje de error

¡Listo! 🎉
