import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 Datos recibidos en /api/progreso/update:", body);
    const { id_usuario, id_isla, nivel_actual } = body;

    if (!id_usuario || !id_isla || nivel_actual == null) {
      console.error("❌ Datos incompletos en /api/progreso/update:", { id_usuario, id_isla, nivel_actual });
      return NextResponse.json({ success: false, message: "Datos incompletos" }, { status: 400 });
    }

    // Asegurar que los valores sean números
    const idUsuarioNum = typeof id_usuario === 'number' ? id_usuario : parseInt(String(id_usuario), 10);
    const idIslaNum = typeof id_isla === 'number' ? id_isla : parseInt(String(id_isla), 10);
    const nivelActualNum = typeof nivel_actual === 'number' ? nivel_actual : parseInt(String(nivel_actual), 10);

    if (isNaN(idUsuarioNum) || isNaN(idIslaNum) || isNaN(nivelActualNum)) {
      console.error("❌ Valores inválidos en /api/progreso/update:", { idUsuarioNum, idIslaNum, nivelActualNum });
      return NextResponse.json({ success: false, message: "Valores inválidos" }, { status: 400 });
    }

    // Esta API es para actualizar el progreso general, pero como estamos usando ProgresoNivel
    // para rastrear niveles completados, simplemente devolvemos éxito
    // El progreso real se guarda con completarNivelActual
    
    console.log(`✅ Progreso actualizado (sin cambios reales, usando ProgresoNivel): usuario=${idUsuarioNum}, isla=${idIslaNum}, nivel=${nivelActualNum}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error en /api/progreso/update:", error);
    console.error("❌ Stack trace:", error?.stack);
    console.error("❌ Error message:", error?.message);
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message || "Error interno" 
      },
      { status: 500 }
    );
  }
}

