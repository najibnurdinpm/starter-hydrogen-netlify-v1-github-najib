import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {Layout} from '~/components/index.server';
import {Himage, ContentProdDet} from '~/components';
// import {CartDrawer} '../../components/global/CartDrawer.client';
// import {useDrawer} '../../components/global/Drawer.client';
// import {CartDrawer} from './CartDrawer.client';

import {
    ProductForm,
    ProductDetail,
  } from '~/components';

export default function Product() {
    const {handle} = useRouteParams();
    const {
        language: {isoCode: languageCode},
        country: {isoCode: countryCode},
      } = useLocalization();

      const {
        data: {product, shop},
      } = useShopQuery({
        query: PRODUCT_QUERY,
        variables: {
            country: countryCode,
            language: languageCode,
            handle,
        },
        preload: true,
      });

      const {media, title, vendor, description, id} = product;
      const {shippingPolicy, refundPolicy} = shop;

      const imageOne = media?.nodes[0]?.image?.url;
      
      
    return (
        <Layout>
            {/* <CartDrawer isOpen={isCartOpen} onClose={closeCart} /> */}
            <Suspense>
                <Seo type="product" data={product} />
            </Suspense>
            <ProductOptionsProvider data={product}>
                <section>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 gap-4 h-[550px] ">
                            <div className="flex items-center justify-center h-full bg-orange-200">
                                <div className="h-[95%] w-[95%]">
                                    <Himage height={`70%`} imgSrc={imageOne} />
                                    <div className="h-[30%]  bg-orange-400">
                                    
                                    </div>
                                </div>
                            </div>
                            <div>
                              <ContentProdDet title={title} vendor={vendor} description={description} shippingPolicy={shippingPolicy} refundPolicy={refundPolicy} />
                            </div>
                        </div>
                    </div>
                </section>
            </ProductOptionsProvider>
        </Layout>
    )
}


const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      description
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;