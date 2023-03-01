import express from 'express';
import { geocodeAddress } from '../controllers/google-maps.js';

const router = express.Router();

router.get('/geocode', geocodeAddress)

export default router;