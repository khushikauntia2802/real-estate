import React from 'react'
import { Box, Stack, Typography} from '@mui/material';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { TotalRevenueSeries, TotalRevenueOptions } from './charts.config';

const TotalRevenue = () => {
  return (
    <Box
      p={4}
      flex={1}
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
      sx={{bgcolor: "background.paper"}}
    >
      <Stack my="20px" direction="row" sx={{alignItems: "center", justifyContent: "space-between"}} flexWrap="wrap">
        <Typography fontSize={18} fontWeight={600} sx={{ color: "text.primary", cursor: "pointer" }}>
            Total Revenue
        </Typography>
        <div style={{display: "flex", alignItems: "center", gap: "31px",}}>
          <div style={{display: "flex", alignItems: "center", gap: "5px",}}>
            <div style={{backgroundColor: "#38b000", borderRadius: "50%", width: "13px", height: "13px"}}></div>
            <Typography fontSize={12} fontWeight={600} sx={{color: "text.primary"}}>Running month</Typography>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: "5px",}}>
            <div style={{backgroundColor: "#8dd26c", borderRadius: "50%", width: "13px", height: "13px"}}></div>
            <Typography fontSize={12} fontWeight={600} sx={{color: "text.primary"}}>Last month</Typography>
          </div>
        </div>
      </Stack>
      

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} sx={{ color: "text.secondary", cursor: "pointer" }}>
          ${((Math.random()*(1000000-1000)+1000).toString()).slice(0,9)}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded
              sx={{ fontSize: 25, color: "#38b000" }}
          />
          <Stack>
            <Typography fontSize={15} color="#38b000">
              0.{Math.round(Math.random()*10)}%
            </Typography>
            <Typography fontSize={12} sx={{ color: "text.primary" }}>
              Than the Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
          series={TotalRevenueSeries}
          type="bar"
          height={310}
          options={TotalRevenueOptions}
      />
    </Box>
  );
};


export default TotalRevenue