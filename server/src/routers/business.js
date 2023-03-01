import express from "express";
import { fetchBusinessDetail, fetchBusinessReviews, searchBusinesses } from "../controllers/business.js";

const router = express.Router()

router.get('/search', searchBusinesses)

router.get('/:id', fetchBusinessDetail)

// router.get('/:id/reviews', fetchBusinessReviews)

export default router;