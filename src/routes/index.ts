import { Router } from 'express';
import publisherService from '../services/publisher/routes';

const router = Router();

router.use('/publisher', publisherService);

export default router;
