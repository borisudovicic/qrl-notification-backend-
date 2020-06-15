var fs  = require('fs')

module.exports = {
    notificationSettings: {
        gcm: {
            id: null,
            phonegap: false, // phonegap compatibility mode, see below (defaults to false)
        },
        apn: {
            token: {
                key: fs.readFileSync('server/assets/AuthKey_YZD88B9L67.p8'),
                keyId: 'YZD88B9L67',
                teamId: 'P6A8RQDN3H',
            },
            production: true // true for APN production environment, false for APN sandbox environment,
        },
        isAlwaysUseFCM: false, // true all messages will be sent through node-gcm (which actually uses FCM)
    },
    mongoErr: function(code) {
        switch (code) {
            case 13:
                return 401
            case 11000:
                return 409
            default:
                return 404
        }
    },
}