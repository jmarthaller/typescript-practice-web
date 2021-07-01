import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import theme from '../theme'
import { LoginMutation, MeDocument, MeQuery } from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              { query: MeDocument }, 
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
            });
        },
      }
    }
  }), fetchExchange],
});


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
