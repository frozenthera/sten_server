import express from "express";
import userController from "../controller/user-controller";
import dbDriver from "../dbdriver";
import HttpException from "../http-exception";
import { User } from "../models";

const router = express.Router();

router.get('/list', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();
        const result = await userController.getAllUsers(db);
        res.send(result);
    }
    catch (err) {
        next(err);
    };
});

router.get('/rank/:type', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();

        const type = parseInt(req.params.type);
        if (type > 5 || type < 3) {
            throw new HttpException(500, 'Unexpected game type..');
        }

        const result = await userController.getAllUserRanks(db, type);
        res.send(result);
    } 
    catch (err) {
        next(err);
    };
});

router.get('/:id', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();
        const result = await userController.getUserById(db, req.params.id);

        if (!result) {
            throw new HttpException(404, 'User not found..');
        }

        res.send(result);
    }
    catch (err) {
        next(err);
    };
});

router.post('/', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();
        const user: Omit<User, "uid"> = req.body;
        const result = await userController.createUser(db, user);

        res.send(result);
    }
    catch (err) {
        next(err);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();
        await userController.deleteUser(db, req.params.id);
        res.send(req.params.id);
    }
    catch (err) {
        next(err);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const db = await dbDriver.getDatabase();
        const data: User = req.body;

        const prevUser = await userController.getUserById(db, req.params.id);
        if (!prevUser) {
            throw new HttpException(404, 'User not found..');
        }

        const user: User = {
            uid: prevUser.uid,
            name: data.name || prevUser.name,
            max_score_3: data.max_score_3 || prevUser.max_score_3,
            max_score_4: data.max_score_4 || prevUser.max_score_4,
            max_score_5: data.max_score_5 || prevUser.max_score_5,
        }

        console.log(user);

        await userController.updateUser(db, user, req.params.id);

        res.send(user);
    }
    catch (err) {
        next(err);
    };
});

export default router;