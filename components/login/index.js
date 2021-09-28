import { useEffect, useState } from "react"
import Head from 'next/head'
import Cookies from 'js-cookie'
import { useRouter } from "next/router"

import { post } from "../../libs/fetcher"


export const LoginPage = () => {

  const [credentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (Cookies.get('loggen_id')) router.replace('/')
	}, [])

  const login = async (e) => {
    e.preventDefault()
    try {
      const res = await post('/api/login', credentials)
			if (res.status === 200) { 
				Cookies.set('logged_in', 'yes', { secure: process.env.NODE_ENV === 'production', expires: 15 })
				router.push('/')
			}
    } catch { setError(true) }
  }

  return (
    <div className='h-screen w-full overflow-hidden flex flex-col items-center justify-center'>
      
      <Head><title>Accedi</title></Head>

      <span className='text-5xl font-bold'>Inserisci le credenziali</span>

      <form className='mt-8 flex flex-col items-center w-1/2 sm:w-1/3' onSubmit={login}>

        <input className='text-2xl border-2 border-gray-200 px-3 py-4 rounded-md w-full' autoComplete='off' autoCapitalize='none' data-lpignore="true" type='text'
          placeholder='Nome utente'
          onChange={({ target }) => credentials.username = target.value}
        />
        
        <input className='mt-6 text-2xl border-2 border-gray-200 px-3 py-4 rounded-md w-full' autoComplete='off' autoCapitalize='none' data-lpignore="true" type='password'
          placeholder='Password'
          onChange={({ target }) => credentials.password = target.value}
        />

        { error && <span className='text-2xl text-red-600 mt-4 font-light'>Username o password non valida</span> }

        <input className='mt-6 bg-yellow px-12 py-2 cursor-pointer bg-yellow-300 rounded-md text-2xl' type='submit' value='Accedi' />

      </form>

    </div>
  )

}