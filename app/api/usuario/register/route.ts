import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, contrasena } = await req.json();

    if (!email || !contrasena) {
      return NextResponse.json({ success: false, message: "Datos incompletos" }, { status: 400 });
    }

    const existing = await pool.query("SELECT * FROM Usuario WHERE email = $1", [email]);

    if (existing.rows.length > 0) {
      return NextResponse.json({ success: false, message: "El email ya está registrado" }, { status: 409 });
    }
    const result = await pool.query(
      `INSERT INTO Usuario (email, contrasena, fecha_creacion, ultimo_inicio)
       VALUES ($1, $2, NOW(), NOW()) RETURNING *`,
      [email, contrasena]
    );
    

    const user = result.rows[0];
    const userId = user.Id_usuario || user.id_usuario;

    console.log(`✅ Usuario registrado: userId=${userId} (tipo: ${typeof userId}), email=${email}`);

    // Normalizar el formato del usuario para que coincida con el contexto (igual que en login)
    return NextResponse.json({
      success: true,
      user: {
        id_usuario: String(userId),
        email: user.email,
        fecha_creacion: user.fecha_creacion,
        ultimo_inicio: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error("Error en register:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
