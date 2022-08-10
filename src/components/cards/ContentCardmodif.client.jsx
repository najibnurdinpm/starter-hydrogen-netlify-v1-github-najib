import {useEffect, useRef} from 'react';
import { gsap, TimelineLite, Power3 } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);
import {Link} from '@shopify/hydrogen/client';

export function ContentCardmodif({data,group}) {

    return (
        <div className={`h-[90%] w-[90%]` }>
             <CardCollection data={data} group={group} />
        </div>
    )
}

function CardCollection({data, group}) {

    const boxRef = useRef();
    
    useEffect(() => {
        
        gsap.fromTo(".imgCollection", 
            {
                opacity: 0
            }, {
                opacity: 1,
                duration: 1,
                // stagger: 0.9    
            }    
        );

        gsap.fromTo(".titleCollection", 
            {
                opacity: 0
            }, {
                opacity: 1,
                duration: 3,
                // stagger: 0.9
            }    
        );
    }, []);

    let slugCard = "";
    if(group != "blog") {
        group === 'collection' ? slugCard += 'collections' : slugCard += 'products'
    } else if(group === 'blog' ){
        slugCard += 'blogs'
    }

    const concatSlug = slugCard.concat("/"+data.handle);
    return (
        <>
        <Link to={concatSlug}>
            <div className={`imgCollection bg-[#fff] mb-[5px] opacity-0 ${group === 'collection' ? 'h-[80%]' : 'h-[70%]' } w-full cardContent `} >
                <div className="w-full h-full">
                    {group === 'collection' && (
                        <img className="h-full w-full imgGlobal" src={data.image.url} alt=""/>
                    )}
                    {group === 'product' && (
                        <img className="h-full w-full" src={data?.variants?.nodes[0]?.image?.url} alt=""/>
                    )}
                    {group === 'blog' && (
                        <img className="h-full w-full" src={data?.image?.url} alt=""/>
                    )}
                </div>
            </div>
            <div className={`titleCollection opacity-0 bg-[#fff] ${group === 'collection' ? 'h-[20%]' : 'h-[30%]' } w-full`}>
                    {group === 'collection' && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-[20px] font-bold">
                                {data.title}
                            </div>
                        </div>
                    )}
                    {group === 'product' && (
                        <div className="p-2">
                            <div>{data.title}</div>
                            <div>{data?.variants?.nodes[0]?.priceV2?.currencyCode} {data?.variants?.nodes[0]?.priceV2?.amount}</div>
                        </div>
                    )}
                    {group === 'blog' && (
                        <div className="p-2">
                            <div className="mb-[10px]">
                                <div className="text-[25px]">{data.title}</div>
                                <div>Posted on {data.publishedAt.split("T")[0]}</div>
                            </div>
                            {/* <div>
                                <div className="text-[14px]">{data.content.length > 150 ? data.content.slice(0,150).concat(' . . .') : data.content}</div>
                            </div> */}
                        </div>
                    )}
            </div>
        </Link>
        </>
    )
}

