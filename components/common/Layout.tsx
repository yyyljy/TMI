import React, { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Head>
        <title>PROJECT TMI</title>
      </Head>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
