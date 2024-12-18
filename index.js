"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handshake_1 = __importDefault(require("./router/handshake"));
const user_1 = __importDefault(require("./router/user"));
const error_handler_1 = __importDefault(require("./error-handler"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Stencilight Rank Server');
});
app.use('/handshake', handshake_1.default);
app.use('/user', user_1.default);
app.use(error_handler_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
