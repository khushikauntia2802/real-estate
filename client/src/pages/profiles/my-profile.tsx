import { useGetIdentity, useOne } from "@refinedev/core";
import { Typography, useMediaQuery } from "@mui/material";

import { Profile } from "components";

const MyProfile = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const { data: identity } = useGetIdentity<{
    userid: string,
  }>();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: identity?.userid as string,
    });

    const myProfile = data?.data ?? {};
    console.log(myProfile);

    if (isLoading) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Loading...</Typography>)}
    if (isError) {return (<Typography fontSize={18} fontWeight={700} sx={{color: "primary.dark"}}>Error...</Typography>)}
    return (
        <Profile
            type="My"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
            isMobile={isMobile}
        />
    );
};

export default MyProfile;