import { Flex, Button, Text, Spacer } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useAuth();
  const { toggleTheme } = useThemeContext();

  return (
    <Flex bg="teal.500" p={4} color="white" alignItems="center">
      <Text fontSize="xl">Dashboard</Text>
      <Spacer />
      <Button onClick={toggleTheme} colorScheme="orange" size="sm" mr={4}>
        Toggle Theme
      </Button>
      <Button onClick={toggleAuth} colorScheme="pink" size="sm">
        {isLoggedIn ? "Logout" : "Login"}
      </Button>
    </Flex>
  );
};

export default Navbar;
