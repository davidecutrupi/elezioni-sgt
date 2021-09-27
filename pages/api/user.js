import withSession from '../../libs/session'

export default withSession(async (req, res) => {

	if (req.method === 'GET') {
		const user = req.session.get('user')
		if (user) {
			return res.status(200).send(user)
		} else {
			return res.status(401).send()
		}

	} else {
		return res.status(400).send()
	}
})