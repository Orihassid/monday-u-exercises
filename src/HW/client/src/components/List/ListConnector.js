import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import List from "./List";
import { getItems } from "../../selectors/itemsEntitiesSelectors";


const mapStateToProps = (state, ownProps) => {
    const items = getItems(state)

    return {items };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
       
      },
      dispatch
    );
    }  


    export default connect(mapStateToProps, mapDispatchToProps)(List);

