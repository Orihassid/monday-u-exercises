
import "./ListFooter.css"

const ListFooter = ({numOfTasks,clearAllFromDb})=>{

   

    return (
        <footer>
           {numOfTasks>0 && <p  className="count"> Item(s):{numOfTasks} </p>}
            <button onClick={clearAllFromDb} className="clearAllBtn">Clear All</button>
          </footer>
    )
}
export default ListFooter