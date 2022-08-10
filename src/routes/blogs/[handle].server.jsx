import {Suspense} from 'react';
import {Link} from '@shopify/hydrogen/client';
import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
  useRouteParams
} from '@shopify/hydrogen';
import {Layout} from '~/components/index.server';
export default function Blog({params}) {
    
    const {handle} = params

    const {data} = useShopQuery({
        query: QUERY,
        variables: {
            handle,
          },
        preload: true,
    });

    const {blog, featuredBlog} = data
    
    const blogContent = data?.blog.articleByHandle;
    const listBlog = featuredBlog.nodes[0].articles

    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <div class="flex">
                        <div className="w-[70%]">
                            <div className="w-full h-[400px] mb-[20px]">
                                <img className="w-full h-full" src={blogContent.image.url} alt=""/>
                            </div>
                            <div>
                                {blogContent.content}
                            </div>
                        </div>
                        <div className="ml-[5%] w-[20%] ">
                            {listBlog.edges.map(item => {
                                return (
                                    <Link to={`blogs/${item.node.handle}`}>
                                        <div className={`flex mb-[10px] ${handle === item.node.handle ? `` : `bg-[#f0f0f0]` }  py-[10px]`}>
                                            <div className="mx-auto">
                                                <img className="w-[80px] h-[50px]" src={item.node.image.url} alt=""/>
                                            </div>
                                            <div className="mr-auto">
                                                {item.node.title}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

const QUERY = gql`
  query Blogs(
    $handle: String!,
  ){
    blog(handle: "news") {
        articleByHandle(handle: $handle) {
        id
        title
        image {
            id
            url
            altText
            width
            height
        }
        content
        }
    } featuredBlog: blogs(first:6) {
      nodes {
        id
        title
        articles(first:100) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              image {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;