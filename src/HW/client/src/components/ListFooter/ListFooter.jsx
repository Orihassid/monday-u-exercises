
import "./ListFooter.css"
import PropTypes from 'prop-types';
const ListFooter = ({numOfTasks,clearAllFromDb})=>{

   

    return (
        <footer>
           {numOfTasks>0 && <p  className="count"> Item(s):{numOfTasks} </p>}
            <button onClick={clearAllFromDb} className="clearAllBtn">Clear All</button>
          </footer>
    )
}
ListFooter.propTypes={
    numOfTasks:PropTypes.number,
    clearAllFromDb:PropTypes.func

}


export default ListFooter