import { ADD_GROUP, UPDATE_GROUP, DELETE_GROUP, SET_STATUSES } from "./actions";

const initialState = {
  groups: [{ from: 1, to: 10 }],
  statuses: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, { from: "", to: "" }],
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group, index) =>
          index === action.payload.index ? action.payload.group : group
        ),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((_, index) => index !== action.payload),
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
