"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message
    });
};
exports.default = errorHandler;
