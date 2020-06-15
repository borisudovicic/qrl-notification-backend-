import dbService from '../../services/db.service'
import PushNotifications from 'node-pushnotifications';
import { notificationSettings, mongoErr } from '../../../constants'

const push = new PushNotifications(notificationSettings);

export class Controller {

    sendNotification(req, res) {
        dbService.getDeviceTokens(req.body.usernames, "devices").then(val => {
            push.send(val, req.body.data, (err, result) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(result)
                }
            })
        }).catch(err => {
            res.json(mongoErr(err.code), err)
        })

        
    }

    addDeviceToken(req, res) {
        dbService.insert(req.body, "devices").then(val => {
            res.json(val)
        }).catch(err => {
            if(mongoErr(err.code) === 409) {
                dbService.update(req.body._id, req.body, "devices").then(val => {
                    res.json(val)
                }).catch(err => {
                    res.json(mongoErr(err.code), err)
                })
            } else
            res.json(mongoErr(err.code), err)
        })
    }
}
export default new Controller()
