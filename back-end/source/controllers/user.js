const express = require('express')
const firebase = require('firebase')
const Joi = require('joi')

const users = {}

const schema = Joi.object({
	email: Joi.string().required().label('email'),
	password: Joi.string().label('password'),
})

users.create = async (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { email, password } = req.body
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			res.status(201).json(userCredential)
		})
		.catch((error) => {
			res.status(500).send(error.message)
	})
}

users.login = async (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { email, password } = req.body
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			res.status(201).json(userCredential)
		})
		.catch((error) => {
			res.status(500).send(error.message)
	});
}

users.signout = async (req, res, next) => {
	firebase.auth().signOut().then(() => {
		res.status(201).send('Sign-out successful.')
	}).catch((error) => {
		res.status(500).send(error.message)
	});
}

module.exports = users
