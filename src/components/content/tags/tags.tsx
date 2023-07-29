import React, { ReactElement } from "react";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { handleSortTags } from "../../../store/slices/appSlice";
import {Button, Stack } from "@mui/material";
import styles from "./tags.module.scss"

const Tags = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { sortTags, tags } = useAppSelector((state) => state.app);

  const handleSort = (tag: string): void => {
    dispatch(handleSortTags({ tag: tag }));
  };

  const _getButton = (tag: string): ReactElement => {
    const isActive = sortTags.includes(tag.toLowerCase());

    return (
      <Button
        className={styles.item}
        onClick={() => handleSort(tag)}
        key={v4()}
        sx={{
          backgroundColor: isActive ? "#e3f2fd" : "",
          "&:hover": {
            background: isActive ? "#c8e4fb" : "",
          },
          overflow: "hidden"
        }}
      >
        {tag}
      </Button>
    );
  };

  const getSearchTags = (): ReactElement[] => {
    return sortTags.map((tag) => _getButton(tag));
  };

  const getOthersTags = (): ReactElement[] => {
    return tags
      .filter((tag) => !sortTags.includes(tag))
      .map((tag) => _getButton(tag));
  };

  return (
    <Stack spacing={1} direction="row" useFlexGap className={styles.scroll}>
      {[getSearchTags(), getOthersTags()]}
    </Stack>
  );
};

export default Tags;
