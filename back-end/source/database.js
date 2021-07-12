const firebase = require('firebase')
const config = require('./config/config.js')

const firebaseConfig = {
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	projectId: config.projectId,
	storageBucket: config.storageBucket,
	messagingSenderId: config.messagingSenderId,
	appId: config.appId
}

module.exports = firebase.initializeApp(firebaseConfig)
