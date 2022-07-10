import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "./Search";
import { getItems,getSearchInput } from "../../redux/selectors/itemsEntitiesSelectors";
import {updateSearchInputAction} from "../../redux/actions/itemsEntitiesActions"
const mapStateToProps = (state, ownProps) => {
  const items = getItems(state);
  const searchInputValue = getSearchInput(state)

  return { items,searchInputValue };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    updateSearchInputAction
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
