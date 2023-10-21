import React from 'react';
import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@mui/material";
import { PropertyCardProps } from "interfaces/property";

const PropertyCard = ({ id, title, price, location, photo }: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/property-details/${id}`}
      sx={{
          flexGrow: 1 ,
          width: "350px",
          padding: "15px",
          "&:hover": {
              boxShadow: "0 22px 45px 2px #000000A9",
          },
          marginBottom: "30px",
          marginRight: "30px",
          cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
          component="img"
          width="100%"
          height={210}
          image={photo}
          alt="card image"
          sx={{ borderRadius: "10px", align: "center"}}
      />
        <CardContent
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "10px",
                paddingX: "5px",
            }}
        >
          <Stack direction="column" gap={1}>
              <Typography fontSize={16} fontWeight={500} sx={{color: "primary.dark"}}>
                  {title}
              </Typography>
              <Stack direction="row" gap={0.5} alignItems="flex-start">
                  <Place
                    sx={{
                        fontSize: 18,
                        color: "primary.dark",
                        marginTop: 0.5,
                    }}
                  />
                  <Typography fontSize={14} fontWeight={600} sx={{color: "primary.main"}}>
                      {location}
                  </Typography>
              </Stack>
          </Stack>
            <Box
              px={1.5}
              py={0.5}
              borderRadius={1}
              sx={{bgcolor: "primary.light"}}
              height="fit-content"
            >
              <Typography fontSize={12} fontWeight={600} sx={{color: "primary.main"}}>
                  ${price}
              </Typography>
            </Box>
        </CardContent>
    </Card>
  );
};

export default PropertyCard;
