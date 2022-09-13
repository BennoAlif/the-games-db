import { Router } from 'express';
import publisherService from '../services/publisher/routes';
import gameService from '../services/game/routes';

const router = Router();

router.use('/publishers', publisherService);
router.use('/games', gameService);

export default router;
