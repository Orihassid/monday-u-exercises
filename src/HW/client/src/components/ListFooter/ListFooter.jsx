
import "./ListFooter.css"
import PropTypes from 'prop-types';
const ListFooter = ({numOfItems,clearAllItemsAction})=>{


    const handleClearAllClick = async () => {
        
        await clearAllItemsAction();
      };

    return (
        <footer>
           {numOfItems>0 && <p  className="count"> Item(s): {numOfItems} </p>}
            <button onClick={handleClearAllClick} className="clearAllBtn">Clear All</button>
          </footer>
    )
}
ListFooter.propTypes={
    numOfItems:PropTypes.number,
    clearAllItemsAction:PropTypes.func

}


export default ListFooter