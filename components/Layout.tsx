import React, { ReactNode } from "react";

import { useColorMode, Button, Flex, Box, BoxProps } from "@chakra-ui/react";
import { theme } from "../theme/colors";
import { motion } from "framer-motion";

export const MotionBox = motion<BoxProps>(Box);

type Props = {
  children: ReactNode;
  title: string;
  description: string;
} & BoxProps;

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export const Layout = ({
  children,
  title,
  description,
  ...props
}: Props): JSX.Element => {
  const { colorMode } = useColorMode();
  return (
    <Box position="relative" as="main">
      <MotionBox
        initial="hidden"
        animate="enter"
        exit="exit"
        custom={colorMode}
        variants={variants}
        transition={{ type: "linear" }}
      >
        {children}
      </MotionBox>
    </Box>
  );
};
