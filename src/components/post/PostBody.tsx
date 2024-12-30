import styled from 'styled-components'

import TableOfContents from './TableOfContents'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import type { Components } from 'react-markdown'

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

  @media (max-width: 768px) {
    gap: 50px;
    font-size: 14px;
    line-height: 1.8;
  }
`

const StyledMarkdown = styled(ReactMarkdown)`
  // 전체 마크다운 컨테이너
  width: 100%;
  overflow-x: hidden; // 가로 스크롤 방지

  // 코드 블록 스타일링
  pre {
    max-width: 100%;
    overflow-x: auto; // 코드 블록만 가로 스크롤 허용
    padding: 1rem;
    margin: 1rem 0;
    background: #f5f5f5;
    border-radius: 4px;
  }

  // 인라인 코드 스타일링
  code {
    background: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }

  // 이미지가 컨테이너를 벗어나지 않도록
  img {
    max-width: 100%;
    height: auto;
  }

  // 표가 컨테이너를 벗어나지 않도록
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
