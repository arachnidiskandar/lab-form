const express = require('express')
const Joi = require('joi')
const firebase = require('../database.js')
const Answer = require('../models/answer.js')
const Form = require('../models/form.js')
const Utils = require('../utils.js')

let database = firebase.database()
const forms = {}

const schema = Joi.object({
	title: Joi.string().required().label('title'),
	description: Joi.string().label('description'),
	questions: Joi.array().min(1).label('questions'),
	userid: Joi.string().label('userid'),
})

const submitSchema = Joi.object({
	form: Joi.string().required().label('form'),
	answers: Joi.array().min(1).required().items(
		Joi.object({
			type: Joi.string().valid('CHECKBOXES', 'DROPDOWN', 'SINGLE_TEXTBOX').label('type'),
			content: Joi.when('type', {
				is: Joi.string().equal('CHECKBOXES'),
				then: Joi.array().min(2).items(Joi.boolean()).required(),
			},'type', {
				is: Joi.string().equal('DROPDOWN'),
				then: Joi.number().integer().required(),
			},'type', {
				is: Joi.string().equal('SINGLE_TEXTBOX'),
				then: Joi.string().required(),
			}).label('content'),
		})
	).label('answers'),
})

forms.create = async (req, res, next) => {
	const { error } = schema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { title, description = null, questions, userid } = req.body
	const form = new Form(
		title,
		description,
		questions,
		userid
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
		const result = id.match(Utils.shortUrlMatch) ?
			await database.ref('forms').orderByChild('share').equalTo(id).once('value') :
			await database.ref('forms').child(id).once('value')
		res.status(200).json(result.val())
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.all = async (req, res) => {
	try {
		const result = await database.ref('forms').once('value'), items = []
		if(result.val()) {
			Object.entries(result.val()).forEach(([key, value]) => {
				value.id = key
				items.push(value)
			})
		}
		res.status(200).json(items)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.filter = async (req, res, next) => {
	const { error } = Joi.object({
		userid: Joi.string().required().label('userid'),
	}).validate(req.params)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { userid } = req.params
	try {
		const result = await database.ref('forms').orderByChild('userid').equalTo(userid).once('value')
		items = []
		if(result.val()) {
			Object.entries(result.val()).forEach(([key, value]) => {
				value.id = key
				items.push(value)
			})
		}
		res.status(200).json(items)
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
	const { title, description = null, questions = null} = req.body
	try {
		const ref = await database.ref('forms').child(id).once('value')
		const obj = Object.assign(new Form(), ref.val())
		obj.title = title
		obj.description = (description != null) ? description : null
		if (questions != null) obj.questions = questions
		const result = await database.ref('forms').child(id).set(obj)
		res.status(200).json(obj)
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

forms.submit = async (req, res, next) => {
	const { error } = submitSchema.validate(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { form, answers } = req.body
	const answer = new Answer(
		form,
		answers
	)
	try {
		const result = await database.ref('answers').push(answer)
		res.status(201).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.answers = async (req, res, next) => {
	const { error } = Joi.object({
		form: Joi.string().required().label('form'),
	}).validate(req.params)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { form } = req.params
	try {
		const result = await database.ref('answers').orderByChild('form').equalTo(form).once('value')
		items = [], formatted = []
		if(result.val()) {
			Object.entries(result.val()).forEach(([key, value]) => {
				items.push(value['answers'])
			})
			for (i = 0; i < items[0].length; i++) {
				item = {}
				item['type'] = items[0][i]['type']
				item['answers'] = items.map((o) => o[i]['content'])
				formatted.push(item)
			}
			for (i = 0; i < formatted.length; i++) {
				if (formatted[i].type == "CHECKBOXES") {
					const counts = {}
					for (n = 0; n < formatted[i].answers[0].length; n++) counts[n] = 0
					for (j = 0; j < formatted[i].answers.length; j++) {
						for (n = 0; n < formatted[i].answers[j].length; n++) {
							if (formatted[i].answers[j][n]) {
								counts[n] = counts[n] + 1
							}
						}
					}
					formatted[i]['answers'] = counts
				}
				if (formatted[i].type == "DROPDOWN") {
					const counts = {}
					for (const num of formatted[i].answers.flat()) {
					  counts[num] = counts[num] ? counts[num] + 1 : 1
					}
					formatted[i]['answers'] = counts
				}
			}
		}
		res.status(200).json(formatted)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

forms.share = async (req, res, next) => {
	const { error } = Joi.object({
		form: Joi.string().required().label('form'),
	}).validate(req.params)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
		return next()
	}

	const { form } = req.params
	try {
		const ref = await database.ref('forms').child(form).once('value')
		const obj = Object.assign(new Form(), ref.val())
		obj.share = Utils.shortUrl()
		const result = await database.ref('forms').child(form).set(obj)
		res.status(200).json(obj)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

module.exports = forms
