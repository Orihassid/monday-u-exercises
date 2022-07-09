import actionTypes from "../actions/constants";

const initialState = {
  items:[],
};

const itemsEntitiesReducer = (state = initialState, action) => {


  switch (action.type) {
    case actionTypes.ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };

      case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: [...state.items.filter(item=>item.itemId!==action.payload)],
      };



    default:
      return state;
  }
};

export default itemsEntitiesReducer;