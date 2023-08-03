// ✅ using ES6 Modules syntax
import express from 'express';
import swaggerRoutes from './swagger';
import petControllers from './pets.routes';
const router = express.Router();

router.use('/', swaggerRoutes)
router.use('/', petControllers)

// ✅ export your router
export default router;
