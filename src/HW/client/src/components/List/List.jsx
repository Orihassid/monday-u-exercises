
import ListItem from "../ListItem/ListItem.jsx"
const List = ({items,deleteItemFromTodoList}) =>
{
    console.log(items)
    return <div>
        {items.map((item)=>{
            return (<ListItem 
            item ={item} deleteItemFromTodoList = {deleteItemFromTodoList}/>)

        })}


        </div>
}
export default List;