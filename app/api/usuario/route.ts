import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, contrasena } = await req.json();

    const result = await pool.query(
      `INSERT INTO usuario (email, contrasena)
       VALUES ($1, $2)
       RETURNING *`,
      [email, contrasena]
    );

    return NextResponse.json({ success: true, usuario: result.rows[0] });
  } catch (err: any) {
    if (err.code === "23505") {
      return NextResponse.json(
        { success: false, error: "Email ya registrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
