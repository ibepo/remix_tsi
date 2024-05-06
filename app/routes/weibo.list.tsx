import { Pagination } from '@nextui-org/react'
import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import { prisma } from '~/prisma.server'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}
const PAGE_SIZE = 6

export const loader = async (c: LoaderFunctionArgs) => {
  const search = new URL(c.request.url).searchParams
  const page = Number(search.get('page') || 1)

  // 用 prisma.$transaction() 进行组合查询
  const [weibos, total] = await prisma.$transaction([
    prisma.weibo.findMany({
      orderBy: {
        created_at: 'desc',
      },
      // 分页查询
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.weibo.count(),
  ])

  return json({
    weibos,
    pageCount: Math.ceil(total / PAGE_SIZE),
  })
}

function formatTextWithSemicolon(text) {
  // 使用 split() 方法将文本按分号拆分成数组
  const sentences = text.split(';')

  // 遍历数组中的每个句子，并添加换行符
  let formattedText = ''
  for (let i = 0; i < sentences.length; i++) {
    const trimmedSentence = sentences[i].trim() // 去除句子两端的空格
    if (trimmedSentence !== '') {
      formattedText += trimmedSentence
      if (i < sentences.length - 1) {
        formattedText += ';\n' // 在每个句子后添加分号和换行符
      }
    }
  }

  return formattedText
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  return (
    <div>
      <div className='flex flex-col gap-4 p-12'>
        {loaderData.weibos.map(weibo => {
          return (
            <div key={weibo.id}>
              <Link to={`/posts/${weibo.id}`} className='text-xl'>
                <div className='flex'>
                  <div className='text-xs font-bold leading-relaxed'>{formatTextWithSemicolon(weibo.text)}</div>
                </div>

                <div className='text-xs text-gray-400'>{weibo.screen_name}</div>
              </Link>
              <div className='text-xs text-gray-400'>{weibo.created_at}</div>
            </div>
          )
        })}
      </div>
      <Pagination
        page={page}
        total={loaderData.pageCount}
        onChange={page => {
          const newSearchParams = new URLSearchParams(searchParams)
          newSearchParams.set('page', String(page))
          setSearchParams(newSearchParams)
        }}
      />
    </div>
  )
}
