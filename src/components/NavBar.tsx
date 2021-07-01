import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
        return (
            <Flex bg={"tomato"} p={4} ml={"auto"}>
                <Box ml={"auto"}>
                    <NextLink href="/login">
                        <Link color="white" mr={4}>Login</Link>
                    </NextLink>
                    <NextLink href="/register">
                        <Link color="white">Sign Up</Link>
                    </NextLink>
                </Box>
            </Flex>
        );
}