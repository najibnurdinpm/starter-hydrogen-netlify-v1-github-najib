import {useEffect, useRef} from 'react';
// import { gsap } from "gsap";
import { gsap, TimelineLite, Power3 } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);

import {Link} from '@shopify/hydrogen/client';
export function Herocontent() {

    const boxRef = useRef();

    useEffect(() => {
      
      gsap.to(".sec-heroContent", {
        scrollTrigger: {
          trigger: ".sec-heroContent",
          start: "top center",
          ent : "top 100px",
          scrub: true,
        },
        opacity:1,
        duration: 3
      })
    }, []);

    return (
        
      <section className=" bg-[#FFDAB9]" ref={boxRef}>
      <div className="sec-heroContent container mx-auto opacity-0">
          <div className="cont-heroContent h-[300px] w-full">
              <div className="flex items-center justify-center h-full">
                  <div className="max-w-[230px] text-[50px] font-[400] text-[#00000f] leading-[50px]">
                    FALL SALE NOW ON
                  </div>
                  <div className=" w-[1px] h-[30%] bg-[#BC8F8F]">
                    
                  </div>
                  <div className="ml-[20px] max-w-[400px] ">
                    <div className="mb-[25px] leading-7">
                      Take 50% off a range of goods in our end of season sale. 
                      All sales final - ends soon!
                    </div>
                    <div>
                      <Link to={`/collections`}>
                        <button className="border border-[#00000f] px-8 py-2 rounded-md">
                          shop sale
                        </button>
                      </Link>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    )
}