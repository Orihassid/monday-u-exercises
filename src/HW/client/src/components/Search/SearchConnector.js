import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Search from "./Search";
import {
  getSearchInput,
} from "../../redux/selectors/itemsEntitiesSelectors";
import { updateSearchInputAction } from "../../redux/actions/itemsEntitiesActions";
const mapStateToProps = (state, ownProps) => {
  const searchInputValue = getSearchInput(state);
  return { searchInputValue };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      updateSearchInputAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
