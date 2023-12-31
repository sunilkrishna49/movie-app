import React from "react";

export const SearchBox = (props) => {
  return (
    <div className="col col-sm-4" style={{ marginLeft: -320 }}>
      <input
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search"
      ></input>
    </div>
  );
};
