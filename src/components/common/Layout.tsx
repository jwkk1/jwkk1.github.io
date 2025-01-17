import { ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'SUIT';
  }

  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    min-height: 100%;
    height: 100%;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  margin: 0px auto;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Contents = styled.div`
  width: 100%;
`

export default function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Contents>{children}</Contents>
      <Footer />
    </Wrapper>
  )
}
