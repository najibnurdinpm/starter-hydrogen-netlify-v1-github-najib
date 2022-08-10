import {
    useLocalization,
    useShopQuery,
    Seo,
    useServerAnalytics,
    ShopifyAnalyticsConstants,
    gql,
  } from '@shopify/hydrogen';
  import {Suspense} from 'react';
import {Layout} from '~/components/index.server';

export default function Page({params}) {

    const {
        language: {isoCode: languageCode},
      } = useLocalization();

    const {handle} = params

    const {
        data: {page},
      } = useShopQuery({
        query: PAGE_QUERY,
        variables: {languageCode, handle},
      });

      console.log('page', page)
    
    return (
        <Layout>
            <section>
                <div className="container mx-auto">
                    <div className="text-[30px] mb-[20px]">
                        {page.title}
                    </div>
                    <div className="text-[20px] max-w-[50%]">
                        {page.body}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode, $handle: String!)
  @inContext(language: $languageCode) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;