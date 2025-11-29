/**
 * Hook personalizado para usar API calls
 * Facilita el manejo de loading, errores y datos
 */

import { useState, useCallback } from "react"
import { apiCall, ApiResponse } from "@/lib/api"

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const execute = useCallback(
    async (
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
      body?: any
    ): Promise<ApiResponse<T>> => {
      setIsLoading(true)
      setError("")

      try {
        const response = await apiCall<T>(endpoint, { method, body })

        if (response.success) {
          setData(response.data as T)
          options.onSuccess?.(response.data)
        } else {
          const errorMsg = response.message || "Error desconocido"
          setError(errorMsg)
          options.onError?.(errorMsg)
        }

        return response
      } catch (err: any) {
        const errorMsg = err.message || "Error de conexión"
        setError(errorMsg)
        options.onError?.(errorMsg)
        return {
          success: false,
          message: errorMsg,
        }
      } finally {
        setIsLoading(false)
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setData(null)
    setError("")
    setIsLoading(false)
  }, [])

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  }
}

/**
 * Ejemplo de uso:
 * 
 * const { data, isLoading, error, execute } = useApi()
 * 
 * const handleFetch = async () => {
 *   await execute("/api/user/123", "GET")
 * }
 */
