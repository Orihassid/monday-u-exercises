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
      case actionTypes.EDIT_ITEM_TO_NEW_NAME:
        return {
          ...state,
          items: state.items.map((item) =>
            item.itemId === action.itemId
              ? { ...item, itemName: action.payload }
              : item
          ),
        };
        case actionTypes.UPDATE_CHECKBOX:
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === action.itemId
            ? { ...item, status: action.payload }
            : item
        ),
      };




    default:
      return state;
  }
};

export default itemsEntitiesReducer;