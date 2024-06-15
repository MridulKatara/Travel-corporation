import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupForm from "./GroupForm";
import {
  addGroup,
  updateGroup,
  deleteGroup,
  fetchStatuses,
} from "../redux/actions";

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const statuses = useSelector((state) => state.statuses);

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index} className="group-container">
          <GroupForm
            index={index}
            group={group}
            updateGroup={(index, group) => dispatch(updateGroup(index, group))}
            deleteGroup={(index) => dispatch(deleteGroup(index))}
          />
          {statuses && (
            <div className="statuses">
              <p>Status for Group {index + 1}:</p>
              <ul>
                {Array.from({ length: group.to - group.from + 1 }, (_, i) => (
                  <li key={i}>
                    Item {parseInt(group.from) + i}:{" "}
                    {statuses[parseInt(group.from) + i]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => dispatch(addGroup())}>Add Group</button>
      <button onClick={() => dispatch(fetchStatuses())}>Show Status</button>
    </div>
  );
};

export default GroupList;
