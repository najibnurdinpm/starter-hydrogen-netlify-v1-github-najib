import {useEffect, useRef} from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {CardModif} from '~/components';

export function Heroc({data,group}) {

    let secDinamic = 'sec'+group;

    let colsGrid = '';
    let hGrid = '';
    if(group === "collection") {
        colsGrid += 'grid-cols-3'
        hGrid += '400px' 
    } else if(group === "product") {
        colsGrid += 'grid-cols-4'
        hGrid += '400px' 
    } else {
        colsGrid += 'grid-cols-3'
        hGrid += '400px' 
    }

    
    console.log('colsGrid', colsGrid)
    useEffect(() => {
        
        const paramX = group === 'product' ? -100 : 100;
        gsap.to(`.${secDinamic}`, { scrollTrigger: {
            trigger: `.${secDinamic}`,
            scrub: true,
        }, opacity: 1, x: paramX, duration: 3});
        
    }, []);

    return (
            <div class={` grid ${colsGrid} h-[${hGrid}]  ${group === 'product' ? 'ml-[100px]' : 'ml-[-100px]'} ${secDinamic} opacity-0`}>
                <CardModif  data={data} group={group} />
            </div>
    //   <div className="grid grid-cols-4 gap-4 h-[600px]">
    //     <CardModif  data={data} group={group} />
    //   </div>
    )
}