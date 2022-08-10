import {ContentCardmodif} from '~/components';

export function CardModif({data,group}) {

    
    if(group != 'blog') {
        return (
            data.nodes.map((item) => {
                return <div className={`flex items-center justify-center h-full`}>
                    <ContentCardmodif data={item} group={group} />
                </div>
            })
        )
    } else {
        return data.map((items) => {
            return <div className={`flex items-center justify-center h-full`}>                    
                    <ContentCardmodif data={items.node} group={group} />s
            </div>
        })
    }

    
}
