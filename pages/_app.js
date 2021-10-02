import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import reducer from '../libs/reducer'
import { useEffect, useReducer } from 'react'

export default function MyApp({ Component, pageProps }) {

	const [sheet, dispach] = useReducer(reducer, undefined)

	// Aggiorna i dati quando chiudo il tab e ogni minuto
	useEffect(() => {

		window.addEventListener('blur', (_) => {
			dispach({ type: 'unMount' })
		})

		const interval = setInterval(() => {
			dispach({ type: 'unMount' })
		}, 60000)

		return () => clearInterval(interval)

	}, [])

  return <Component sheet={sheet} dispach={dispach} {...pageProps} />

}