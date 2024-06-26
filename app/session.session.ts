import { createCookieSessionStorage } from '@remix-run/node'

export type UserSessionData = {
  username: string
}

export const userSessionStorage = createCookieSessionStorage<UserSessionData>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 过期时间，这里为一天
    path: '/',
    sameSite: 'lax',
    // 加密密钥
    secrets: [process.env.SESSION_SECRET as string],
    secure: true,
  },
})
