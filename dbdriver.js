"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let dbInstance = null;
const dbDriver = {
    getDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dbInstance) {
                dbInstance = yield (0, sqlite_1.open)({
                    filename: "./db/database.db",
                    driver: sqlite3_1.default.Database
                });
                yield dbInstance.exec(`
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
        });
    }
};
exports.default = dbDriver;
