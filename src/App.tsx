import React from "react";
import Header from "./components/header/header";
import Menu from "./components/content/menu/menu";
import Note from "./components/content/note/note";
import Tags from "./components/content/tags/tags";
import { Box, Grid } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} sx={{ display: "flex" }}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Tags />
        </Grid>

        <Grid
          container
          spacing={1}
          sx={{
            margin: "8px 12px 0",
            display: "flex",
            flexWrap: "nowrap",
            
          }}
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Grid item xs={12} sm={3}>
            <Menu />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Note />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
