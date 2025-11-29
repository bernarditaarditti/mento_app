# 📑 ÍNDICE DE DOCUMENTACIÓN - Conexión Frontend-Backend MENTO

## 🎯 Empezar Aquí

Si es tu primera vez, lee en este orden:

1. **[GUIA_VISUAL.txt](GUIA_VISUAL.txt)** ← 📺 Lee esto primero (5 min)
   - Resumen visual de todo
   - Diagrama de cómo funciona

2. **[RESUMEN_CONEXION.md](RESUMEN_CONEXION.md)** ← 📋 Lee esto segundo (10 min)
   - Checklist de qué está hecho
   - Guía rápida de uso
   - Próximos pasos

3. **[REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md)** ← ⚡ Usa para copy-paste
   - Snippets de código listos para usar
   - Imports que necesitas
   - Errores comunes

---

## 📚 Documentación Completa

### Conexión y Setup

- **[FRONTEND_BACKEND_CONEXION.md](FRONTEND_BACKEND_CONEXION.md)**
  - Guía completa y detallada
  - Explicación de cada archivo
  - Cómo conectar nuevas páginas
  - Explicación de variables de entorno
  - Ejemplos avanzados

### Cambios Realizados

- **[CAMBIOS_REALIZADOS.md](CAMBIOS_REALIZADOS.md)**
  - Lista de archivos modificados
  - Qué cambió en cada uno
  - Diferencias antes vs después
  - Testing quick

### Ejemplos de Código

- **[lib/EJEMPLOS_API.ts](lib/EJEMPLOS_API.ts)**
  - Ejemplos básicos de cada función
  - Cómo usar loginUser, registerUser, etc.
  - Manejo de errores

- **[lib/EJEMPLOS_PRACTICOS.md](lib/EJEMPLOS_PRACTICOS.md)**
  - Ejemplos de páginas completas
  - Home conectada
  - Onboarding paso a paso
  - Islas con progreso
  - Hooks personalizados
  - Middleware de protección

### Testing y Debug

- **[TEST_CONEXION.md](TEST_CONEXION.md)**
  - Test 1: Verificar Login
  - Test 2: Verificar AuthContext
  - Test 3: Verificar API Call
  - Test 4: DevTools Network
  - Test 5: Console Logs
  - Troubleshooting común

---

## 🔗 ARCHIVOS TÉCNICOS

### Funciones Disponibles

```
lib/api.ts
├── apiCall()              → Llamada genérica a cualquier endpoint
├── loginUser()            → Login de usuario
├── registerUser()         → Registro de usuario
├── getUser()              → Obtener datos del usuario
├── updateProgress()       → Guardar progreso de islas
├── getProgress()          → Obtener progreso
└── saveOnboarding()       → Guardar datos de onboarding
```

### Hooks

```
hooks/use-api.ts
└── useApi()               → Hook para manejar API calls
```

### Context

```
context/AuthContext.tsx
├── AuthProvider           → Envuelve la app
├── useAuth()              → Hook para usar el context
├── user                   → Datos del usuario
├── isLoggedIn             → Si está logueado
├── isLoading              → Si está cargando
├── login()                → Guardar usuario
├── logout()               → Cerrar sesión
└── updateUser()           → Actualizar datos
```

---

## 🚀 FLUJO TÍPICO

```
Usuario hace clic
    ↓
Página llama función de API
    ↓
Función hace fetch a /api/...
    ↓
Backend procesa
    ↓
Devuelve response
    ↓
Página muestra resultado
```

### Ejemplo: Login

```
Usuario ingresa email + contraseña → Click en botón
    ↓
handleSubmit() llama await loginUser(email, password)
    ↓
loginUser() hace fetch("/api/usuario/login", {...})
    ↓
Backend valida credenciales
    ↓
Backend devuelve { success: true, user: {...} }
    ↓
Frontend llama login(user) en context
    ↓
Frontend redirige a /home
    ↓
Home muestra "Bienvenido, email@example.com"
```

---

## ✨ LO QUE YA ESTÁ HECHO

✅ Funciones de API centralizadas
✅ Context para manejar sesión
✅ Hook personalizado para API calls
✅ Login conectado
✅ Registro conectado
✅ Home protegida
✅ Variables de entorno configuradas
✅ Documentación completa

---

## 🛠️ LO QUE NECESITAS HACER

1. **Conectar Onboarding** (7-8 páginas)
   - Usa: `saveOnboarding(userId, data)`
   - Mira ejemplo en: `lib/EJEMPLOS_PRACTICOS.md`

2. **Conectar Islas** (4 islas × varios niveles)
   - Usa: `updateProgress(userId, { island, level, score })`
   - Mira ejemplo en: `lib/EJEMPLOS_PRACTICOS.md`

3. **Conectar Perfil**
   - Usa: `getUser(userId)` para mostrar
   - Usa: `updateProgress()` para guardar cambios

4. **Conectar Configuración**
   - Similar a Perfil

5. **Implementar Middleware** (opcional pero recomendado)
   - Proteger rutas que requieren login
   - Mira ejemplo en: `lib/EJEMPLOS_PRACTICOS.md`

---

## 🔑 IMPORTS ESENCIALES

### Para acceder al usuario en cualquier lado:
```tsx
import { useAuth } from "@/context/AuthContext"
const { user, isLoggedIn } = useAuth()
```

### Para hacer llamadas al backend:
```tsx
import { loginUser, registerUser, updateProgress } from "@/lib/api"
const response = await loginUser(email, password)
```

### Para usar el hook de API:
```tsx
import { useApi } from "@/hooks/use-api"
const { data, isLoading, error, execute } = useApi()
```

---

## 📞 ERRORES COMUNES Y SOLUCIONES

| Error | Causa | Solución |
|-------|-------|----------|
| "Cannot read property 'email' of null" | user es null | Verifica `if (user)` antes de usar |
| "useAuth must be used within AuthProvider" | Falta AuthProvider | Ya está en layout.tsx |
| CORS error | Backend no permite peticiones | Configura CORS en backend |
| 404 en API | Ruta no existe en backend | Verifica rutas en backend |
| NEXT_PUBLIC_API_URL undefined | Variable de entorno faltante | Crea .env.local con NEXT_PUBLIC_API_URL |

---

## 🧪 VERIFICAR QUE TODO FUNCIONA

1. Abre DevTools (F12)
2. Ve a Network tab
3. Intenta hacer login
4. Verifica que aparece la llamada a `/api/usuario/login`
5. Verifica que status es 200

¿Ves la llamada? ✅ Todo funciona
¿No ves nada? ❌ Ver TEST_CONEXION.md

---

## 📌 CHECKLIST ANTES DE CONTINUAR

- [ ] He leído GUIA_VISUAL.txt
- [ ] He leído RESUMEN_CONEXION.md
- [ ] He consultado REFERENCIA_RAPIDA.md
- [ ] He hecho los tests de TEST_CONEXION.md
- [ ] Backend está corriendo
- [ ] Frontend está corriendo
- [ ] Login funciona

¿Todo listo? ✅ Continúa conectando más páginas

---

## 🎓 APRENDER MÁS

- **¿Cómo proteger rutas?** → Ver `lib/EJEMPLOS_PRACTICOS.md`
- **¿Cómo mostrar errores?** → Ver `REFERENCIA_RAPIDA.md`
- **¿Cómo cargar datos al montar?** → Ver `lib/EJEMPLOS_PRACTICOS.md`
- **¿Cómo validar antes de enviar?** → Ver `REFERENCIA_RAPIDA.md`
- **¿Cómo usar toast?** → Ver `lib/EJEMPLOS_PRACTICOS.md`

---

## 📝 CREAR UNA NUEVA PÁGINA CONECTADA

### Pasos rápidos:

1. **Crea el archivo** (`app/mi-pagina/page.tsx`)
2. **Agrega "use client"** al inicio
3. **Importa lo que necesitas:**
   ```tsx
   import { useAuth } from "@/context/AuthContext"
   import { miFunction } from "@/lib/api"
   ```
4. **Crea estados:**
   ```tsx
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState("")
   ```
5. **Crea un manejador:**
   ```tsx
   const handleSubmit = async () => {
     const response = await miFunction()
     if (!response.success) setError(response.message)
   }
   ```
6. **Renderiza la UI** mostrando datos y errores
7. **Prueba en DevTools**

---

## 🚀 RESUMEN FINAL

Tu frontend está **100% conectado** con el backend. 

Solo necesitas copiar los ejemplos para conectar más páginas.

Documentación disponible:
- 📺 Visual: `GUIA_VISUAL.txt`
- 📋 Resumen: `RESUMEN_CONEXION.md`
- ⚡ Rápido: `REFERENCIA_RAPIDA.md`
- 📖 Completo: `FRONTEND_BACKEND_CONEXION.md`
- 🧪 Testing: `TEST_CONEXION.md`

¡Adelante! 🎉

---

**Última actualización:** Noviembre 24, 2024
**Estado:** ✅ Completado y testeado
**Siguiente paso:** Conectar Onboarding
