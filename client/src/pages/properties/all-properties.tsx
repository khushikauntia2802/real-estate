import React, { useMemo } from 'react';
import { Stack, Box, Typography, TextField, MenuItem, Select } from '@mui/material';
import { Add, KeyboardArrowDown } from '@mui/icons-material';
import { CustomButton } from 'components';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTable } from '@refinedev/core';
import { PropertyCard } from '../../components';
import '../../index.css';

const AllProperties = () => {
    const icon = ()  => {return (<KeyboardArrowDown sx={{color: "primary.dark", marginRight: "1rem"}} />)};
    const {tableQueryResult: {
        data, isLoading, isError
    },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorters,
        setSorters,
        filters,
        setFilters,    
    } = useTable();

    const allProperties = data?.data ?? []; 
    const navigateTo = useNavigate();
    const isMobile = useMediaQuery('(max-width: 900px)');

    const currentPriceSort = sorters.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorters([{ field, order: currentPriceSort === "asc" ? "desc" : "asc" }]);
    };

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : [],
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            propertyType:
                logicalFilters.find((item) => item.field === "propertyType")
                    ?.value || "",
        };
    }, [filters]);

    if (isLoading) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Loading...</Typography>)}
    if (isError) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Error...</Typography>)}
    return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, paddingLeft: isMobile ? "66px" : "5px" }}>
                <Stack direction="row" width="100%" alignItems={"center"} justifyContent={"space-between"}>
                    <Typography fontSize={25} fontWeight={700} sx={{color: "primary.dark"}}>
                        {!allProperties.length
                            ? "There are no properties"
                            : "All Properties"}
                    </Typography>
                    <CustomButton
                        title= "Add Property"
                        handleClick={() => navigateTo("create-property")}
                        backgroundColor="#38b000"
                        color="#ffffff"
                        icon={ <Add /> }
                    />
                </Stack>
                <Box mb={2} gap="30px" display="flex" alignContent="center" flexWrap="wrap" width="100%" sx={{borderColor: "transparent" , bgcolor: "background.default", justifyContent: "center"}}>
                    <TextField
                        variant="outlined"
                        color="info"
                        placeholder="Search by title"
                        value={currentFilterValues.title}
                        onChange={(e) => {
                            setFilters([
                                {
                                    field: "title",
                                    operator: "contains",
                                    value: e.currentTarget.value ? e.currentTarget.value : undefined,
                                },
                            ]);
                        }}
                        sx = {{ width: "50%", margin: "0 30px", animation: "transition: all 5s ease-in", bgcolor: "background.paper" }}
                    />
                    <CustomButton
                        title={`Sort price  ${
                            currentPriceSort === "asc" ? "↑" : "↓"
                        }`}
                        handleClick={() => toggleSort("price")}
                        backgroundColor="#38b000"
                        color="#fcfcfc"
                    />
                    <Select
                        sx = {{marginLeft: "5px", bgcolor: "background.paper" }}
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue=""
                        value={currentFilterValues.propertyType}
                        IconComponent={icon}
                        onChange={(e) => {
                            setFilters(
                                [
                                    {
                                        field: "propertyType",
                                        operator: "eq",
                                        value: e.target.value,
                                    },
                                ],
                                "replace",
                            );
                        }}
                    >
                        <MenuItem value="">All</MenuItem>
                        {[
                            "Apartment",
                            "Villa",
                            "Farmhouse",
                            "Condos",
                            "Townhouse",
                            "Duplex",
                            "Studio",
                            "Chalet",
                            "Retail Space",
                            "Office Space",
                            "Hotel"
                        ].map((type) => (
                            <MenuItem
                                key={type}
                                value={type.toLowerCase()}
                            >
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                    <Box mt="10px" sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around"}}>
                    {allProperties?.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))}
                    {!allProperties && (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>No Properties to Display...</Typography>) }
                </Box>
                {allProperties.length > 0 && (
                <Box display="flex" gap={2} mt={1} flexWrap="wrap" width="100%" sx={{justifyContent: "center"}}>
                    {(current>1) && (<CustomButton
                        title="Previous"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#38b000"
                        color="#ffffff"
                    />)}
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page{" "}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    {(current!==pageCount) && (<CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#38b000"
                        color="#ffffff"
                    />)}
                    <Select
                        sx={{bgcolor: "background.paper", marginLeft: "30px"}}
                        IconComponent={icon}
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10,
                            )
                        }
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
            </Box>
    )
}

export default AllProperties