// import {useEffect, useRef} from 'react';
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
import {CardModif} from '~/components';

export function Hero({data,group}) {

    let secDinamic = 'sec'+group;

    let colsGrid = '';
    let hGrid = '';
    if(group === "collection") {
        colsGrid += '3' 
        hGrid += '400px' 
    } else if(group === "product") {
        colsGrid += '4' 
        hGrid += '400px' 
    } else {
        colsGrid += '3' 
        hGrid += '600px' 
    }

    // useEffect(() => {
        
    //     const paramX = group === 'product' ? -50 : 50;
        
    //     gsap.to(`.${secDinamic}`, { scrollTrigger: {
    //         trigger: `.${secDinamic}`,
    //         scrub: true,
    //     }, opacity: 1,  duration: 1.5});
    //     // }, opacity: 1, x:paramX, duration: 1.5});
    //     // }, opacity: 1, x: -50, duration: 1});
        
    // }, []);

    return (
    <div class={`grid grid-cols-${colsGrid} gap-4 h-[${hGrid}] bg-green-500 ml-[200px]`}>
        <CardModif  data={data} group={group} />
      </div>    
    )
}