import {useEffect, useRef, useState, useLayoutEffect} from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

import {
    ProductForm,
    ProductDetail,
  } from '~/components';

export function ContentProdDet({title, vendor, description, shippingPolicy, refundPolicy}) {

    useEffect(() => {
        
        gsap.fromTo(".titleProdDet", 
            {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                stagger: 0.9
            }    
        );

        gsap.fromTo(".vendorProdDet", 
            {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                stagger: 0.9
            }    
        );

        gsap.fromTo(".prodFormProdDet", 
            {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 1,
                stagger: 0.9
            }    
        );

        gsap.fromTo(".descProdDet", 
            {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 1,
                stagger: 0.9
            }    
        );

    }, []);

    return (
        <div>
            <div className="titleProdDet opacity-0 text-[40px] font-bold mb-[20px]">
                {title}
            </div>
            <div className="vendorProdDet opacity-0 mb-[60px]">
                {vendor}
            </div>
            <div className="prodFormProdDet opacity-0 mb-[20px]">
                <ProductForm />
            </div>
            <div className="descProdDet">
                <div className="grid gap-4 py-4">
                    {description && (
                        <ProductDetail
                        title="Product Details"
                        content={description}
                        />
                    )}
                    {shippingPolicy?.body && (
                        <ProductDetail
                        title="Shipping"
                        content={getExcerpt(shippingPolicy.body)}
                        learnMore={`/policies/${shippingPolicy.handle}`}
                        />
                    )}
                    {refundPolicy?.body && (
                        <ProductDetail
                        title="Returns"
                        content={getExcerpt(refundPolicy.body)}
                        learnMore={`/policies/${refundPolicy.handle}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )

}