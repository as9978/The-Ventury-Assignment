import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import store from "../redux/store";
import Alert from "../components/util/Alert";

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider {...{ store }}>
      <QueryClientProvider {...{ client }}>
        <ChakraProvider>
          <Alert />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default MyApp;
