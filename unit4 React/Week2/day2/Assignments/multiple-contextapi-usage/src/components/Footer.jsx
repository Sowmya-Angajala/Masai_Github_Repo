import { Box, Text } from "@chakra-ui/react";
import { useThemeContext } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useThemeContext();

  return (
    <Box
      bg={theme === "light" ? "gray.300" : "gray.700"}
      color={theme === "light" ? "black" : "white"}
      p={4}
      position="sticky"
      bottom="0"
      textAlign="center"
    >
      <Text>Footer Content - {theme} mode</Text>
    </Box>
  );
};

export default Footer;
