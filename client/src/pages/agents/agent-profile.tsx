import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";
import { Typography, useMediaQuery } from "@mui/material";

const AgentProfile = () => {
    const { id } = useParams();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string,
    });

    console.log(data);

    const myProfile = data?.data ?? {};

    if (isLoading) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Loading...</Typography>)}
    if (isError) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Error...</Typography>)}

    return (
        <Profile
            type="Agent"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
            isMobile={isMobile}
        />
    );
};

export default AgentProfile;