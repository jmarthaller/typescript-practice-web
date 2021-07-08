import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Index = () => {
  const [{ data }] = usePostsQuery();
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
          data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
