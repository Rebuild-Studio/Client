import { Grid } from "@mui/material";
import React from "react";
import useStore from "../../stores/useStore";

const SearchedProjectList = ({ handleClickMenuCustom, ProjectListItem }) => {
  const { user_store } = useStore();
  return user_store.my_project_search_list.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
      <ProjectListItem
        item={item}
        handleClickMenuCustom={handleClickMenuCustom}
      />
    </Grid>
  ));
};

export default SearchedProjectList 