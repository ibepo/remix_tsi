import type { MetaFunction } from '@remix-run/node'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const meta: MetaFunction = () => {
  return [{ title: 'NeoTsi' }, { name: 'description', content: 'Welcome to Remix!' }]
}


export default function Index() {
const markdown = `

## Overview
* Follows [CommonMark](https://commonmark.org)
* Has a lot of plugins

`
  return (
         <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
  )
}
