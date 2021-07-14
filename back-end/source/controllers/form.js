const express = require('express')
const Joi = require('joi')
const firebase = require('../database.js')
const Form = require('../models/form.js')

let database = firebase.database()
const forms = {}

const schema = Joi.object({
	title: Joi.string().required().label('title'),
	description: Joi.string().label('description'),
	questions: Joi.array().min(1).required().label('questions'),
})

forms.create = async (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { title, description = null, questions } = req.body
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

forms.update = async (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { id } = req.params
	const { title, description = null, questions } = req.body
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

forms.remove = async (req, res, next) => {
	const { error } = Joi.object({
		id: Joi.string().required().label('id'),
	}).validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { id } = req.body
	try {
		const result = await database.ref('forms').child(id).remove()
		res.status(204).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = forms
