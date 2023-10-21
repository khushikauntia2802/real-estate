import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    PropertyCard,
} from "components";
import useMediaQuery from "@mui/material/useMediaQuery";

const Home = () => {
  const onSale = Math.random();
  const rented = Math.random();
  const satisfied = Math.random();
  const urban = Math.random();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const { data, isLoading, isError } = useList({
      resource: "properties",
      config: {
          pagination: {
              pageSize: 3,
          },
      },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box sx={{paddingLeft: isMobile ? "61px" : 0}}>
      <Typography fontSize={25} fontWeight={700} sx={{color: "primary.dark", marginLeft: "3px"}}>
          Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[(onSale*684),((1-onSale)*684)]}
          colors={["#38b000", "#0E4605"]}
          labels={["On Sale", "Sold"]}
        />
        <PieChart
            title="Properties for Rent"
            value={1054}
            series={[(rented*1054),((1-rented)*1054)]}
            colors={["#38b000", "#0E4605"]}
            labels={["Rented", "Owned"]}
        />
        <PieChart
            title="Total customers"
            value={5684}
            series={[((1-satisfied)*5684), (satisfied*5684)]}
            colors={["#0E4605", "#38b000"]}
            labels={["Unstisfied", "Satisfied"]}
        />
        <PieChart
            title="Properties for Cities"
            value={555}
            series={[(urban*555), ((1-urban)*555)]}
            colors={["#38b000", "#0E4605"]}
            labels={["Urban", "Rural"]}
        />
      </Box>

      <Stack
          mt="25px"
          width="100%"
          direction={{ xs: "column", lg: "row" }}
          gap={4}
          marginRight={"10px"}
          sx={{flexGrow: 1}}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
        sx={{bgcolor: "background.paper"}}
      >
        <Typography fontSize="18px" fontWeight={600} sx={{color: "primary.dark"}}>
          Latest Properties
        </Typography>

        <Box
            mt={2.5}
            sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around"}}
        >
            {latestProperties.map((property) => (
                  <PropertyCard
                      key={property._id}
                      id={property._id}
                      title={property.title}
                      location={property.location}
                      price={property.price}
                      photo={property.photo}
                  />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;