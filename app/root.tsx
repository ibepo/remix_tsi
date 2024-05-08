import { NextUIProvider } from '@nextui-org/react'
import type { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import stylesheet from 'app/main.css?url'
import Topbar from '~/components/Topbar.tsx'

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <Topbar />
          {/* <div className='container p-4 mx-auto'> */}
          <div className='bg-fixed bg-left-top g-gradient-to-r from-white via-transparent to-white bg-size-10 bg-f4f4f6'>
            <Outlet />
          </div>
          {/* </div> */}
        </NextUIProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]
