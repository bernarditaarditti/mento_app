import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id?: string } }) {
  try {
    console.log("GET /api/progreso params:", params, "url:", request.url)
    let userId: number | null = null

    if (params && params.id) {
      const parsed = parseInt(params.id as string, 10)
      if (!Number.isNaN(parsed)) userId = parsed
    }

    // If params.id not provided (or invalid), try to parse from URL path as fallback
    if (userId === null) {
      try {
        const url = new URL(request.url)
        const parts = url.pathname.split("/").filter(Boolean)
        const last = parts[parts.length - 1]
        const parsed = parseInt(last, 10)
        if (!Number.isNaN(parsed)) userId = parsed
      } catch (e) {
        // ignore
      }
    }

    if (userId === null) {
      return NextResponse.json({ success: false, message: "Id inválido" }, { status: 400 })
    }

    const result = await pool.query(
      `SELECT Id_progreso, nivel_actual, fecha_inicio, Id_isla FROM Progreso WHERE Id_usuario = $1`,
      [userId]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error en GET /api/progreso/[id]:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
