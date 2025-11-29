import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id, 10);
    if (Number.isNaN(userId)) {
      return NextResponse.json({ success: false, message: "Id inválido" }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT nombre, edad, emociones, id_genero, id_intensidad, id_objetivo, id_usuario
       FROM Onboarding WHERE id_usuario = $1 LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error en GET /api/onboarding/[id]:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
