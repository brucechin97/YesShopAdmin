import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, useTheme } from "@mui/material";

const HighlightBox = ({
  highlightName,
  highlightCount,
  highlightBG,
  highlightColor,
  highlightIcon,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
      item
      // height={"17.5vh"}
      xs={6}
      sm={4}
      md={4}
      lg={4}
      xl={4}
    >
      <Box
        sx={{
          background: colors.grey[900],
          borderRadius: "12px",
          padding: "10px",
          border: "1px solid" + colors.grey[600],
        }}
      >
        <Grid container direction={"row"}>
          <Grid item xs={9.5} sm={10} md={10} lg={10.5}>
            <Grid container direction={"column"}>
              <Grid
                item
                sx={{
                  margin: "5px 0 5px 20px",
                  padding: "0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {highlightName}
              </Grid>

              <Grid
                item
                sx={{
                  margin: "5px 0 5px 20px",
                  fontSize: "36px",
                  fontWeight: "800",
                }}
              >
                {highlightCount}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2.5} sm={2} md={2} lg={1.5}>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              sx={{
                // backgroundColor: {highlightColor},
                height: "100%",
                borderRadius: "8px",
                color: colors.greenAccent[900],
              }}
              backgroundColor={highlightBG}
              color={highlightColor}
              //   mx={"auto"}
            >
              <Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img src={highlightIcon} width={24} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default HighlightBox;
