import {Suspense} from 'react';
import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import { ProductGrid, Section, Text} from '~/components';
import {Layout} from '~/components/index.server';
import {CardModif} from '~/components';

const pageBy = 48;

export default function Collection({params}) {

    const {handle} = params;
    const {
        language: {isoCode: language},
        country: {isoCode: country},
    } = useLocalization();

    const {
        data: {collection},
      } = useShopQuery({
        query: COLLECTION_QUERY,
        variables: {
          handle,
          language,
          country,
          pageBy,
        },
        preload: true,
      });
      const {id, title, description, seo, image, products} = collection;

      console.log('title', title)
  
    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    {/* Collection {handle} */}
                    <div className="mb-[40px]">
                        <div className="text-[40px] font-[500]">
                            {title}
                        </div>
                        <div>
                            {description}
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 h-[400px]">
                        <CardModif data={products} group={`product`} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}


const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;