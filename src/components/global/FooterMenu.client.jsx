import {Link} from '@shopify/hydrogen/client';

export function FooterMenu({title,menu}) {

    const footer = menu?.footer;


    const colls = menu?.colls?.nodes;

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-4">
                <div>
                    <div className="font-bold">
                        {title}
                    </div>
                </div>
                <div>
                    <div className="font-bold mb-2">
                        Shop
                    </div>
                    {colls.map((item)=> {
                        return (
                            <Link to={`collections/${item.handle}`}>
                                <div>
                                    {item.title}
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div>
                    <div className="font-bold mb-2"> 
                        Info
                    </div>
                    {footer.items.map((item) => {
                        
                        return (
                            <Link to={item.to}>
                                <div>
                                    {item.title}
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div>
                    <div className="font-bold"  >
                        Connect
                    </div>
                </div>
            </div>
        </div>
    )
}