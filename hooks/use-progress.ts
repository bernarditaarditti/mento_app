"use client"

import { useCallback } from "react"
import { useAuth } from "@/context/AuthContext"
import { updateProgress, completarNivel } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function useProgress() {
  const { user } = useAuth()
  const { toast } = useToast()

  const saveProgress = useCallback(
    async (idIsla: number, nivelActual: number) => {
      if (!user) {
        toast({ title: "Error", description: "Usuario no autenticado" })
        return { success: false, message: "Usuario no autenticado" }
      }

      try {
        const res = await updateProgress(user.id_usuario, {
          id_isla: idIsla,
          nivel_actual: nivelActual,
        })

        if (!res.success) {
          toast({ title: "Error", description: res.message || "No se pudo guardar el progreso" })
        }

        return res
      } catch (error: any) {
        toast({ title: "Error", description: error?.message || "Error al guardar progreso" })
        return { success: false, message: error?.message }
      }
    },
    [user, toast]
  )

  const completarNivelActual = useCallback(
    async (idIsla: number, numeroNivel: number) => {
      if (!user) {
        console.error("❌ Usuario no autenticado en completarNivelActual")
        toast({ title: "Error", description: "Usuario no autenticado" })
        return { success: false, message: "Usuario no autenticado" }
      }

      if (!user.id_usuario) {
        console.error("❌ user.id_usuario no está disponible:", user)
        toast({ title: "Error", description: "ID de usuario no disponible" })
        return { success: false, message: "ID de usuario no disponible" }
      }

      try {
        const idUsuario = typeof user.id_usuario === 'number' 
          ? user.id_usuario 
          : parseInt(String(user.id_usuario), 10)
        
        if (isNaN(idUsuario)) {
          console.error(`❌ idUsuario es NaN. user.id_usuario=${user.id_usuario} (tipo: ${typeof user.id_usuario})`)
          toast({ title: "Error", description: "ID de usuario inválido" })
          return { success: false, message: "ID de usuario inválido" }
        }

        if (!idIsla || isNaN(idIsla) || !numeroNivel || isNaN(numeroNivel)) {
          console.error(`❌ Parámetros inválidos: idIsla=${idIsla}, numeroNivel=${numeroNivel}`)
          toast({ title: "Error", description: "Parámetros inválidos" })
          return { success: false, message: "Parámetros inválidos" }
        }

        console.log(`📤 Llamando completarNivel: idUsuario=${idUsuario} (tipo: ${typeof idUsuario}), idIsla=${idIsla}, numeroNivel=${numeroNivel}`)
        
        const res = await completarNivel(idUsuario, idIsla, numeroNivel)
        console.log(`📥 Respuesta de completarNivel:`, res)

        if (!res.success) {
          console.error(`❌ Error en completarNivel:`, res.message)
          toast({ title: "Error", description: res.message || "No se pudo marcar el nivel como completado" })
        } else {
          console.log(`✅ Nivel completado exitosamente`)
        }

        return res
      } catch (error: any) {
        console.error("❌ Excepción en completarNivelActual:", error)
        toast({ title: "Error", description: error?.message || "Error al completar nivel" })
        return { success: false, message: error?.message }
      }
    },
    [user, toast]
  )

  return { saveProgress, completarNivelActual }
}
