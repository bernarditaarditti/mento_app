/**
 * API Service - Funciones reutilizables para conectar con el backend
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

/**
 * Función genérica para hacer llamadas al backend
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    body?: any
  } = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body } = options

  try {
    const url = `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || data.error || "Error en la solicitud",
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error de conexión con el servidor",
    }
  }
}

/**
 * Login de usuario
 */
export async function loginUser(email: string, password: string) {
  return apiCall("/api/usuario/login", {
    method: "POST",
    body: { email, contrasena: password },
  })
}

/**
 * Registro de usuario
 */
export async function registerUser(email: string, password: string) {
  return apiCall("/api/usuario/register", {
    method: "POST",
    body: { email, contrasena: password },
  })
}

/**
 * Obtener datos del usuario
 */
export async function getUser(userId: string) {
  return apiCall(`/api/usuario/${userId}`, {
    method: "GET",
  })
}

/**
 * Actualizar progreso del usuario
 */
export async function updateProgress(userId: string, progressData: any) {
  return apiCall("/api/progreso/update", {
    method: "POST",
    body: { id_usuario: userId, ...progressData },
  })
}

/**
 * Obtener progreso del usuario
 */
export async function getProgress(userId: string) {
  return apiCall(`/api/progreso/${userId}`, {
    method: "GET",
  })
}

/**
 * Guardar datos de onboarding
 */
export async function saveOnboarding(userId: string, onboardingData: any) {
  return apiCall("/api/onboarding/save", {
    method: "POST",
    body: { userId, ...onboardingData },
  })
}

/**
 * Marcar un nivel como completado
 */
export async function completarNivel(id_usuario: number, id_isla: number, numero_nivel: number) {
  return apiCall("/api/progreso/completar", {
    method: "POST",
    body: { id_usuario, id_isla, numero_nivel },
  })
}

/**
 * Obtener progreso de niveles por usuario e isla
 */
export async function obtenerProgresoNiveles(id_usuario: number, id_isla: number) {
  return apiCall("/api/progreso/obtener", {
    method: "POST",
    body: { id_usuario, id_isla },
  })
}
