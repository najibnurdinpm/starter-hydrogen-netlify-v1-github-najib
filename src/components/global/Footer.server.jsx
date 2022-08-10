import {useUrl} from '@shopify/hydrogen';

import {FooterMenu} from '~/components';

export function Footer({title,menu}) {
    
    return (
        <section className="py-[50px] bg-[#000] text-white">
            <FooterMenu title={title} menu={menu} />
        </section>
    )
}