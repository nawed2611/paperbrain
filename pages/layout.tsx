import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const variants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>PaperBrain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: 'linear' }} // Set the transition to linear
        className="bg-white"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
