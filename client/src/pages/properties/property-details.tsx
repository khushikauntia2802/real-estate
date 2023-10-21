import React from 'react'
import { Stack, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetIdentity, useShow, useDelete } from '@refinedev/core';
import ChatBubble from "@mui/icons-material/ChatBubble";
import { Delete, Edit, Phone, Place, Star } from "@mui/icons-material";
import { CustomButton } from 'components';
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../index.css";

const PropertyDetails = () => {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const navigateTo  = useNavigate();
    const { data: identity } = useGetIdentity<{
    email: string;
    }>();
    const { id } = useParams();
    const { mutate } = useDelete();
    const { queryResult } = useShow();

    const { data, isLoading, isError } = queryResult;
    const propertyDetails = data?.data ?? {};

    if (isLoading) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Loading...</Typography>)}
    if (isError) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Error...</Typography>)}

    const isCurrentUser = identity?.email === propertyDetails.creator.email;
    const handleDeleteProperty = () => {
    const response = window.confirm("Are you sure you want to delete this property?",);
    if (response) {
        mutate(
            {
            resource: "properties",
            id: id as string,
            },
            {
                onSuccess: () => {
                navigateTo("/properties");
                },
            },
        );
    }
    };

    function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
    }

    return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, paddingLeft: isMobile ? "66px" : "5px" }} flexDirection={"column"}>
        <Typography fontSize={25} fontWeight={700} sx={{color: "primary.dark"}}>Details</Typography>
        <Box
                mt="5px"
                mb="20px"
                display="flex"
                flexDirection={"row"}
                gap={10}
                sx = {{ justifyContent: "center", backgroundColor: "background.default"}}
            >
                <Box flex={1} maxWidth={764} width={"100%"} borderRadius="15px" sx={{backgroundColor: "background.paper", padding: "35px"}}>
                    <div style={{width: "100%"}}>
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        style={{ objectFit: "cover", borderRadius: "15px" }}
                        className="property_details-img"
                    />
                    </div>
                    

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                sx = {{color:"primary.dark"}}
                                textTransform="capitalize"
                            >
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    sx = {{color:"primary.dark"}}
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx = {{color:"text.secondary"}} />
                                    <Typography fontSize={14} sx = {{color:"text.secondary"}}>
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    sx = {{color:"primary.dark"}}
                                >
                                    Price
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#38b000"
                                    >
                                        ${propertyDetails.price}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} sx = {{color:"primary.dark"}}>
                                Description
                            </Typography>
                            <Typography fontSize={14} sx = {{color:"text.secondary"}}>
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width={"100%"}
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                    justifyContent="start"
                    
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="15px"
                        sx={{backgroundColor: "background.paper", padding: "35px"}}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    sx = {{color:"primary.dark"}}
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    sx = {{color:"text.secondary"}}
                                >
                                    Agent
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx = {{color:"text.secondary"}} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    sx = {{color:"text.secondary"}}
                                >
                                    North Carolina, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                sx = {{color:"primary.dark"}}
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Properties
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                            
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#38b000"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigateTo(
                                            `/properties/edit-property/${propertyDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>

                    <Box display="flex" flexDirection="column" gap={3} borderRadius="15px" sx = {{backgroundColor: "background.paper", padding: "35px"}}>
                    <Stack>
                        <img
                            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                            width="100%"
                            style={{ flex: "1 1 auto", borderRadius: 10, objectFit: "cover" }}
                            alt='map'
                        />
                    </Stack>

                    
                        <CustomButton
                            title="Book Now"
                            backgroundColor="#38b000"
                            color="#FCFCFC"
                            fullWidth
                        />
                    </Box>
                </Box>
            </Box>
    </Box>
);
};

export default PropertyDetails;
