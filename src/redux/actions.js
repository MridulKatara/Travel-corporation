export const ADD_GROUP = 'ADD_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SET_STATUSES = 'SET_STATUSES';
export const RESET_STATUSES = 'RESET_STATUSES';

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

export const fetchStatuses = () => (dispatch, getState) => {
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
    alert('Groups are invalid');
    return;
  }

  let newStatuses = {};
  for (let group of groups) {
    for (let i = group.from; i <= group.to; i++) {
      newStatuses[i] = Math.random() < 0.5;
    }
  }

  dispatch(setStatuses(newStatuses));
};
