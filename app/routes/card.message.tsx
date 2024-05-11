import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { addDays, format } from 'date-fns'

export async function loader() {
  const edate = format(addDays(new Date(), 1), 'yyyy-MM-dd')
  const sdate = format(addDays(new Date(), 0), 'yyyy-MM-dd')
  const keyword = ''
  const pernum = 30
  const apiUrl = `http://114.113.152.67:8118/API_V1/API_MSGBYMSSQL/MSG_INFO?keyword=${keyword}&sdate=${sdate}&edate=${edate}&pz=&pagenum=1&pernum=${pernum}`
  console.log(apiUrl)
  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch data from external API')
    }
    const data = await response.json()
    return json(data)
  } catch (error) {
    return json({ error: error.message }, { status: 500 })
  }
}

export default function Page() {
  const messages = useLoaderData(typeof loader)
  return (
    <div className='container flex flex-col max-w-md p-3 mx-auto rounded bg-slate-100 font-harmonysans '>
      <div>
        <div className='container flex flex-col max-w-md px-0 py-4 font-harmonysans rounded-2xl'>
          <div className='flex items-center justify-center'>
            <p className='text-[#1b1b1b] text-[20px] font-bold'> 唐宋短信</p>
            <div className='text-[#929292] text-[16px]'>({format(addDays(new Date(), 0), 'yyyy-MM-dd')})</div>
          </div>
          {messages.data.map(item => (
            <div key={item.id} className='flex px-2 py-2'>
              <div className='flex flex-col items-center mr-4'>
                <div className='w-[6px] h-[6px]  flex justify-center items-center bg-transparent'>
                  <div className='w-[6px] h-[6px] flex-none  bg-[#e4e4e4] rounded-full' />
                </div>

                <div className=' grow w-[2px] bg-[#e4e4e4] ' />
              </div>

              <div className='font-harmonysans'>
                <div className='text-[#929292] font-alibabasans font-bold'>{item.sdate.split(' ')[1]}</div>
                <div className='text-blue pb-2 text-[16px]'>{item.info}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
