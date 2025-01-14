/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components'

import TableOfContents from './TableOfContents'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import type { Components } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type PostBodyProps = {
  content: string
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 220px;
  grid-gap: 30px;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 60px;
  }
`

const Content = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
  font-size: 16px;
  line-height: 2;
  word-break: break-word;
  padding: 0 40px;

  @media (max-width: 768px) {
    gap: 50px;
    font-size: 14px;
    line-height: 1.8;
  }

  @media (max-width: 1024px) {
    padding: 0 30px;
  }
`

const StyledMarkdown = styled(ReactMarkdown)`
  width: 100%;
  overflow-x: hidden;

  // 코드 블록 스타일링
  pre {
    max-width: 100%;
    overflow-x: auto;
    margin: 1.5rem 0;
    padding: 0;
    background: transparent;
  }

  // SyntaxHighlighter 컨테이너 스타일링
  pre > div {
    border-radius: 8px !important;
    padding: 1.2rem !important;
    margin: 0 !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    font-family: 'Fira Code', 'D2Coding', monospace !important;
  }

  // 인라인 코드 스타일링
  :not(pre) > code {
    background: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Fira Code', 'D2Coding', monospace;
  }

  // 스크롤바 스타일링 (선택사항)
  pre::-webkit-scrollbar {
    height: 8px;
  }

  pre::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  pre::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  // 나머지 스타일 유지
  img {
    max-width: 100%;
    height: auto;
  }

  table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }
`

export default function PostBody({ content }: PostBodyProps) {
  const components: Components = {
    h1: ({ children }) => {
      if (!children) return null
      const id =
        children
          .toString()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, '-') + '_'
      return <h1 id={id}>{children}</h1>
    },
    h2: ({ children }) => {
      if (!children) return null
      const id =
        children
          .toString()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, '-') + '_'
      return <h2 id={id}>{children}</h2>
    },
    h3: ({ children }) => {
      if (!children) return null
      const id =
        children
          .toString()
          .toLowerCase()
          .replaceAll(/[^a-z0-9]+/g, '-') + '_'
      return <h3 id={id}>{children}</h3>
    },
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean
      className?: string
      children?: React.ReactNode
      [key: string]: any
    }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={materialOceanic}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <Wrapper>
      <Content>
        <div id="content">
          <StyledMarkdown
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={components}
          >
            {content}
          </StyledMarkdown>
        </div>
      </Content>
      <TableOfContents content={content} />
    </Wrapper>
  )
}
