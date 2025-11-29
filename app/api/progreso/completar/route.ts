import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 Datos recibidos en /api/progreso/completar:", body);
    const { id_usuario, id_isla, numero_nivel } = body;

    console.log("📥 Datos recibidos en /api/progreso/completar (raw):", {
      id_usuario,
      id_isla,
      numero_nivel,
      tipos: {
        id_usuario: typeof id_usuario,
        id_isla: typeof id_isla,
        numero_nivel: typeof numero_nivel
      }
    });

    // Validación más estricta: verificar que existen y no son null/undefined/empty string
    if (
      id_usuario === undefined || 
      id_usuario === null || 
      id_usuario === '' ||
      id_isla === undefined || 
      id_isla === null || 
      id_isla === '' ||
      numero_nivel === undefined || 
      numero_nivel === null || 
      numero_nivel === ''
    ) {
      console.error("❌ Datos incompletos o vacíos:", { id_usuario, id_isla, numero_nivel });
      return NextResponse.json(
        { success: false, message: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Asegurar que los valores sean números (pueden venir como strings)
    const idUsuarioNum = typeof id_usuario === 'number' ? id_usuario : parseInt(String(id_usuario), 10);
    const idIslaNum = typeof id_isla === 'number' ? id_isla : parseInt(String(id_isla), 10);
    const numeroNivelNum = typeof numero_nivel === 'number' ? numero_nivel : parseInt(String(numero_nivel), 10);
    
    console.log("🔢 Valores convertidos a números:", {
      idUsuarioNum,
      idIslaNum,
      numeroNivelNum,
      tipos: {
        idUsuarioNum: typeof idUsuarioNum,
        idIslaNum: typeof idIslaNum,
        numeroNivelNum: typeof numeroNivelNum
      }
    });
    
    if (isNaN(idUsuarioNum) || isNaN(idIslaNum) || isNaN(numeroNivelNum)) {
      console.error(`❌ Error: Valores inválidos después de conversión - usuario: ${idUsuarioNum} (era ${id_usuario}), isla: ${idIslaNum} (era ${id_isla}), nivel: ${numeroNivelNum} (era ${numero_nivel})`);
      return NextResponse.json(
        { success: false, message: "Valores inválidos" },
        { status: 400 }
      );
    }

    if (idUsuarioNum <= 0 || idIslaNum <= 0 || numeroNivelNum <= 0) {
      console.error(`❌ Error: Valores deben ser positivos - usuario: ${idUsuarioNum}, isla: ${idIslaNum}, nivel: ${numeroNivelNum}`);
      return NextResponse.json(
        { success: false, message: "Valores inválidos: deben ser números positivos" },
        { status: 400 }
      );
    }

    console.log(`🔍 Verificando registro existente: usuario=${idUsuarioNum}, isla=${idIslaNum}, nivel=${numeroNivelNum}`);
    
    // Verificar que el usuario existe antes de insertar (para evitar errores de foreign key)
    try {
      const userCheck = await pool.query(
        `SELECT Id_usuario FROM Usuario WHERE Id_usuario = $1`,
        [idUsuarioNum]
      );
      if (!userCheck.rows || userCheck.rows.length === 0) {
        console.error(`❌ Usuario ${idUsuarioNum} no existe en la base de datos`);
        return NextResponse.json(
          { success: false, message: `Usuario ${idUsuarioNum} no encontrado` },
          { status: 404 }
        );
      }
      console.log(`✅ Usuario ${idUsuarioNum} existe en la base de datos`);
    } catch (userCheckError: any) {
      console.error(`❌ Error al verificar usuario:`, userCheckError);
      // Continuar de todas formas, podría ser un error menor
    }
    
    // Verificar si ya existe un registro para este nivel
    const existing = await pool.query(
      `SELECT * FROM ProgresoNivel 
       WHERE id_usuario = $1 AND id_isla = $2 AND numero_nivel = $3`,
      [idUsuarioNum, idIslaNum, numeroNivelNum]
    );

    console.log(`📋 Registro existente:`, existing.rows);

    // Si existe, actualizar; si no, insertar
    if (existing.rows && existing.rows.length > 0) {
      // Actualizar registro existente
      console.log(`🔄 Actualizando registro existente...`);
      const updateResult = await pool.query(
        `UPDATE ProgresoNivel 
         SET completado = 1, fecha_completado = NOW()

         WHERE id_usuario = $1 AND id_isla = $2 AND numero_nivel = $3`,
        [idUsuarioNum, idIslaNum, numeroNivelNum]
      );
      console.log(`✅ Registro actualizado:`, updateResult);
    } else {
      // Insertar nuevo registro
      console.log(`➕ Insertando nuevo registro...`);
      const insertResult = await pool.query(
        `INSERT INTO ProgresoNivel (id_usuario, id_isla, numero_nivel, completado, fecha_completado) 
         VALUES ($1, $2, $3, 1, NOW())`,
        [idUsuarioNum, idIslaNum, numeroNivelNum]
      );
      console.log(`✅ Registro insertado:`, insertResult);
    }

    // Verificar que se guardó correctamente
    const verificacion = await pool.query(
      `SELECT * FROM ProgresoNivel 
       WHERE id_usuario = $1 AND id_isla = $2 AND numero_nivel = $3 AND completado = 1`,
      [idUsuarioNum, idIslaNum, numeroNivelNum]
    );
    console.log(`✔️ Verificación final:`, verificacion.rows);

    console.log(`✅ Nivel ${numeroNivelNum} completado para usuario ${idUsuarioNum} en isla ${idIslaNum}`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error en /api/progreso/completar:", error);
    console.error("❌ Stack trace:", error?.stack);
    console.error("❌ Error message:", error?.message);
    console.error("❌ Error details:", {
      name: error?.name,
      code: error?.code,
      errno: error?.errno,
      sqlState: error?.sqlState,
      sql: error?.sql,
    });
    
    // Devolver un mensaje más descriptivo
    const errorMessage = error?.message || "Error interno del servidor";
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === "development" ? {
          message: error?.message,
          stack: error?.stack,
          name: error?.name,
        } : undefined
      },
      { status: 500 }
    );
  }
}

