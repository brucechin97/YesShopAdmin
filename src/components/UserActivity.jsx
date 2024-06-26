import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const UserActivityInfo = ({ sectionHeading, sectionIcon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
    <Grid 
    container
    direction={"column"}
    mt={3}
    p={3}
    xs={12}
    mb={20}
    sx={{
      background: colors.grey[900],
      borderRadius: "12px",
    }}
  >
      <Grid container fontSize={20} fontWeight={700}>
        <Grid item xs={6}>Activity</Grid>
        <Grid item xs={6}>Date / Time </Grid>

      </Grid>
      
      <Grid container direction={"row"} mt={2} spacing={2} alignItems={"center"}>
        <Grid item>
          <Avatar sx={{ bgcolor: colors.grey[900], color: colors.grey[100], border: "1px solid #888888",  }}>SY</Avatar>
        </Grid>
        <Grid item spacing={3}>
          <Grid container direction={"row"} alignItems={"center"} spacing={1}>
            <Grid item><Typography variant="h6">Kellie</Typography></Grid>
            <Grid item><Typography>Released On Hold</Typography></Grid>
            <Grid item><Typography variant="h6">Coffas Technology</Typography></Grid>
            
          </Grid>
          <Typography color={colors.primary[100]} fontWeight={"500"}>Attachment (Proof)</Typography>
        </Grid>
        <Grid item 
            sx={{
              position:"absolute",
              right:"4%",
              color:colors.grey[300],
            }}
          >7 Nov 2023, 8:13 AM</Grid>
      </Grid>
      </Grid>
      </Box>
  );
};

export default UserActivityInfo;
