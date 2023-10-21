import React, { useContext } from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
  useIsExistAuthentication,
  useLogout,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";

import { ModeEditOutlineOutlined, SettingsSuggestOutlined } from "@mui/icons-material";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import { Box, IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ColorModeContext } from "../../contexts";
import '../../index.css';
import Logout from "@mui/icons-material/Logout";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;
  const { mode, setMode } = useContext(ColorModeContext);
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const isExistAuthentication = useIsExistAuthentication();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const t = useTranslate();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  
  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Tooltip
      title={t("buttons.logout", "Logout")}
      placement="right"
      disableHoverListener={true}
      arrow
    >
      <ListItemButton
        key="logout"
        onClick={() => handleLogout()}
        sx={{
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "10px",
          marginRight: "15px",
          borderRadius: "15px",
          minWidth: "170px",
          minHeight: "36px",
          width: "90%",
          ":hover": {backgroundColor: "primary.light", color: "#ffffff"}
        }}
      >
        <ListItemIcon
          sx={{color: "text.secondary", transition: "margin-right 0.3s"}}
        >
          <Logout style={{marginRight: "12px"}} />
          <Typography variant="subtitle2" fontSize={"15px"} fontWeight={"400"} align="left" data-testid="header-user-name" 
          sx={{color: "text.secondary", ":hover": {textDecoration: "underline solid text.secondary 1px"}}}>
            {"Log out"}
          </Typography>
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );

  var alt, menu;
  if (mode==="light") {alt = "Dark Theme"; menu="#FFFFFF";}
  else {alt = "Light Theme"; menu="#1B1F1A";}
  return (
    <AppBar position={prefferedSticky ? "sticky" : "relative"} sx={{backgroundColor: "background.paper"}}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="3px"
            alignItems="center"
            justifyContent="space-around"
          >

            <div className="dropdown" >
              <button className="dropbtn">
                {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
                {user?.name && (
                  <Typography variant="subtitle2" fontSize={"15px"} fontWeight={"400"} data-testid="header-user-name" 
                  sx={{color: "primary.dark",":hover": {textDecoration: (theme) => `underline solid ${theme.palette.primary.dark} 1px`}}}>
                    {user?.name}
                  </Typography>
                )}
              </button>
              <div className="dropdown-content" style={{background: `${menu}`}}>
                <Box marginRight="10px">
                  <IconButton
                  sx={{
                    justifyContent: "start",
                    marginTop: "15px",
                    marginLeft: "15px",
                    marginBottom: "5px",
                    marginRight: "15px",
                    borderRadius: "15px",
                    minWidth: "170px",
                    minHeight: "36px",
                    width: "90%",
                    ":hover": {backgroundColor: "primary.light"}
                  }}
                  >
                    <ModeEditOutlineOutlined sx = {{color: "text.secondary"}} />
                    <Typography variant="subtitle2" fontSize={"15px"} fontWeight={"400"} data-testid="header-user-name" 
                    sx={{color: "text.secondary", marginLeft: "10px", ":hover": {textDecoration: "underline solid text.secondary 1px"}}}>
                      {"Edit Profile"}
                    </Typography>
                  </IconButton>
                </Box>
                <Box marginRight="10px">
                  <IconButton
                  sx={{
                    justifyContent: "start",
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    borderRadius: "15px",
                    minWidth: "170px",
                    minHeight: "36px",
                    width: "90%",
                    ":hover": {backgroundColor: "primary.light"}
                  }}
                  >
                    <SettingsSuggestOutlined sx = {{color: "text.secondary"}} />
                    <Typography variant="subtitle2" fontSize={"15px"} fontWeight={"400"} data-testid="header-user-name" 
                    sx={{color: "text.secondary", marginLeft: "10px", ":hover": {textDecoration: "underline solid text.secondary 1px"}}}>
                      {"Settings"}
                    </Typography>
                  </IconButton>
                </Box>
                <Box marginRight="10px">
                    {logout}
                </Box>
                <Box marginRight="10px" paddingBottom="15px">
                  <IconButton
                    onClick={() => {
                      setMode();
                  }}
                  sx={{
                    marginTop: "5px",
                    marginBottom: "15px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    justifyContent: "start",
                    margin: "5px 15px",
                    borderRadius: "15px",
                    minWidth: "170px",
                    minHeight: "36px",
                    width: "90%",
                    ":hover": {backgroundColor: "primary.light", color: "#ffffff"}
                  }}
                  >
                    {mode === "dark" ? (
                        <LightModeOutlined sx={{color: "text.secondary"}}/>
                    ) : (
                        <DarkModeOutlined sx={{color: "text.secondary"}}/>
                    )}
                    <Typography variant="subtitle2" fontSize={"15px"} fontWeight={"400"} data-testid="header-user-name" 
                    sx={{color: "text.secondary", marginLeft: "10px", ":hover": {textDecoration: "underline solid text.secondary 1px"}}}>
                      {alt}
                    </Typography>
                  </IconButton>
                </Box>
              </div>
            </div>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};


