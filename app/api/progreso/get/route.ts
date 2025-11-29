import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id_usuario } = await req.json();

    const result = await pool.query(
      "SELECT nivel_actual FROM Progreso WHERE id_usuario = $1 LIMIT 1",
      [id_usuario]
    );

    if (result.rows.length === 0) {
      await pool.query(
        "INSERT INTO Progreso (id_usuario) VALUES ($1)",
        [id_usuario]
      );

      return NextResponse.json({
        success: true,
        nivel_actual: 1,
      });
    }

    return NextResponse.json({
      success: true,
      nivel_actual: result.rows[0].nivel_actual,
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
