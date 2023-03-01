import express from "express";
import { autoCompleteKeyword } from "../controllers/formUtil.js";

const router = express.Router()

router.get('/keyword/autocomplete', autoCompleteKeyword);

export default router;