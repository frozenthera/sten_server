import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let dbInstance: Database | null = null;

const dbDriver = {
    async getDatabase(): Promise<Database>{
        if (!dbInstance) {
            dbInstance = await open<sqlite3.Database, sqlite3.Statement>({
                filename: "./db/database.db",
                driver: sqlite3.Database
            });

            await dbInstance.exec(`
                CREATE TABLE IF NOT EXISTS users (
                    uid TEXT NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    max_score_3 INTEGER NOT NULL,
                    max_score_4 INTEGER NOT NULL,
                    max_score_5 INTEGER NOT NULL
                )
            `);
        }

        if (!dbInstance) {
            throw new Error("Failed to load database.");
        }

        return dbInstance;
    }
}

export default dbDriver;