// src/redux/reducers.js

import {
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  SET_STATUSES,
  RESET_STATUSES,
} from "./actionType";

const initialState = {
  groups: [],
  statuses: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      if (state.groups.length >= 10) return state; // Limit to 10 items
      return {
        ...state,
        groups: [...state.groups, { from: "", to: "" }],
        statuses: null,
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group, index) =>
          index === action.payload.index ? action.payload.group : group
        ),
        statuses: null,
      };
    case DELETE_GROUP:
      const updatedGroups = state.groups.filter(
        (_, index) => index !== action.payload
      );
      return {
        ...state,
        groups: updatedGroups,
        statuses: updatedGroups.length > 0 ? state.statuses : null,
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    case RESET_STATUSES:
      return {
        ...state,
        statuses: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
