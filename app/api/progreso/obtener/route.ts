import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id_usuario, id_isla } = body;

    if (!id_usuario || !id_isla) {
      return NextResponse.json(
        { success: false, message: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Obtener todos los niveles completados para esta isla y usuario
    const result = await pool.query(
      `SELECT numero_nivel, completado 
       FROM ProgresoNivel 
       WHERE id_usuario = $1 AND id_isla = $2 AND completado = 1`,
      [id_usuario, id_isla]
    );

    // Convertir a array de números de niveles completados
    const nivelesCompletados = (result.rows || []).map((row: any) => {
      const nivel = typeof row.numero_nivel === 'number' ? row.numero_nivel : parseInt(String(row.numero_nivel), 10);
      return isNaN(nivel) ? null : nivel;
    }).filter((nivel): nivel is number => nivel !== null);

    // Determinar el último nivel desbloqueado
    // El nivel 1 siempre está desbloqueado
    // Cada nivel se desbloquea cuando el anterior está completado
    // El último nivel desbloqueado es el siguiente al último completado, o 1 si no hay ningún completado
    let ultimoNivelDesbloqueado = 1;
    
    // Encontrar el nivel más alto completado
    if (nivelesCompletados.length > 0) {
      const maxNivelCompletado = Math.max(...nivelesCompletados);
      // El siguiente nivel después del último completado está desbloqueado
      ultimoNivelDesbloqueado = maxNivelCompletado + 1;
      // El último nivel desbloqueado no puede ser mayor que 5
      if (ultimoNivelDesbloqueado > 5) {
        ultimoNivelDesbloqueado = 5;
      }
    }

    console.log(`✅ Progreso obtenido para usuario ${id_usuario}, isla ${id_isla}: niveles completados=${JSON.stringify(nivelesCompletados)}, último desbloqueado=${ultimoNivelDesbloqueado}`);
    
    return NextResponse.json({
      success: true,
      nivelesCompletados,
      ultimoNivelDesbloqueado,
    });
  } catch (error) {
    console.error("Error en /api/progreso/obtener:", error);
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    );
  }
}

