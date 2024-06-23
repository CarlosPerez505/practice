// backend/routes/missingCasesRoutes.js
import express from 'express';
import { getMissingCaseById, getAllMissingCases } from '../controllers/missingCasesController.js';

const router = express.Router();

router.get('/:id', getMissingCaseById);
router.get('/', getAllMissingCases);

export default router;
