import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListItem from "./ListItem";
import{deleteItemAction,editItemNameAction,updateCheckBoxAction} from '../../redux/actions/itemsEntitiesActions'

const mapStateToProps = (state, ownProps) => {
     
    return {};
   
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        deleteItemAction,editItemNameAction,updateCheckBoxAction
       
      },
      dispatch
    );
    }  
    export default connect(mapStateToProps, mapDispatchToProps)(ListItem);