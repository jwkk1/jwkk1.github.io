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

const PageButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background-color: #000000;
`

const ButtonText = styled.p`
  fontweight: 600;
  font-size: 14px;
  lineheight: 1.25;
  color: #ffffff;
`

export default function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <StaticImage
          src="../../images/header-image.png"
          alt="Logo Image"
          width={195}
        />
      </Link>
      <PageButton to="http://workscombine.com/">
        <StaticImage
          src="../../images/small-logo.svg"
          alt="Logo Image"
          width={18}
        />
        <ButtonText>웍스컴바인 홈페이지</ButtonText>
      </PageButton>
    </Wrapper>
  )
}
