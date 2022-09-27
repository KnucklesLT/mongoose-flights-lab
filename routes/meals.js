import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

/* GET home page. */
router.get('/new', mealsCtrl.new)


router.post('/', mealsCtrl.create)

export { 
  router
}
