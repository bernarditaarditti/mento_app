import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, contrasena } = await request.json();

    // Validación básica
    if (!email || !contrasena) {
      return NextResponse.json(
        { success: false, message: "Email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const result = await pool.query(
      "SELECT * FROM Usuario WHERE email = $1 LIMIT 1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    // Normalizar nombres de columnas (SQLite puede devolver Id_usuario o id_usuario)
    const userId = user.Id_usuario || user.id_usuario;

    // Comparar contraseña (solo texto plano de momento)
    if (user.contrasena !== contrasena) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta." },
        { status: 401 }
      );
    }

    // Actualizar último inicio
    await pool.query(
      "UPDATE Usuario SET ultimo_inicio = NOW() WHERE Id_usuario = $1",
      [userId]
    );

    // Asegurar que id_usuario sea un string para consistencia
    const userIdStr = String(userId);
    
    console.log(`✅ Login exitoso: userId=${userId} (tipo: ${typeof userId}), email=${user.email}`);
    
    return NextResponse.json({
      success: true,
      user: {
        id_usuario: userIdStr,
        email: user.email,
        fecha_creacion: user.fecha_creacion,
        ultimo_inicio: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error("Error en /usuario/login:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
