import React from 'react'
import { Box, Stack, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { PieChartProps } from 'interfaces/home';

const PieChart = ({ title, value, series, colors, labels }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
      sx={{bgcolor: "background.paper"}}
    >
      <Stack direction="column">
        <Typography fontSize={17} fontWeight={"500"} sx={{ color: "text.primary", cursor: "pointer" }}>
          {title}
        </Typography>
        <Typography
            fontSize={24}
            sx={{color: "text.secondary"}}
            fontWeight={700}
            mt={1}
        >
            {value}
        </Typography>
      </Stack>

      <ReactApexChart
          options={{
              chart: { type: "donut" },
              colors,
              legend: { show: false },
              dataLabels: { enabled: false },
              labels: labels,
              plotOptions: {
                pie: {
                  expandOnClick: true,
                }
              }
          }}
          series={series}
          type="donut"
          width="120px"
      />
    </Box>
  )
}

export default PieChart