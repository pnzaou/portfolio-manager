import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  deleteImage,
  getAllTechnologies,
} from '../controllers/project.controller';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/public', getPublicProjects);

router.use(authMiddleware);

router.get('/technologies', getAllTechnologies)
router.post('/', upload.array('images', 10), createProject);
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.put('/:id', upload.array('images', 10), updateProject);
router.delete('/:id', deleteProject);
router.delete('/image/:imageId', deleteImage);

export default router;