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
const uid_generator_1 = __importDefault(require("../tools/uid-generator"));
const userController = {
    createUser(db, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = (0, uid_generator_1.default)();
            const result = yield db.run(`
                INSERT INTO users (uid, name, max_score_3, max_score_4, max_score_5)
                VALUES (?, ?, 0, 0, 0)
            `, uid, user.name);
            return uid;
        });
    },
    getAllUsers(db) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.all("SELECT * FROM users");
        });
    },
    getAllUserRanks(db, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.all(`
            SELECT uid, name, max_score_${type.toString()} AS max_score, RANK() OVER(ORDER BY max_score_${type.toString()} DESC) rank
            FROM users
        `);
        });
    },
    getUserById(db, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.get("SELECT * FROM users WHERE uid = ?", uid);
        });
    },
    deleteUser(db, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.run("DELETE FROM users WHERE uid = ?", uid);
        });
    },
    updateUser(db, user, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.run("UPDATE users SET name = ?, max_score_3 = ?, max_score_4 = ?, max_score_5 = ? WHERE uid = ?", user.name, user.max_score_3, user.max_score_4, user.max_score_5, uid);
        });
    },
};
exports.default = userController;
