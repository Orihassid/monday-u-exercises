import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListItem from "./ListItem";
import{deleteItemAction} from '../../actions/itemsEntitiesActions'


const mapStateToProps = (state, ownProps) => {
    return {};
   
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        deleteItemAction
       
      },
      dispatch
    );
    }  
    export default connect(mapStateToProps, mapDispatchToProps)(ListItem);