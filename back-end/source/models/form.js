class Form {
	constructor(title, description = null, questions, userid) {
		this.title = title
		this.description = description
		this.questions = questions
		this.userid = userid
	}
}

module.exports = Form
