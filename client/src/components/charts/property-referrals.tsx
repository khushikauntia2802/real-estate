import React from 'react'
import { Box, Stack, Typography} from '@mui/material';
import { propertyReferralsInfo } from '../../constants/index';

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
    <Typography fontSize={16} fontWeight={500} sx={{color: "primary.dark"}}>
      {title}
    </Typography>
    <Typography fontSize={16} fontWeight={500} sx={{color: "primary.dark"}}>
      {percentage}%
    </Typography>
    </Stack>
      <Box
        mt={2}
        position="relative"
        width="100%"
        height="8px"
        borderRadius={1}
        sx={{bgcolor: "background.default"}}
      >
        <Box
          width={`${percentage}%`}
          bgcolor={color}
          position="relative"
          height="100%"
          borderRadius={1}
        />
      </Box>
  </Box>
);

const PropertyReferrals = () => {
  return (
      <Box
        p={4}
        id="chart"
        minWidth={490}
        display="flex"
        flexDirection="column"
        borderRadius="15px"
        sx={{bgcolor: "background.paper", marginRight: localStorage.getItem("siderColllapsed")==="collapsed"? "3px" : "0px" }}
      >
        <Typography fontSize={18} fontWeight={600} sx={{color: "primary.dark", cursor: "pointer"}}>
          Property Referrals
        </Typography>

        <Stack my="20px" direction="column" gap={4}>
          {propertyReferralsInfo.map((bar) => (
            <ProgressBar key={bar.title} {...bar} />
          ))}
        </Stack>
      </Box>
  );
};

export default PropertyReferrals