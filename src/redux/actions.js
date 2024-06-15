import {
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  SET_STATUSES,
  RESET_STATUSES,
} from "./actionType";
import axios from "axios";

export const addGroup = () => ({
  type: ADD_GROUP,
});

export const updateGroup = (index, group) => ({
  type: UPDATE_GROUP,
  payload: { index, group },
});

export const deleteGroup = (index) => ({
  type: DELETE_GROUP,
  payload: index,
});

export const setStatuses = (statuses) => ({
  type: SET_STATUSES,
  payload: statuses,
});

export const resetStatuses = () => ({
  type: RESET_STATUSES,
});

export const fetchStatuses = () => async (dispatch, getState) => {
  const { groups } = getState();

  const validateGroups = () => {
    let covered = new Set();
    for (let group of groups) {
      for (let i = group.from; i <= group.to; i++) {
        if (covered.has(i)) return false;
        covered.add(i);
      }
    }
    for (let i = 1; i <= 10; i++) {
      if (!covered.has(i)) return false;
    }
    return true;
  };

  if (!validateGroups()) {
    alert("Groups are invalid");
    return;
  }

  try {
    let newStatuses = {};
    for (let group of groups) {
      for (let i = group.from; i <= group.to; i++) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${i}`
        );
        console.log(`Fetched data for todo item ${i}:`, response.data); 
        newStatuses[i] = response.data.completed;
      }
    }
    console.log("Final statuses:", newStatuses);
    dispatch(setStatuses(newStatuses));
  } catch (error) {
    console.error("Error fetching statuses:", error);
  }
};
