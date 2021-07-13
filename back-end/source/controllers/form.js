const express = require('express')
const firebase = require('../database.js')
const Form = require('../models/form.js')

let database = firebase.database()
const forms = {}

forms.create = async (req, res) => {
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

forms.get = async (req, res) => {
	const { id } = req.params
	try {
		const result = await database.ref('forms').child(id).once('value')
		res.status(200).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.all = async (req, res) => {
	try {
		const result = await database.ref('forms').once('value')
		res.status(200).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.update = async (req, res) => {
	const { id } = req.params
	const { title, description, questions } = req.body
	const form = new Form(
		title,
		description,
		questions,
	)
	try {
		const result = await database.ref('forms').child(id).set(form)
		res.status(204).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.remove = async (req, res) => {
	const { id } = req.body
	try {
		const result = await database.ref('forms').child(id).remove()
		res.status(204).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = forms
