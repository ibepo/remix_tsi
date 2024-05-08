import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format, isToday } from 'date-fns'
import { MdiMinusThick, TablerTriangleFilled, TablerTriangleInvertedFilled } from '~/components/icon'
import { cn } from '~/utils/utils'

export async function loader() {
  const token = `F8A0FDD7272811F4E050A8C00E011B4C8f00b204e9800998-e6a52c4a7bea4ab9b1c034e09bde40d8`
  const apiUrl = `http://118.126.142.187:8089/ts-datamanager/newjcyj/api/visualization/findDataList?token=${token}`

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        indexTag: 'Y',
        indexViewTag: 'P',
      }),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data from external API')
    }
    const data = await response.json()
    return json(data)
  } catch (error) {
    return json({ error: error.message }, { status: 500 })
  }
}

const Yuce = ({ item }) => {
  if (item.forecastChgStatus) {
    let color = ''
    if (item.forecastChgStatus.includes('涨')) {
      color = 'red'
    } else if (item.forecastChgStatus.includes('跌')) {
      color = 'green'
    } else if (item.forecastChgStatus.includes('平')) {
      color = 'orange'
    }

    return (
      <div
        className={cn('text-sm font-alibaba-puhui font-semibold', {
          'text-red-500': color === 'red',
          'text-blue-500': color === 'blue',
          'text-orange-500': color === 'orange',
        })}
      >
        看{item.forecastChgStatus}
        {/* {item.forecastHighPrice}~{item.forecastLowPrice} */}
      </div>
    )
  }
}

const Chg = ({ item }) => {
  if (item.chg < 0) {
    return (
      <div>
        <div className='flex  text-[#36c2a9]  items-center justify-center'>
          <TablerTriangleInvertedFilled />
          <div className='text-xs font-semibold font-abel '>{item.chg}</div>
        </div>

        {isToday(item.rq) ? (
          <div className='hidden'>{format(item.rq, 'MM/dd')}</div>
        ) : (
          <div className='mt-2 text-sm text-right'>{format(item.rq, 'MM/dd')}</div>
        )}
      </div>
    )
  } else if (item.chg == 0) {
    return (
      <div>
        <div className='flex items-center justify-center text-slate-400'>
          <MdiMinusThick />
          <div className='text-xs font-semibold font-abel '>{item.chg}</div>
        </div>
        {isToday(item.rq) ? (
          <div className='hidden'>{format(item.rq, 'MM/dd')}</div>
        ) : (
          <div className='mt-2 text-sm text-right'>{format(item.rq, 'MM/dd')}</div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        <div className='flex  text-[#EB4F50]  items-center'>
          <TablerTriangleFilled />
          <p className='text-xs font-semibold font-abel '>+{item.chg}</p>
        </div>
        {isToday(item.rq) ? (
          <div className='hidden'>{format(item.rq, 'MM/dd')}</div>
        ) : (
          <div className='mt-2 text-sm text-right'>{format(item.rq, 'MM/dd')}</div>
        )}
      </div>
    )
  }
}

export default function Page() {
  const kanbans = useLoaderData(typeof loader)
  return (
    <>
      <div className='container flex flex-col max-w-md p-3 rounded bg-slate-100 font-harmonysans '>
        <div className='flex items-end p-4 mt-10 font-alibaba-puhui'>
          <p className='text-5xl font-bold font-abel'>78.5</p>
          <p className='ml-1'>公斤</p>
          {/* <Separator orientation='vertical' size='2' color='cyan' className='mx-8' /> */}
          <p className='text-2xl font-bold font-abel'>2.7</p>
          <p className='ml-1'>较上一次</p>
        </div>
        <p className='mt-4 text-xl font-bold font-abel'>全国基准价</p>
        <div className='grid grid-cols-3 gap-4 mt-6'>
          {kanbans?.data?.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-start justify-center gap-2 p-5 bg-white rounded-2xl aspect-square '
            >
              <p className='text-sm text-gray-500 '>{item.codeName.replace('全国基准价', '')}</p>
              <div className='flex'>
                <p className='text-2xl font-semibold text-[#333333]'>{item.data}</p>
              </div>
              <Chg item={item} />
              {/* <Yuce item={item} /> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
