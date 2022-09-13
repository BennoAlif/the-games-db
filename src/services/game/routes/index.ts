import { Router } from 'express';
import uploadImage from '../../../middlewares/uploadImage';
import games from '../controllers/GameController';

const router = Router();

router.get('/', games.getGames);
router.get('/:id', games.getGameById);
router.post('/', uploadImage.single('image'), games.createGame);
router.put('/:id', uploadImage.single('image'), games.updateGame);
router.delete('/:id', games.deleteGame);

export default router;
