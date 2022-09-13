import { Router } from 'express';
import publishers from '../controllers/PublisherController';

const router = Router();

router.get('/', publishers.getPublishers);
router.post('/', publishers.createPublisher);
router.put('/:id', publishers.updatePublisher);
router.delete('/:id', publishers.deletePublisher);

export default router;
