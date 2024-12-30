import { HeadFC, HeadProps, PageProps, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import PostHead from '../components/post/PostHead'
import PostBody from '../components/post/PostBody'
import SEO from '../components/common/Seo'
import PostProfile from '../components/post/PostProfile'

export default function Post({
  data: { contentfulPost },
}: PageProps<Queries.PostPageQuery>) {
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
        content={contentfulPost?.content as Queries.ContentfulPostContent}
      />
      <PostProfile />
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
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 774)
            __typename
          }
        }
      }
      author {
        name
        role
        avatar {
          gatsbyImageData
        }
      }
    }
  }
`
