import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 330px;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

// const Content = styled.div`
//   position: relative;
//   z-index: 1;
//   padding: 40px;
// `

// const SubText = styled.div`
//   font-size: 30px;
//   font-weight: 100;

//   @media (max-width: 1024px) {
//     font-size: 25px;
//   }

//   @media (max-width: 768px) {
//     font-size: 18px;
//   }
// `

// const MainText = styled.div`
//   font-size: 40px;
//   font-weight: 700;

//   @media (max-width: 1024px) {
//     font-size: 30px;
//   }

//   @media (max-width: 768px) {
//     font-size: 20px;
//   }
// `

export default function Introduction() {
  return (
    <Container>
      <Background>
        <StaticImage
          quality={100}
          src="../../images/intro-background.jpg"
          alt="background Image"
          width={7680}
          height={1320}
          layout="fullWidth"
          objectFit="cover"
          formats={['jpg']}
        />
      </Background>
      {/* <Content>
        <SubText>Sub Title</SubText>
        <MainText>Main Title</MainText>
      </Content> */}
    </Container>
  )
}
