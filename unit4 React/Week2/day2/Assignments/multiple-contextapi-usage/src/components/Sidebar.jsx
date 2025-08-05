import { Box, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box
      display={{ base: "none", md: "block" }}
      bg="gray.200"
      w="250px"
      p={4}
      h="calc(100vh - 64px)"
      position="sticky"
      top="64px"
    >
      <VStack align="start" spacing={4}>
        <Text fontWeight="bold">Sidebar</Text>
        {isLoggedIn && <Text>Welcome, User!</Text>}
      </VStack>
    </Box>
  );
};

export default Sidebar;
