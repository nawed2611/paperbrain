import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";
import Head from "next/head";
import Layout from "./layout";
import Navbar from "../components/navbar";

const User = () => {
  const { user } = useUser();
  return (
    <>
      <Head>
        <title>PaperBrain</title>
        <meta
          name='description'
          content='Exploring your study papers has never been easier!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout className='overflow-hidden'>
        <Navbar heading={true} />
        <div className='flex items-center justify-center p-8'>
          {/* <h1 className='text-4xl font-bold text-gray-700'>User</h1> */}
          <h1 className='text-4xl font-bold text-gray-700'>{user?.name}</h1>
          <h1 className='text-4xl font-bold text-gray-700'>Starred Papers</h1>
        </div>
      </Layout>
    </>
  );
};

export default User;
