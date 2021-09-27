import withSession from '../../libs/session'

const checkUser = (credentials) => {
  switch (credentials.username) {
    case 'sezione1':
      return credentials.password === '11455715' ? { number: 1, column: 'C' } : undefined
    case 'sezione2':
      return credentials.password === '39995257' ? { number: 2, column: 'D' } : undefined
    case 'sezione3':
      return credentials.password === '54777519' ? { number: 3, column: 'E' } : undefined
    case 'sezione4':
      return credentials.password === '23342755' ? { number: 4, column: 'F' } : undefined
    case 'sezione5':
      return credentials.password === '52927470' ? { number: 5, column: 'G' } : undefined
    case 'sezione6':
      return credentials.password === '49006421' ? { number: 6, column: 'H' } : undefined
    case 'sezione7':
      return credentials.password === '54415958' ? { number: 7, column: 'I' } : undefined
    case 'sezione8':
      return credentials.password === '52513385' ? { number: 8, column: 'J' } : undefined
    case 'sezione9':
      return credentials.password === '53757022' ? { number: 9, column: 'K' } : undefined
    case 'sezione10':
      return credentials.password === '02733762' ? { number: 10, column: 'L' } : undefined
    case 'sezione11':
      return credentials.password === '03431442' ? { number: 11, column: 'M' } : undefined
    default:
      return undefined
  }
}

export default withSession(async (req, res) => {

	if (req.method === 'POST') {

		const user = checkUser(req.body)
		if (!user) return res.status(401).send('Invalid username or password')
	
		req.session.set('user', user)
		await req.session.save()
		res.status(200).send({ status: 200 })

	} else {
		res.status(400).send()
	}

})