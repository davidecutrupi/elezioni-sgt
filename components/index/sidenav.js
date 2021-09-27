import Link from 'next/link'
import { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'
import { post } from '../../libs/fetcher'


export const SideNav = ({ dispach }) => {

	const router = useRouter()
	const { cache } = useSWRConfig()

	const logout = async () => {
		try {
			await post('/api/logout', {})
			dispach({ type: 'set', payload: undefined })
			cache.clear()
			return router.replace('/login')
		} catch {} 
	}

  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0px'
  }

  return (
    <div id="mySidenav" className="sidenav">
      <span className="closebtn cursor-pointer" onClick={() => closeNav()}>&times;</span>
      <Link href='/'><a className="cursor-pointer">Home</a></Link>
      <Link href='/settings'><a className="cursor-pointer">Configurazione</a></Link>
      <span onClick={() => logout()} className="cursor-pointer">Esci</span>
    </div>
  )
}