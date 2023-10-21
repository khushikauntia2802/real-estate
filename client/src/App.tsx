import {
  AuthBindings,
  Authenticated,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import { 
  Login,
  Home,
} from "./pages";

import {
  AllProperties,
  CreateProperties,
  EditProperties,
  PropertyDetails,
} from "./pages/properties";

import {
  Agent,
  AgentProfile,
} from "./pages/agents";

import {
  MyProfile,
} from "./pages/profiles";


import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";

import { ColorModeContextProvider } from "./contexts";

import { ThemedSiderV2, ThemedTitleV2 } from "components";
import { ThemedHeaderV2,  } from "components/Layout/header";

import { AccountCircleOutlined, PeopleAltOutlined, VillaOutlined, DashboardOutlined } from "@mui/icons-material";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch('https://xanadurealestate.onrender.com/api/v1/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        })
        const data = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid: data._id,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
        
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" }}} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider('https://xanadurealestate.onrender.com/api/v1')}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name:"dashboard",
                  list:"/",
                  meta:{
                    label:"Dashboard",
                    icon:<DashboardOutlined />,
                  },
                },
                {
                  name: "Properties",
                  list: "/properties",
                  create: "/properties/create-property",
                  edit: "/properties/edit-property/:id",
                  show: "/properties/property-details/:id",
                  icon: <VillaOutlined />,
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "Agents",
                  list: "/agents",
                  show: "/agents/AgentProfile",
                  icon: <PeopleAltOutlined />,
                  meta: {
                    canDelete: true,
                  },
                },
                // {
                //   name: "Reviews",
                //   list: "/",
                //   icon: <StarOutlineRounded />,
                //   meta: {
                //     canDelete: true,
                //   },
                // },
                // {
                //   name: "Messages",
                //   list: "/",
                //   icon: <ChatBubbleOutline />,
                //   meta: {
                //     canDelete: true,
                //   },
                // },
                {
                  name: "Profile",
                  list: "/profiles",
                  icon: <AccountCircleOutlined />,
                  options: {label: "Profile"},
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "YJSPSW-sVg6sV-4FcWKw",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={ThemedHeaderV2} Sider={ThemedSiderV2} Title={ThemedTitleV2}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<Home />}
                  />

                  <Route path="/properties">
                    <Route index element={<AllProperties />} />
                    <Route path="create-property" element={<CreateProperties />} />
                    <Route path="edit-property/:id" element={<EditProperties />} />
                    <Route path="property-details/:id" element={<PropertyDetails />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<Agent />} />
                    <Route path="show/:id" element={<AgentProfile />} />
                  </Route>
                  <Route path="/profiles">
                    <Route index element={<MyProfile />} />
                  </Route>
                  
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;