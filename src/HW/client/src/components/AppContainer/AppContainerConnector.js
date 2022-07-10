import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppContainer from "./AppContainer";
import { getItemsAction } from "../../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      getItemsAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
