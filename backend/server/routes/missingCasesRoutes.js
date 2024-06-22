import express from 'express';
import {
    searchMissingCases,
    addMissingCase,
    getAllMissingCases,
    getMissingCaseById,
    updateMissingCase,
    deleteMissingCase
} from '../controllers/missingCasesController.js';

const router = express.Router();

router.get('/search', searchMissingCases);
router.post('/', addMissingCase);
router.get('/', getAllMissingCases);
router.get('/:id', getMissingCaseById);
router.patch('/:id', updateMissingCase);
router.delete('/:id', deleteMissingCase);

export default router;
