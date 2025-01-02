import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 31px 0;
  background-color: #ffffff;
`

const LogoLink = styled(Link)`
  .gatsby-image-wrapper {
    width: 195px;

    @media (max-width: 1024px) {
      width: 160px;
    }

    @media (max-width: 768px) {
      width: 130px;
    }
  }
`

const PageButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background-color: #000000;

  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    @media (max-width: 768px) {
      width: 14px !important;
    }
  }
`

const ButtonText = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.25;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default function Header() {
  return (
    <Wrapper>
      <LogoLink to="/">
        <StaticImage src="../../images/header-image.png" alt="Logo Image" />
      </LogoLink>
      <PageButton to="http://workscombine.com/" target="_blank">
        <StaticImage src="../../images/small-logo.svg" alt="Logo Image" />
        <ButtonText>웍스컴바인 홈페이지</ButtonText>
      </PageButton>
    </Wrapper>
  )
}
