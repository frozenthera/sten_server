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
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const dbdriver_1 = __importDefault(require("../dbdriver"));
const http_exception_1 = __importDefault(require("../http-exception"));
const router = express_1.default.Router();
router.get('/list', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        const result = yield user_controller_1.default.getAllUsers(db);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
    ;
}));
router.get('/rank/:type', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        const type = parseInt(req.params.type);
        if (type > 5 || type < 3) {
            throw new http_exception_1.default(500, 'Unexpected game type..');
        }
        const result = yield user_controller_1.default.getAllUserRanks(db, type);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
    ;
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        const result = yield user_controller_1.default.getUserById(db, req.params.id);
        if (!result) {
            throw new http_exception_1.default(404, 'User not found..');
        }
        res.send(result);
    }
    catch (err) {
        next(err);
    }
    ;
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        const user = req.body;
        const result = yield user_controller_1.default.createUser(db, user);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
    ;
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        yield user_controller_1.default.deleteUser(db, req.params.id);
        res.send(req.params.id);
    }
    catch (err) {
        next(err);
    }
    ;
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield dbdriver_1.default.getDatabase();
        const data = req.body;
        const prevUser = yield user_controller_1.default.getUserById(db, req.params.id);
        if (!prevUser) {
            throw new http_exception_1.default(404, 'User not found..');
        }
        const user = {
            uid: prevUser.uid,
            name: data.name || prevUser.name,
            max_score_3: data.max_score_3 || prevUser.max_score_3,
            max_score_4: data.max_score_4 || prevUser.max_score_4,
            max_score_5: data.max_score_5 || prevUser.max_score_5,
        };
        console.log(user);
        yield user_controller_1.default.updateUser(db, user, req.params.id);
        res.send(user);
    }
    catch (err) {
        next(err);
    }
    ;
}));
exports.default = router;
