import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const ProfileImage = styled.div`
    overflow: hidden;
    width: 140px;
    height: 50px;
    margin-bottom: 30px 
    border-radius: 50%;
`

const SubText = styled.div`
  font-size: 30px;
  font-weight: 100;

  @media (max-width: 1024px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const MainText = styled.div`
  font-size: 40px;
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export default function Introduction() {
  return (
    <div>
      <ProfileImage>
        <StaticImage src="../../images/thumbnail.png" alt="Profile Image" />
      </ProfileImage>
      <SubText>Sub Title</SubText>
      <MainText>Main Title</MainText>
    </div>
  )
}
