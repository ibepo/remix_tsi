import { json } from '@remix-run/node'

export const messages = async ({ request }) => {
  const userId = 'F8A0FDD7272811F4E050A8C00E011B4C'
  const token = `F8A0FDD7272811F4E050A8C00E011B4C-3a4e5833d8704a66a58683bb29a5d850`
  let sdate = ''
  let edate = format(addDays(new Date(), 1), 'yyyy-MM-dd')
  // console.log(edate)
  // console.log('1234')
  let keyword = ''
  let pernum = 10
  const apiUrl = `http://114.113.152.67:8118/API_V1/API_MSGBYMSSQL/MSG_INFO?keyword=${keyword}&sdate=${sdate}&edate=${edate}&pz=3,8&pagenum=1&pernum=${pernum}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch data from external API')
    }
    const data = await response.json()
    // console.log(data)
    return json(data)
  } catch (error) {
    return json({ error: error.message }, { status: 500 })
  }
}
