import express from "express";
import { getNearbyRestaurants } from "../controllers/Restaurant.controller.js";
import {authMiddleware} from '../middleware/Auth.js'

const router = express.Router();

router.post("/nearby",  authMiddleware, getNearbyRestaurants);

export default router;