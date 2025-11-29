import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id_usuario } = await req.json();

    await pool.query(
      `UPDATE Progreso 
       SET nivel_actual = 1, actualizado_en = NOW()
       WHERE id_usuario = $1`,
      [id_usuario]
    );

    return NextResponse.json({ success: true, nivel_actual: 1 });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
