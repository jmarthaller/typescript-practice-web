import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10, 
    cursor: null as null | string,
  })
  const [{ data, fetching }] = usePostsQuery({
    variables
  });

  if (!fetching && !data) {
    return <div>query failed</div>;
  }

  return (
    <Layout>
      <div>
        <Flex>
          <Heading align="center">Portfolio Page</Heading>
          <NextLink href="/create-post">
            <Link ml="auto">Create Post</Link>
          </NextLink>
        </Flex>
        <br />
        {!data && fetching ? (
          <div>Loading posts</div>
        ) : (
          <Stack spacing={8}>
            {data!.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
          </Stack>
        )}
          </div>
          {data ? <Flex>
            <Button onClick={() => {
              setVariables({
                limit: variables.limit, 
                cursor: data.posts[data.posts.length - 1].createdAt,
              });
            }} isLoading={fetching} m="auto" my={4}>Load More Posts</Button>
          </Flex> : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
