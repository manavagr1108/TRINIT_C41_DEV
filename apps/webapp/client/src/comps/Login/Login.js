import "../../App.css";
// import getGoogleUrl from './utils/getGoogleUrl';
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import getGoogleUrl from "../../utils/getGoogleUrl";

function Login() {
  const handleLoginGoogle = (e) => {
    e.preventDefault();
    const url = getGoogleUrl();
    window.location.replace(url);
  };
  return (
    <ChakraProvider>
      <Button
        m={"1% 0"}
        variant={"solid"}
        color={"white"}
        bg={"blue"}
        colorScheme={"blue"}
        type={"button"}
        onClick={handleLoginGoogle}
      >
        Login With Google
      </Button>
    </ChakraProvider>
  );
}

export default Login;
