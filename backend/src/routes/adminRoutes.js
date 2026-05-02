import { Router } from 'express';
import { addFaculty, listFaculty, listVisits, payslip, setVisitStatus, stats } from '../controllers/adminController.js';
import { allowRoles, protect } from '../middleware/auth.js';

const router = Router();
router.use(protect, allowRoles('admin'));
router.get('/stats', stats);
router.post('/faculty', addFaculty);
router.get('/faculty', listFaculty);
router.get('/visits', listVisits);
router.patch('/visits/:id', setVisitStatus);
router.post('/payslip', payslip);

export default router;
