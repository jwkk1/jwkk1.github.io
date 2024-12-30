import { HeadFC, HeadProps, PageProps, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import PostHead from '../components/post/PostHead'
import PostBody from '../components/post/PostBody'
import SEO from '../components/common/Seo'
import PostProfile from '../components/post/PostProfile'

export default function Post({
  data: { contentfulPost },
}: PageProps<Queries.PostPageQuery>) {
  console.log(contentfulPost)
  return (
    <>
      <PostHead
        title={contentfulPost?.title as string}
        category={contentfulPost?.category as string[]}
        date={contentfulPost?.date as string}
        thumbnail={
          contentfulPost?.thumbnail?.gatsbyImageData as IGatsbyImageData
        }
      />
      <PostBody
        content={contentfulPost?.content?.content as string} // contents 필드 사용
      />
      <PostProfile
        name={contentfulPost?.author?.name as string}
        role={contentfulPost?.author?.role as string}
        description={contentfulPost?.author?.description?.description as string}
        avatar={
          contentfulPost?.author?.avatar?.gatsbyImageData as IGatsbyImageData
        }
        category={contentfulPost?.category as string[]}
      />
    </>
  )
}

export const Head: HeadFC<Queries.PostPageQuery> = ({
  data: { contentfulPost },
}: HeadProps<Queries.PostPageQuery>) => {
  return (
    <SEO
      title={contentfulPost?.title as string}
      description={contentfulPost?.description?.description as string}
      pathname={`/${contentfulPost?.slug}`}
      image={contentfulPost?.thumbnail?.url as string}
    />
  )
}

export const query = graphql`
  query PostPage($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      thumbnail {
        url
        gatsbyImageData(width: 1000)
      }
      category
      date
      slug
      description {
        description
      }
      content {
        content
      }
      author {
        name
        role
        description {
          description
        }
        avatar {
          gatsbyImageData
        }
      }
    }
  }
`
