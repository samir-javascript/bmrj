import React from 'react'
import { Code } from "bright"
import {MDXRemote} from "next-mdx-remote/rsc"
Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light"
}
const ParseHtml = ({data}:  {data:string}) => {
  return (
    <section className='markdown break-words prose grid'>
        <MDXRemote source={data} components={{
          pre: (props) =>  (
          <Code {...props} className='shadow-light-200 dark:shadow-dark-200' />
        )
        }} />
    </section>
  )
}

export default ParseHtml