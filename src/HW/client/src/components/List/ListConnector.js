import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import List from "./List";
import{showLoaderAction} from '../../actions/itemsViewsActions'
import{addItemsAction} from '../../actions/itemsEntitiesActions'
import { getItems } from "../../selectors/itemsEntitiesSelectors";
import { getShowLoader } from "../../selectors/itemsViewSelectors";

const mapStateToProps = (state, ownProps) => {
    const items = getItems(state)

    return { showLoader,items };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        showLoaderAction,addItemsAction,
      },
      dispatch
    );
    }  


    export default connect(mapStateToProps, mapDispatchToProps)(List);

