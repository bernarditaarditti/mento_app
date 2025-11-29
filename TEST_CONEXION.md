# 🧪 TEST RÁPIDO - Verificar Conexión Frontend-Backend

## ✅ Checklist Inicial

Antes de hacer el test:

- [ ] Backend está corriendo en `http://localhost:3000` (o el puerto configurado)
- [ ] Database está conectada y funcionando
- [ ] Frontend está corriendo con `npm run dev` (o `pnpm dev`)
- [ ] Has creado un usuario en la database

---

## Test 1: Login

### Paso a paso:

1. **Abre la página de login:** `http://localhost:3000/login`

2. **Abre DevTools (F12)** y ve a **Network tab**

3. **Ingresa credenciales válidas:**
   - Email: un email que exista en tu database
   - Contraseña: la contraseña correcta

4. **Haz clic en el botón de continuar**

5. **Verifica en DevTools:**
   - ✅ Debe aparecer una llamada a `/api/usuario/login`
   - ✅ Status debe ser **200 OK**
   - ✅ Response debe contener datos del usuario

6. **Verifica en la página:**
   - ✅ Si es exitoso, debería redirigirse a `/home`
   - ✅ Si falla, debe mostrar un mensaje de error

### Respuesta esperada:
```json
{
  "success": true,
  "user": {
    "id_usuario": "123",
    "email": "user@example.com",
    "fecha_creacion": "2024-01-01T00:00:00Z"
  }
}
```

### Errores comunes:
| Error | Causa | Solución |
|-------|-------|----------|
| Status 404 | Backend no tiene la ruta | Verifica `/api/usuario/login` en backend |
| Status 500 | Error en backend | Verifica logs del backend |
| CORS error | Backend no permite peticiones | Configura CORS en backend |
| Network error | Backend no está corriendo | Inicia backend en localhost:3000 |

---

## Test 2: Verificar AuthContext

### Código de prueba:

```tsx
// Copia esto en app/test-auth/page.tsx

"use client"

import { useAuth } from "@/context/AuthContext"

export default function TestAuthPage() {
  const { user, isLoggedIn, isLoading } = useAuth()

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Test AuthContext</h1>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>isLoading:</strong> {isLoading ? "true ⏳" : "false ✅"}
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>isLoggedIn:</strong> {isLoggedIn ? "true ✅" : "false ❌"}
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>User:</strong>
        <pre style={{ background: "#f0f0f0", padding: "10px" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <p>
        {isLoggedIn ? (
          <span style={{ color: "green" }}>✅ User está logueado</span>
        ) : (
          <span style={{ color: "red" }}>❌ No hay usuario logueado</span>
        )}
      </p>
    </div>
  )
}
```

### Cómo usarlo:
1. Copia el código arriba
2. Crea la carpeta: `app/test-auth/`
3. Crea archivo: `app/test-auth/page.tsx`
4. Pega el código
5. Abre: `http://localhost:3000/test-auth`

### Qué debería ver:
- Si **isLoggedIn = true** ✅: Ya hiciste login
- Si **isLoggedIn = false** ❌: No estás logueado, haz login primero
- **User** debe mostrar todos los datos del usuario

---

## Test 3: Verificar API Call

### Código de prueba:

```tsx
// Copia esto en app/test-api/page.tsx

"use client"

import { useState } from "react"
import { apiCall } from "@/lib/api"

export default function TestApiPage() {
  const [endpoint, setEndpoint] = useState("/api/test")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    const result = await apiCall(endpoint, { method: "GET" })
    setResponse(JSON.stringify(result, null, 2))
    setIsLoading(false)
  }

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Test API Call</h1>
      
      <input
        type="text"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        placeholder="/api/endpoint"
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      
      <button
        onClick={handleTest}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          background: "#00C49A",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Cargando..." : "Hacer test"}
      </button>

      {response && (
        <pre
          style={{
            background: "#f0f0f0",
            padding: "10px",
            marginTop: "10px",
            overflow: "auto",
          }}
        >
          {response}
        </pre>
      )}
    </div>
  )
}
```

### Cómo usarlo:
1. Copia el código arriba
2. Crea: `app/test-api/page.tsx`
3. Abre: `http://localhost:3000/test-api`
4. Ingresa un endpoint (ej: `/api/test`)
5. Haz clic en "Hacer test"

---

## Test 4: Verificar Network en DevTools

### Pasos:
1. Abre DevTools (F12)
2. Ve a **Network tab**
3. En la página, realiza una acción (login, guardar datos, etc.)
4. Busca la llamada a `/api/...`
5. Verifica:

| Elemento | Esperado | Cómo verificar |
|----------|----------|---|
| **Method** | POST, GET, etc. | Ver en la columna Method |
| **Status** | 200, 201 | Debe ser 2xx para éxito |
| **URL** | `/api/...` | Ver en la columna Name |
| **Request Headers** | Content-Type: application/json | Click en la llamada → Headers |
| **Request Body** | Datos enviados | Click en la llamada → Request |
| **Response** | JSON con success/data | Click en la llamada → Response |

---

## Test 5: Verificar Console Logs

### Código para debug:

```tsx
const handleTest = async () => {
  console.log("🚀 Iniciando llamada...")
  const response = await loginUser(email, password)
  console.log("📦 Respuesta completa:", response)
  console.log("✅ Success:", response.success)
  console.log("📄 Data:", response.data)
  console.log("⚠️ Message:", response.message)
}
```

### Cómo ver:
1. Abre DevTools (F12)
2. Ve a **Console tab**
3. Realiza la acción
4. Verifica los logs

---

## ✅ Todos los Tests Pasados?

Si todos los tests pasaron:

✅ **Frontend está conectado con backend**
✅ **Login/Registro funciona**
✅ **Context funciona**
✅ **API calls funcionan**

¡Puedes continuar conectando las demás páginas!

---

## ❌ Algún test falló?

### Si ves error CORS:
```
Access to XMLHttpRequest has been blocked by CORS policy
```
→ Configura CORS en tu backend

### Si ves error de conexión:
```
Failed to fetch from http://localhost:3000
```
→ Verifica que backend está corriendo en ese puerto

### Si status es 404:
```
GET /api/test 404 Not Found
```
→ Verifica que la ruta existe en tu backend

### Si status es 500:
```
GET /api/test 500 Internal Server Error
```
→ Verifica los logs del backend

---

## Checklist Final

- [ ] Test 1: Login funciona
- [ ] Test 2: AuthContext muestra usuario
- [ ] Test 3: API call devuelve respuesta
- [ ] Test 4: DevTools Network muestra llamadas correctas
- [ ] Test 5: Console logs muestran datos

Si todos están ✅, ¡estás listo para conectar más páginas! 🚀

---

## Comando para debug rápido

En Console (DevTools):
```javascript
// Ver el usuario actual
localStorage.getItem('user')

// Hacer una llamada manual
fetch('http://localhost:3000/api/test')
  .then(r => r.json())
  .then(d => console.log(d))

// Ver si hay errores de red
console.log(navigator.onLine) // true si hay conexión
```

---

¡Listo! Ya sabes cómo verificar que todo funciona. 🧪✅
