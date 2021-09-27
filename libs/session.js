import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.PRIVATE_KEY_COOKIE,
    cookieName: 'user_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
}