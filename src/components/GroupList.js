import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupForm from "./GroupForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addGroup, updateGroup, deleteGroup, fetchStatuses } from "../redux/actions";

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const statuses = useSelector((state) => state.statuses);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (groups.length === 0 && statuses === null) {
      dispatch(addGroup());
      dispatch(updateGroup(0, { from: 1, to: 2 }));
      dispatch(addGroup());
      dispatch(updateGroup(1, { from: 3, to: 10 }));
    }
  }, [dispatch, groups.length, statuses]);

  const handleAddGroup = () => {
    if (groups.length >= 10) {
      alert("You can only add up to 10 items in total.");
      return;
    }
    dispatch(addGroup());
  };

  const handleShowStatus = () => {
    setLoading(true);
    dispatch(fetchStatuses()).finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>Todo Group Status</h1>
      {groups.map((group, index) => (
        <div key={index} className="group-container">
          <GroupForm
            index={index}
            group={group}
            updateGroup={(index, group) => dispatch(updateGroup(index, group))}
            deleteGroup={(index) => dispatch(deleteGroup(index))}
          />
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            statuses && (
              <div className="statuses">
                {Array.from({ length: group.to - group.from + 1 }, (_, i) => (
                  <span key={i}>
                    ({group.from + i}){" "}
                    {statuses[group.from + i] ? "True" : "False"}
                    {i !== group.to - group.from ? ", " : " "}
                  </span>
                ))}
                <span className="green-tick">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              </div>
            )
          )}
        </div>
      ))}
      <div className="buttons">
        <button onClick={handleAddGroup}>Add Group</button>
        <button onClick={handleShowStatus}>Show Status</button>
      </div>
    </div>
  );
};

export default GroupList;
