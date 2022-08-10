import {useShopQuery, useLocalization, gql, Seo} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {Layout} from '~/components/index.server';
import {CardModif} from '~/components';

export default function Collections() {

    const {
        language: {isoCode: languageCode},
        country: {isoCode: countryCode},
      } = useLocalization();

      const {data} = useShopQuery({
        query: COLLECTIONS_QUERY,
        variables: {
          pageBy: 100,
          country: countryCode,
          language: languageCode,
        },
        preload: true,
      });

      const allColls = data?.collections;

      console.log('allColls', allColls.length)


    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-4" >
                        <CardModif data={allColls} group={`collection`} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}


const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
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
      }
    }
  }
`;