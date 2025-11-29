import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Datos recibidos en /api/onboarding/save:", body);

    const {
      id_usuario,
      nombre,
      edad,
      emociones,
      id_genero,
      id_intensidad,
      id_objetivo,
    } = body;

    if (!id_usuario) {
      return NextResponse.json(
        { success: false, error: "Falta id_usuario" },
        { status: 400 }
      );
    }

    // Verificar si ya existe un registro para este usuario
    const existing = await pool.query(
      "SELECT id_usuario FROM Onboarding WHERE id_usuario = $1",
      [id_usuario]
    );

    if (existing.rows.length > 0) {
      // Actualizar registro existente
      await pool.query(
        `
        UPDATE Onboarding SET
          nombre = $2,
          edad = $3,
          emociones = $4,
          id_genero = $5,
          id_intensidad = $6,
          id_objetivo = $7,
          fecha_actualizacion = datetime('now')
        WHERE id_usuario = $1
        `,
        [
          id_usuario,
          nombre || null,
          edad || null,
          emociones || null,
          id_genero || null,
          id_intensidad || null,
          id_objetivo || null,
        ]
      );
    } else {
      // Insertar nuevo registro
      await pool.query(
        `
        INSERT INTO Onboarding 
          (id_usuario, nombre, edad, emociones, id_genero, id_intensidad, id_objetivo)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          id_usuario,
          nombre || null,
          edad || null,
          emociones || null,
          id_genero || null,
          id_intensidad || null,
          id_objetivo || null,
        ]
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error en /api/onboarding/save:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
