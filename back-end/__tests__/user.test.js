const request = require('supertest')

const server = 'http://localhost:4000'

describe('user test', () => {
	it('should create a form', async () => {
		const response = await request(server)
			.post('/api/users/create')
			.send({
				email: 'user@email.com',
				password: 'abc123'
			})
		expect(response.status).toBe(201)
	})

	it('should login a user', async () => {
		const response = await request(server)
			.post('/api/users/login')
			.send({
				email: 'user@email.com',
				password: 'abc123'
			})
		expect(response.status).toBe(201)
	})

	it('should signout a user', async () => {
		const response = await request(server)
			.post('/api/users/signout')
			.send()
		expect(response.status).toBe(201)
	})
})
