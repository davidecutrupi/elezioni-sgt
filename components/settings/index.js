import { useEffect } from 'react'
import useSWRImmutable  from 'swr/immutable'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from 'js-cookie'

import { get } from '../../libs/fetcher'

import { SideNav } from '../index/sidenav'


export const SettingsPage = ({ sheet, dispach }) => {
  
	const router = useRouter()

  const { data } = useSWRImmutable(() => `/api/sheet?criteria=COL2:COL26`, get, { onErrorRetry: (error) => {
		if (error.status === 401) { return } 
	} })

	// Aggiorna i dati quando abbandona la pagina
	useEffect(() => {
		if (!Cookies.get('logged_in')) router.replace('/login')
		return async () => dispach({ type: 'unMount' })
	}, [])

  useEffect(() => {
		if (!sheet && data) { dispach({ type: 'set', payload: data.values }) }
  }, [data])

	const changeVotanti = ({ value }) => {
		sheet[1] = [value + '']
		dispach({ type: 'set', payload: [...sheet] })
	}

  const openNav = () => { document.getElementById('mySidenav').style.width = '75vw' }
  
  return (
		sheet && data ?
			<div className='h-screen w-full overflow-hidden flex flex-col'>

				<Head><title>Impostazioni</title></Head>

				{ /* Menu */ }
				<span className='font-bold text-3xl ml-20 mt-12 bg-yellow-300 w-max px-3 py-2 rounded-md cursor-pointer' onClick={() => openNav()}>MENU</span>
				<SideNav dispach={dispach} />

				<div className='flex flex-col items-center justify-center flex-grow'>
					<span className='text-4xl'>Sezione: <span className='font-bold'>{data.sezione}</span></span>
					<span className='mt-6 text-4xl'>Aventi diritto al voto: <span className='font-bold'>{sheet[0] ? sheet[0][0] || 0 : 0}</span></span>
					<span className='mt-6 text-4xl'>Votanti: <input onChange={({ target }) => changeVotanti(target)} className='font-bold border-2 border-gray-200 px-3 py-2 w-48 rounded-md' defaultValue={sheet[1] ? sheet[1][0] || 0 : 0} type='number' min={0} max={400} /></span>
				</div>

			</div>
		:
			<span>errore</span>
  )
}