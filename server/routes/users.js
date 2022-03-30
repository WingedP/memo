import express from "express"; // const express = require('express');
import { signin, signup } from "../controllers/users.js";
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
