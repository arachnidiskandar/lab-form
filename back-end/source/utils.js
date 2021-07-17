const utils = {}

utils.shortUrlMatch = '^.{3}(\\))?[-].{4}(\\))?[-].{3}'

utils.shortUrl = () => {
	return [
		Math.random().toString(36).slice(2, 5),
		Math.random().toString(36).slice(2, 6),
		Math.random().toString(36).slice(2, 5)
	].join('-')
}

module.exports = utils
