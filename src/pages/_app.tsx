import { CSSReset, ThemeProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider, createClient } from 'urql'


const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include",
  },
});

import theme from '../theme'

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        {/* Made options in color-mode-provider.d.ts:23 optional with TS ? may have to change later if conflict */}
          <CSSReset />
          <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;
