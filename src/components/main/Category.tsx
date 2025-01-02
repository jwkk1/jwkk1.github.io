import styled from 'styled-components'

type CategoryProps = {
  categories: Record<string, number>
  selectedCategory: string
  handleSelect: (category: string) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  margin: 64px 0;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`

const Item = styled.div<{ $selected: boolean }>`
  font-size: 18px;
  line-height: 1.25;
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
  color: ${({ $selected }) => ($selected ? '#8DA6FF' : '#000000')};
  cursor: ${({ $selected }) => ($selected ? 'default' : 'pointer')};

  padding: 10px 14px;
  border-radius: 999px;
  background-color: ${({ $selected }) => ($selected ? '#000000' : '#EFEFEF')};

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 8px 12px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`

const CategoryTitle = styled.h3`
  font-size: 40px;
  line-height: 1.25;
  font-weight: 600;
  color: #000000;

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

export default function Category({
  categories,
  selectedCategory,
  handleSelect,
}: CategoryProps) {
  return (
    <Wrapper>
      <CategoryTitle>총 24개의 게시글</CategoryTitle>
      <CategoryContainer>
        {Object.entries(categories).map(([category, count]) => (
          <Item
            onClick={() => handleSelect(category)}
            key={category}
            $selected={category === selectedCategory}
          >
            {category === selectedCategory
              ? `#${category}(${count})`
              : `#${category}`}
          </Item>
        ))}
      </CategoryContainer>
    </Wrapper>
  )
}
