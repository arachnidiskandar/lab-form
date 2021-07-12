const express = require('express')
const firebase = require('../database.js')
const Form = require('../models/form.js')

let database = firebase.database()

const createForm = async (req, res) => {
	const { title, description, questions } = req.body
	const form = new Form(
		title,
		description,
		questions,
	)
	try {
		const result = await database.ref('forms').push(form)
		res.status(201).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const deleteForm = async (req, res) => {
	const { id } = req.body
	try {
		const result = await database.ref('forms').child(id).remove()
		res.status(204).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = {
	createForm,
	deleteForm
}
