import { SheetConnection, ReadSheetData, WriteSheetData } from '../../libs/sheet'
import withSession from '../../libs/session'


export default withSession(async (req, res) => {

	if (req.method === 'GET') {

		let criteria = req.query.criteria
		if (!criteria) return res.status(400).send('Invalid request')

		const user = req.session.get('user')
		if (!user) return res.status(401).send()
		criteria = criteria.replace(/COL/g, user.column)

		const sheet = SheetConnection()
		const data = await ReadSheetData(sheet, criteria)

		if (!data || !data.length) return res.status(400).send() 
		return res.status(200).json({ values: data, sezione: user.number })

	} else if (req.method === 'POST') {

		let { criteria, values } = req.body
		if (!criteria || !values) return res.status(400).send('Invalid request')

		const user = req.session.get('user')
		if (!user) return res.status(401).send()
		criteria = criteria.replace(/COL/g, user.column)

		// Imposto l'utimo aggiornamento a ora
		let date = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric', second: '2-digit', minute: '2-digit', hour: '2-digit', hour12: false }).replace(/:/g, '.')
		console.log(date)
		const formattedDate = `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)} ${date.substring(11, )}`
		values[5] = [formattedDate]


		// Cambio i campi undefined con un array vuoto
		if (!values[1]) values[1] = []
		if (!values[2]) values[2] = []
		if (!values[3]) values[3] = []
		if (!values[4]) values[4] = []
		values.forEach((value, index) => {
			if (!value) values[index] = []
		})

		const sheet = SheetConnection()
		const data = await WriteSheetData(sheet, criteria, values)

		if (data.status !== 200) return res.status(400).send() 
		return res.status(200).json()

	} else {
		return res.status(400).send()
	}

})