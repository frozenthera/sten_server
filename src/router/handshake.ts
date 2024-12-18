import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    const date = new Date();
    res.send(date.toString());
});

export default router;