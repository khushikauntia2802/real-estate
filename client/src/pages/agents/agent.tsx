import { useList } from "@refinedev/core";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { AgentCard } from "components";

const Agents = () => {
    const { data, isLoading, isError } = useList({ resource: "users" });
    const isMobile = useMediaQuery('(max-width: 900px)');
    const allAgents = data?.data ?? [];

    if (isLoading) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Loading...</Typography>)}
    if (isError) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Error...</Typography>)}
    
    
    return (
        <Box sx={{ paddingLeft: isMobile ? "66px" : "5px" }}>
            <Typography fontSize={25} fontWeight={700} sx={{color: "primary.dark"}}>
                Agents List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "background.paper",
                }}
            >
                {allAgents.map((agent) => (
                    <AgentCard
                        key={agent._id}
                        id={agent._id}
                        name={agent.name}
                        email={agent.email}
                        avatar={agent.avatar}
                        noOfProperties={agent.allProperties.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Agents;