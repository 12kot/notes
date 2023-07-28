import React, { ReactElement } from "react";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { handleSortTags } from "../../../store/slices/appSlice";

const Tags = (props: { tags: string[] }) => {
  const dispatch = useAppDispatch();
  const sortTags = useAppSelector((state) => state.app.sortTags);

  const handleSort = (tag: string): void => {
    dispatch(handleSortTags({ tag: tag }));
  };

  const getSearchTags = (): ReactElement[] => {
    return sortTags.map((tag) => (
      <button style={{backgroundColor: "yellow"}} onClick={() => handleSort(tag)} key={v4()}>
        {tag}
      </button>
    ));
  };

  const getOthersTags = (): ReactElement[] => {
    return props.tags
      .filter((tag) => !sortTags.includes(tag))
      .map((tag) => (
        <button onClick={() => handleSort(tag)} key={v4()}>
          {tag}
        </button>
      ));
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {getSearchTags()} {getOthersTags()}
    </div>
  );
};

export default Tags;
