import {Suspense} from 'react';

import {Link} from '@shopify/hydrogen/client';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';
// import {FeaturedCollections, Hero} from '~/components';
import {Layout} from '~/components/index.server';
import {Heroc, Herocontent, Heroimage} from '~/components';

export default function Homepage() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {heroBanners, featuredCollections, featuredProducts, featuredBlog} = data;
  const dataBlog = featuredBlog?.nodes[0]?.articles?.edges;
  // console.log('dataBlog', dataBlog)

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <section>
        <Heroimage batch={1} height={`760px`} imgSrc={`https://cdn.shopify.com/s/files/1/0352/5133/files/testament__hero-slide-1_500x.jpg?v=1614962123`} />
      </section>
      <section className="py-[50px] ">
        <div className="container mx-auto ">
            <div className="text-center text-[30px] font-[500] mb-[30px]">Shop by Collection</div>
            <Heroc data={heroBanners} group={`collection`} />
        </div>
      </section>
        <Herocontent />
      <section className="py-[50px]">
        <div className="container mx-auto">
          
          <div className="text-center text-[25px] font-[500] mb-[30px]">Newest Arrivals</div>
            <Heroc data={featuredProducts} group={`product`} />
        </div>
      </section>
      <section>
        <Heroimage height={`860px`} imgSrc={`https://cdn.shopify.com/s/files/1/0352/5133/files/testament__hero-block-1.jpg?v=1614965382`} />
      </section>
      <section className="py-[50px]">
        <div className="container mx-auto">
            <div className="text-center text-[30px] font-[500] mb-[30px]">From the Blog</div>
            <Heroc data={dataBlog} group={`blog`} />
        </div>
      </section>
    </Layout> 

    // <Layout>
    //   <Suspense>
    //     <SeoForHomepage />
    //   </Suspense>
    //   {primaryHero && (
    //     <Hero {...primaryHero} height="full" top loading="eager" />
    //   )}
    //   <ProductSwimlane
    //     data={featuredProducts.nodes}
    //     title="Featured Products"
    //     divider="bottom"
    //   />
    //   {secondaryHero && <Hero {...secondaryHero} />}
    //   <FeaturedCollections
    //     data={featuredCollections.nodes}
    //     title="Collections"
    //   />
    //   {tertiaryHero && <Hero {...tertiaryHero} />}
    // </Layout>
  );
}

// function SeoForHomepage() {
//   const {
//     data: {
//       shop: {title, description},
//     },
//   } = useShopQuery({
//     query: HOMEPAGE_SEO_QUERY,
//     cache: CacheLong(),
//     preload: true,
//   });

//   return (
//     <Seo
//       type="homepage"
//       data={{
//         title,
//         description,
//         titleTemplate: '%s · Powered by Hydrogen',
//       }}
//     />
//   );
// }

const HOMEPAGE_CONTENT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    heroBanners: collections(
      first: 3
      query: "collection_type:custom"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        handle
        title
        descriptionHtml
        image {
          altText
          width
          height
          url
        }
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }
    featuredCollections: collections(
      first: 3
      query: "collection_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 4) {
      nodes {
        ...ProductCard
      }
    }
    featuredBlog: blogs(first:6) {
      nodes {
        id
        title
        articles(first:3) {
          edges {
            node {
              id
              title
              handle
              publishedAt
              content
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

const HOMEPAGE_SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;
