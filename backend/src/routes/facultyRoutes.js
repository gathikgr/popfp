import { Router } from 'express';
import { markVisit, myVisits } from '../controllers/facultyController.js';
import { allowRoles, protect } from '../middleware/auth.js';

const router = Router();
router.use(protect, allowRoles('faculty'));
router.post('/visits', markVisit);
router.get('/visits', myVisits);

export default router;
