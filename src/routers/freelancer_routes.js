import { Router } from 'express'
import { login, registro
} from '../controllers/freelancer_controller.js'

const router = Router()

router.post('/registro', registro)


router.post('/freelancer/login', login)

export default router