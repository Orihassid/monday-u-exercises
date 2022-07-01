
import ListItem from "../ListItem/ListItem.jsx"
const List = ({items}) =>
{
    console.log(items)
    return <div>
        {items.map((item)=>{
            return (<ListItem 
            item ={item}/>)

        })}


        </div>
}
export default List;