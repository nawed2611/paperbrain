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
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
        className="bg-white"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
