import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

import Layout from '../layout';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { RoughNotation } from 'react-rough-notation';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Search = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    console.log(Cookies.get('apiKey'));

    toast.success(`Welcome! ${user.name}`);
  }, [user]);

  return (
    <Layout className="overflow-hidden">
      <Toaster />
      <motion.div className="bg-white h-screen">
        {user && <Navbar heading={true} />}
        <div className="flex">
          <Sidebar
            openModal={false}
            papers={false}
            heading="Your Starred Papers"
            response={[
              {
                paper_authors: 'Elad Hazan',
                paper_summary:
                  'Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.',
                paper_title: 'Lecture Notes: Optimization for Machine Learning',
                paper_url: 'http://arxiv.org/pdf/1909.03550v1',
              },
            ]}
          />

          <div className="flex bg-white w-[90%] h-[85vh] border-2 border-gray-300 border-dashed rounded-lg flex-col items-center m-4 justify-center">
            <div className="flex flex-col items-center justify-center p-8">
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type="highlight"
                // color='#f0fdf4'
                color="rgb(229 231 235)"
                show={true}
              >
                <h1 className="flex items-center font-bold text-3xl p-2 m-2">
                  Your Starred Papers are here{' '}
                  <BsArrowReturnLeft size={21} className="ml-4" />
                </h1>
              </RoughNotation>
              <p className="w-[90%] text-base mt-2">
                Click on Continue Reading to open it here
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Search;
