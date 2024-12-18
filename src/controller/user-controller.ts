import { Database } from "sqlite";
import { RankDto, User } from "../models";
import generateUUID from "../tools/uid-generator";

const userController = {
    async createUser(db:Database, user:Omit<User, "uid">): Promise<string> {
        const uid = generateUUID();

        const result = await db.run(
            `
                INSERT INTO users (uid, name, max_score_3, max_score_4, max_score_5)
                VALUES (?, ?, 0, 0, 0)
            `,
            uid,
            user.name
        );

        return uid;
    },

    async getAllUsers(db: Database): Promise<User[]> {
        return await db.all<User[]>("SELECT * FROM users");
    },

    async getAllUserRanks(db: Database, type:number): Promise<RankDto[]> {
        return await db.all<RankDto[]>(`
            SELECT uid, name, max_score_${type.toString()} AS max_score, RANK() OVER(ORDER BY max_score_${type.toString()} DESC) rank
            FROM users
        `);
    },

    async getUserById(db: Database, uid: string): Promise<User | undefined> {
        return await db.get<User>("SELECT * FROM users WHERE uid = ?", uid);
    },

    async deleteUser(db: Database, uid: string): Promise<void> {
        await db.run("DELETE FROM users WHERE uid = ?", uid);
    },

    async updateUser(db: Database, user: User, uid: string): Promise<void> {
        await db.run("UPDATE users SET name = ?, max_score_3 = ?, max_score_4 = ?, max_score_5 = ? WHERE uid = ?", 
            user.name,
            user.max_score_3,
            user.max_score_4,
            user.max_score_5,
            uid);
    },
};

export default userController;