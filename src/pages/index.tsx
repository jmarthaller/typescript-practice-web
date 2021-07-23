import { Box, Button, Flex, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
 

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15, 
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
            {data!.posts.posts.map((post) => (
            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
              <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
                <IconButton onClick={() => console.log(1)} icon={<ChevronUpIcon />} aria-label="Upvote post" />
                {post.points}
                <IconButton onClick={() => console.log(2)} icon={<ChevronDownIcon />} aria-label="Upvote post" />
              </Flex>
              <Box>
                <Heading fontSize="xl">{post.title}</Heading> 
                <Text>Posted by {post.creator.username}</Text>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
          </Stack>
        )}
          </div>
          {data && data.posts.hasMore ? <Flex>
            <Button onClick={() => {
              setVariables({
                limit: variables.limit, 
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }} isLoading={fetching} m="auto" my={4}>Load More Posts</Button>
          </Flex> : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
