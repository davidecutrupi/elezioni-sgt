import { post } from './fetcher'

export default function reducer(state, action) {
	switch (action.type) {
		case 'set':
			return action.payload
		case 'unMount':
			if (!state) return state
			else {
				const values = [...state]
				values.shift()
				post('/api/sheet', { criteria: `COL3:COL26`, values: values }).catch(() => {})
			}
			return state
		default:
			throw new Error()
	}
}