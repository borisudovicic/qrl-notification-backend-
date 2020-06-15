import * as express from 'express'
import controller from './controller'

export default express
    .Router()
    .post('/push', controller.sendNotification)
    .post('/add/devicetoken', controller.addDeviceToken)