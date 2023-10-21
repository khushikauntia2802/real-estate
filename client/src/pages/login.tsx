import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { xanadu } from "../assets";
import { CredentialResponse } from "../interfaces/google";

// Todo: Update your Google Client ID here
const REACT_APP_GOOGLE_AUTH_CLIENT_ID =
  "873595576519-7msropfqjl23nupg4unjqun93n8nm19v.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: REACT_APP_GOOGLE_AUTH_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "outline",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      maxWidth={false}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle, #ccff33 0%, #9ef01a 12.5%, #70e000 25%, #38b000 37.5%, #008000 50%, #007200 62.5%, #006400 75%, #004b23 87.5%, #002812 100%)"
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
        style={{
          background: "#FCFCFC",
          padding: "20px 35px",
          borderRadius: "21px",
          border: "2px dashed #002913",
        }}
      >
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <img src={ xanadu } alt="Xanadu logo" />
          <h1 
            style={{
              color: "#002913",
              fontSize: "41px",
          }}>
            Xanadu
          </h1>
        </div>

        <center><GoogleButton /></center>

        <Typography align="center" color= "#101010" fontSize="12px" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          Powered by
          <img
            style={{ padding: "5px"}}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  );
};
