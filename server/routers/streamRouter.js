import express from 'express';
import { getStreamToken } from '../controllers/streamController.js';

const router = express.Router();

router.get('/token/:userId', getStreamToken);

export { router as streamRouter };
