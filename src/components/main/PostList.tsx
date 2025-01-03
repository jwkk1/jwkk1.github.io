import styled from 'styled-components'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import PostItem from './PostItem'
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid'
import { useEffect, useState } from 'react'

type PostListProps = {
  posts: Queries.IndexPageQuery['allContentfulPost']['nodes']
}

const Wrapper = styled(MasonryInfiniteGrid)`
  margin-top: 0;
`

function getInitialPosts(posts: PostListProps['posts']) {
  return posts.slice(0, 10).map(post => ({ groupKey: 0, post }))
}

export default function PostList({ posts }: PostListProps) {
  const [items, setItems] = useState(
    posts.slice(0, 10).map(post => ({ post, groupKey: 0 })),
  )

  const handleLoadPosts = (nextGroupKey: number) => {
    const nextPosts = posts
      .slice(nextGroupKey * 10, (nextGroupKey + 1) * 10)
      .map(post => ({ groupKey: nextGroupKey, post }))

    setItems(prev => [...prev, ...nextPosts])
  }

  useEffect(() => {
    setItems(getInitialPosts(posts))
  }, [posts])

  return (
    <Wrapper
      gap={{ horizontal: 20, vertical: 30 }}
      onRequestAppend={({ groupKey }: { groupKey: number }) => {
        const nextGroupKey = parseInt(groupKey?.toString() ?? '0') + 1
        if (posts.length <= nextGroupKey * 10) return
        handleLoadPosts(nextGroupKey)
      }}
    >
      {items.map(
        ({
          post: { title, category, slug, date, thumbnail, description },
          groupKey,
        }) => (
          <PostItem
            title={title as string}
            date={date as string}
            category={category as string[]}
            thumbnail={thumbnail?.gatsbyImageData as IGatsbyImageData}
            description={description?.description as string}
            slug={slug as string}
            key={slug}
            data-grid-groupkey={groupKey}
          />
        ),
      )}
      {items.length < 3 ? <div /> : null}
    </Wrapper>
  )
}
