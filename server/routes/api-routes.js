import express from 'express';
import { getLocations} from '../controllers/api-controller.js'

const router = express.Router();

router.get('/get-locations', getLocations)

export default router;