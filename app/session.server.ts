import { userSessionStorage } from '~/session.session'
export const auth = async (request: Request) => {
  const session = await userSessionStorage.getSession(request.headers.get('Cookie'))
  return {
    username: session.get('username'),
  } as UserSessionData
}
