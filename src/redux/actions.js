import { getTodoItem } from "../api/todoApi";

export const ADD_GROUP = "ADD_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const SET_STATUSES = "SET_STATUSES";

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

export const fetchStatuses = () => async (dispatch, getState) => {
  const { groups } = getState();

  const validateGroups = () => {
    let covered = new Set();
    for (let group of groups) {
      for (let i = parseInt(group.from); i <= parseInt(group.to); i++) {
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

  let newStatuses = {};
  for (let group of groups) {
    for (let i = parseInt(group.from); i <= parseInt(group.to); i++) {
      try {
        const todo = await getTodoItem(i);
        console.log(`Fetched todo item ${i}:`, todo);
        newStatuses[i] = todo.completed ? "completed" : "not completed";
      } catch (error) {
        console.error(`Failed to fetch todo item ${i}: ${error.message}`);
        newStatuses[i] = "error";
      }
    }
  }

  dispatch(setStatuses(newStatuses));
};
