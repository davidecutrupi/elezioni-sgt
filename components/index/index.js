import { useEffect } from "react"
import useSWRImmutable  from 'swr/immutable'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from "js-cookie"

import { get } from '../../libs/fetcher'

import { Lista } from "./lista"
import { SideNav } from "./sidenav"
import { Candidato } from "./candidato"


export const HomePage = ({ sheet, dispach }) => {

	const router = useRouter()

  const { data } = useSWRImmutable (() => `/api/sheet?criteria=COL2:COL26`, get, { onErrorRetry: (error) => {
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

  const openNav = () => { document.getElementById('mySidenav').style.width = '75vw' }

	const removeVote = (index) => {
		if (!sheet[index][0]) {
			return
		} else {
			if (sheet[index] <= 0) return 
			sheet[index] = [parseInt(sheet[index]) - 1 + '']
			dispach({ type: 'set', payload: [...sheet] })
		}
  }

  const addVote = (index) => {
		if (!sheet[index] || !sheet[index][0]) {
			sheet[index] = ['1']
			dispach({ type: 'set', payload: [...sheet] })
		} else {
			sheet[index] = [parseInt(sheet[index]) + 1 + '']
			dispach({ type: 'set', payload: [...sheet] })
		}
	}

  return (
		sheet ?
			<div className='h-screen w-full overflow-hidden flex flex-col'>

				<Head><title>Home Page</title></Head>

				{ /* Menu */ }
				<span className='font-bold text-3xl ml-20 mt-12 bg-yellow-300 w-max px-3 py-2 rounded-md cursor-pointer' onClick={() => openNav()}>MENU</span>
				<SideNav dispach={dispach} />

				{ /* Parte liste */ }
				<div className='mt-16 pb-16 w-full flex flex-col'>

					<div className='pb-16 w-full flex justify-around'>
						<Lista addVote={addVote} removeVote={removeVote} icon='amaEViviLaTuaCitta' votes={sheet[2] ? sheet[2][0] || 0 : 0} index={2} />
						<Lista addVote={addVote} removeVote={removeVote} icon='m5s' votes={sheet[3] ? sheet[3][0] || 0 : 0} index={3} />
					</div>
					<div className='pt-16 border-t-2 w-full flex justify-around'>
						<Lista addVote={addVote} removeVote={removeVote} icon='giorgioSindaco' votes={sheet[4] ? sheet[4][0] || 0 : 0} index={4} />
						<Lista addVote={addVote} removeVote={removeVote} icon='unaNuovaMossa' votes={sheet[5] ? sheet[5][0] || 0 : 0} index={5} />
					</div>

				</div>

				{ /* Parte candidati */ }
				<div className='pt-16 border-gray-200 border-t-2 w-full flex-grow flex flex-col overflow-y-scroll px-20'>

					<span className='text-red-600 text-5xl font-bold'>Candidati:</span>

					<Candidato votes={sheet[9] ? sheet[9][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='1' name="Canonico Mirka" index={9} />
					<Candidato votes={sheet[10] ? sheet[10][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='2' name="Gianni Carchesio" index={10} />
					<Candidato votes={sheet[11] ? sheet[11][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='3' name="Tony Cellini" index={11} />
					<Candidato votes={sheet[12] ? sheet[12][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='4' name="Alessio De Vincentiis" index={12} />
					<Candidato votes={sheet[13] ? sheet[13][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='5' name="Letizia Di Nardo" index={13} />
					<Candidato votes={sheet[14] ? sheet[14][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='6' name="Marco D'Orazio" index={14} />
					<Candidato votes={sheet[15] ? sheet[15][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='7' name="Francesco Falcone" index={15} />
					<Candidato votes={sheet[16] ? sheet[16][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='8' name="Antonio Gialloreto" index={16} />
					<Candidato votes={sheet[17] ? sheet[17][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='9' name="Niculina Graziani" index={17} />
					<Candidato votes={sheet[18] ? sheet[18][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='10' name="Nick Longo" index={18} />
					<Candidato votes={sheet[19] ? sheet[19][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='11' name="Angelo Paludi" index={19} />
					<Candidato votes={sheet[20] ? sheet[20][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='12' name="Claudio Perilli" index={20} />
					<Candidato votes={sheet[21] ? sheet[21][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='13' name="Marianna Pescara" index={21} />
					<Candidato votes={sheet[22] ? sheet[22][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='14' name="Giuliano Salvio" index={22} />
					<Candidato votes={sheet[23] ? sheet[23][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='15' name="Erika Scarcia" index={23} />
					<Candidato votes={sheet[24] ? sheet[24][0] || 0 : 0} addVote={addVote} removeVote={removeVote} num='16' name="Emanuela Taddeo" index={24} />
				</div>

			</div>
		:
			<span>errore</span>
  )

}