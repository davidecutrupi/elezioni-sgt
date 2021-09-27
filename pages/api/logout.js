import withSession from "../../libs/session"

export default withSession(async (req, res) => {
	if (req.method === 'POST') {
		req.session.destroy()
		return res.status(200).send()
	} else {
		return res.status(400).send()
	}
})