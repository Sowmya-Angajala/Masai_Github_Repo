import { SimpleGrid, Box, Text } from "@chakra-ui/react";

const products = [
  "Product 1",
  "Product 2",
  "Product 3",
  "Product 4",
  "Product 5",
  "Product 6",
];

const MainContent = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} p={4}>
      {products.map((product, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Text>{product}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MainContent;
