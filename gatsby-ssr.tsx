import { GatsbySSR } from 'gatsby'
import Layout from './src/components/common/Layout'

const HeadComponents = [
  <link
    href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css"
    rel="stylesheet"
    key="SUIT-font"
  />,
]

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents(HeadComponents)
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => {
  return <Layout {...props}>{element}</Layout>
}
