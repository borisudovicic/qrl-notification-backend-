import router from './api/controllers/notification/router'

export default function routes(app) {
    app.use('/api/v1/notification', router)
}
