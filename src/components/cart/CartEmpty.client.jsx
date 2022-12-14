import {useRef} from 'react';
import {useScroll} from 'react-use';
import {fetchSync} from '@shopify/hydrogen';
import {Button, Text, Heading, Skeleton} from '~/components';
import {Suspense} from 'react';

export function CartEmpty({onClose}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      className={`grid content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12 ${
        y > 0 && 'border-t'
      }`}
    >
      <section className="grid gap-6">
        <Text format>
          Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
          started!
        </Text>
        <div>
          <Button onClick={onClose}>Continue shopping</Button>
        </div>
      </section>
      <section className="grid gap-8 pt-4">
        <Heading format size="copy">
          Shop Best Sellers
        </Heading>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <Suspense fallback={<Loading />}>
            <TopProducts onClose={onClose} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function TopProducts({onClose}) {
  const products = fetchSync('/api/bestSellers').json();

  if (products.length === 0) {
    return <Text format>No products found.</Text>;
  }

  return (
    <>
      {products.map((product) => (
        <div>
          Product Card blm ada halamannya
        </div>
        // <ProductCard product={product} key={product.id} onClick={onClose} />
      ))}
    </>
  );
}

function Loading() {
  return (
    <>
      {[...new Array(4)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="grid gap-2">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="w-32 h-4" />
        </div>
      ))}
    </>
  );
}
