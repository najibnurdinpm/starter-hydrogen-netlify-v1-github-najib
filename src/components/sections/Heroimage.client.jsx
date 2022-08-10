import {useEffect, useRef, useState, useLayoutEffect} from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
export function Heroimage({batch, height, imgSrc}) {

    const boxRef = useRef();
    
    useEffect(() => {
        // const url = window.location.href;
        const url = new URL(window.location.href)
        console.log(url.search); 

        if(batch === 1) {
            gsap.fromTo(boxRef.current, 
                {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.9
                }    
            );
        } else {
            gsap.to(boxRef.current, { scrollTrigger: {
                trigger: boxRef.current,
                scrub: true,
            }, opacity: 1, x: -100, duration: 1});
            // if(url.search) {
            // }
        }
    }, []);

    return (
        <div id="thirdCircle" className={`h-[${height}] w-full opacity-0  ${batch !== 1 ? `mx-[100px]` : `` }`} ref={boxRef}>
          <img className="h-full w-full" src={`${imgSrc}`} alt=""/>
        </div> 
    )
}