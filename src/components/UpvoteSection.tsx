import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostsQuery } from "../generated/graphql";

interface UpvoteSectionProps {
    post: PostsQuery['posts']['posts'][0]
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={() => console.log(1)}
        icon={<ChevronUpIcon />}
        aria-label="Upvote post"
      />
      {post.points}
      <IconButton
        onClick={() => console.log(2)}
        icon={<ChevronDownIcon />}
        aria-label="Upvote post"
      />
    </Flex>
  );
};
