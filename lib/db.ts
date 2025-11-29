import Database from "better-sqlite3";
import path from "path";

// Evita múltiples conexiones en desarrollo en Next.js (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var sqliteDb: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === "production") {
  // En producción, crea una nueva conexión
  const dbPath = process.env.DATABASE_URL?.replace("file:", "") || path.join(process.cwd(), "dev.db");
  db = new Database(dbPath);
} else {
  // En desarrollo, reutiliza la conexión global para evitar múltiples conexiones
  if (!global.sqliteDb) {
    const dbPath = process.env.DATABASE_URL?.replace("file:", "") || path.join(process.cwd(), "dev.db");
    global.sqliteDb = new Database(dbPath);
    // Habilitar foreign keys
    global.sqliteDb.pragma("foreign_keys = ON");
  }
  db = global.sqliteDb;
}

// Convertir sintaxis de PostgreSQL ($1, $2) a SQLite (?)
function convertPgToSqlite(sql: string, params: any[]): { sql: string; params: any[] } {
  let convertedSql = sql;
  
  // Reemplazar $1, $2, etc. con ?
  convertedSql = convertedSql.replace(/\$(\d+)/g, () => {
    return "?";
  });
  
  // Convertir NOW() a datetime('now') para SQLite
  convertedSql = convertedSql.replace(/NOW\(\)/gi, "datetime('now')");
  
  return { sql: convertedSql, params };
}

// Wrapper para simular la interfaz de pg Pool
export const pool = {
  query: async (sql: string, params: any[] = []) => {
    try {
      // Convertir la consulta de PostgreSQL a SQLite
      const { sql: convertedSql, params: convertedParams } = convertPgToSqlite(sql, params);
      
      // Preparar la consulta
      const stmt = db.prepare(convertedSql);
      
      // Si es SELECT, usar all(), si no usar run()
      const isSelect = convertedSql.trim().toUpperCase().startsWith("SELECT");
      
      if (isSelect) {
        const rows = stmt.all(...convertedParams) as any[];
        return { rows };
      } else {
        const result = stmt.run(...convertedParams);
        
        // Para INSERT con RETURNING, obtener el registro insertado
        if (convertedSql.trim().toUpperCase().startsWith("INSERT")) {
          const lastId = result.lastInsertRowid;
          if (lastId && sql.includes("RETURNING")) {
            // Buscar el registro insertado por ID
            // Extraer el nombre de la tabla de la consulta INSERT
            const tableMatch = convertedSql.match(/INTO\s+(\w+)/i);
            const tableName = tableMatch ? tableMatch[1] : "Usuario";
            const selectStmt = db.prepare(`SELECT * FROM ${tableName} WHERE Id_usuario = ?`);
            const row = selectStmt.get(lastId) as any;
            return { rows: row ? [row] : [] };
          }
        }
        return { rows: [] };
      }
    } catch (error: any) {
      console.error("Error en consulta SQLite:", error);
      console.error("SQL original:", sql);
      console.error("SQL convertido:", convertPgToSqlite(sql, params).sql);
      throw error;
    }
  },
};

// Función para inicializar las tablas si no existen
export function initializeDatabase() {
  try {
    // Crear tabla Usuario si no existe
    db.exec(`
      CREATE TABLE IF NOT EXISTS Usuario (
        Id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        contrasena TEXT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        ultimo_inicio DATETIME
      )
    `);
    
    // Crear tabla Onboarding si no existe
    db.exec(`
      CREATE TABLE IF NOT EXISTS Onboarding (
        id_usuario INTEGER PRIMARY KEY,
        nombre TEXT,
        edad INTEGER,
        emociones TEXT,
        id_genero INTEGER,
        id_intensidad INTEGER,
        id_objetivo INTEGER,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES Usuario(Id_usuario) ON DELETE CASCADE
      )
    `);
    
    // Crear tabla ProgresoNivel si no existe (guarda qué niveles están completados por usuario e isla)
    // Nota: Se usa INTEGER para completado (0 = false, 1 = true) porque SQLite no tiene tipo BOOLEAN nativo
    db.exec(`
      CREATE TABLE IF NOT EXISTS ProgresoNivel (
        id_progreso INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INTEGER NOT NULL,
        id_isla INTEGER NOT NULL,
        numero_nivel INTEGER NOT NULL,
        completado INTEGER DEFAULT 0,
        fecha_completado DATETIME,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES Usuario(Id_usuario) ON DELETE CASCADE,
        UNIQUE(id_usuario, id_isla, numero_nivel)
      )
    `);
    
    // Verificar que la tabla se creó correctamente
    const tableCheck = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='ProgresoNivel'
    `).get();
    
    if (tableCheck) {
      console.log("✅ Tabla ProgresoNivel existe");
    } else {
      console.error("❌ Tabla ProgresoNivel NO existe después de intentar crearla");
    }
    
    console.log("✅ Base de datos SQLite inicializada correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
  }
}

// Inicializar la base de datos al cargar el módulo
initializeDatabase();
