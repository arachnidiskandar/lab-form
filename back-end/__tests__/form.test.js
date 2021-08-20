const request = require('supertest')

const server = 'http://localhost:4000'

describe('form test', () => {
	it('should get all forms', async () => {
		const response = await request(server)
			.get('/api/forms')
			.send()
		expect(response.status).toBe(200)
	})

	it('should create a form', async () => {
		const response = await request(server)
			.post('/api/forms/create')
			.send({
				title: 'test',
				questions: [
					{
						title: 'name',
						type: 'TEXT'
					}
				],
			})
		expect(response.status).toBe(201)
	})

	it('should get a form', async () => {
		const response = await request(server)
			.get('/api/forms')
			.send('-MePnwyDRNk8dHoZHTTd')
		expect(response.status).toBe(200)
	})

	it('should update a form', async () => {
		const response = await request(server)
			.put('/api/forms/-MhWEzqxita8z2gmSGLr')
			.send({
				title: 'test',
				questions: [
					{
						title: 'name',
						type: 'SINGLE_TEXTBOX'
					}
				],
			})
		expect(response.status).toBe(200)
	})

	it('should delete a form', async () => {
		const response = await request(server)
			.delete('/api/forms/delete')
			.send({
				id: '-MhWEzqxita8z2gmSGLr'
			})
		expect(response.status).toBe(204)
	})

	it('should submit a form', async () => {
		const response = await request(server)
			.post('/api/forms/submit')
			.send({
				form: '-MhWGa5Hpi1dS2z5MGNz',
				answers: [
					{
						type: 'CHECKBOXES',
						content: [true, false]
					},
					{
						type: 'DROPDOWN',
						content: 2
					},
					{
						type: 'SINGLE_TEXTBOX',
						content: 'Acredito que a copa do mundo é verdade!'
					}
				]
			})
		expect(response.status).toBe(201)
	})

	it('should get answers by form', async () => {
		const response = await request(server)
			.get('/api/forms/answers/-MePnwyDRNk8dHoZHTTd')
			.send()
		expect(response.status).toBe(200)
	})

	it('should share a form', async () => {
		const response = await request(server)
			.get('/api/forms')
			.send()
		expect(response.status).toBe(200)
	})
})
