import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
// import { title } from "process";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });
  return (
    <Layout>
      <div>
        <NextLink href="/create-post">
          <Link>Create Post</Link>
        </NextLink>
        <br />
        {!data ? (
          <div>Loading posts</div>
        ) : (
          <Stack spacing={8}>
            {data.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.text.slice(0, 50)}</Text>
            </Box>
          ))}
          </Stack>
        )}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
