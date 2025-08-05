import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/theme-utils";
// You can extend or use default theme
const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ThemeProviderCustom>
          <ThemedApp />
        </ThemeProviderCustom>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
