import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'

type PostProfileProps = {
  name: string
  role: string
  description: string
  avatar: IGatsbyImageData
  category: string[]
}

const Wrapper = styled.div`
  padding: 20px 0;
`

const ProfileContainer = styled.div`
  display: flex;
  padding: 60px 0;
  gap: 20px;
`

const Avatar = styled.div`
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`

const Thumbnail = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
`

const ProfileDetail = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`

const Name = styled.p`
  font-size: 22px;
  font-weight: 700;
`

const Description = styled.p`
  font-size: 16px;
  color: #666;
  font-weight: 400;
`

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 60px 30px;
  border-top: 1px solid #ddd;
`

const Tag = styled.div`
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`

export default function PostProfile({
  name,
  role,
  description,
  avatar,
  category,
}: PostProfileProps) {
  return (
    <Wrapper>
      <ProfileContainer>
        <Avatar>
          <Thumbnail image={avatar} alt={'Avatar'} />
        </Avatar>
        <ProfileDetail>
          <div>
            <Name>{name}</Name>
            <p>{role}</p>
          </div>
          <div>
            <Description>{description}</Description>
          </div>
        </ProfileDetail>
      </ProfileContainer>
      {category.length > 0 && (
        <TagContainer>
          {category.map((tag, index) => {
            return <Tag key={index}>#{tag}</Tag>
          })}
        </TagContainer>
      )}
    </Wrapper>
  )
}
