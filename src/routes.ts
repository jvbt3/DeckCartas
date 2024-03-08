import { Router } from 'express'
import cards_controller from './controller/cards_controller'


const routes = Router()

routes.get('/getCards', cards_controller.cardGet)

export default routes