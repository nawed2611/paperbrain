import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

import Layout from "../layout";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { RoughNotation } from "react-rough-notation";
import { BsArrow90DegDown, BsArrowReturnLeft } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const Search = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Layout>
      <Toaster />

      <motion.div className='bg-white h-screen'>
        {user && <Navbar heading={true} />}
        <div className='flex'>
          <Sidebar
            openModal={false}
            papers={false}
            heading='Your Uploaded Papers'
            response={[
              {
                paper_authors: "Elad Hazan",
                paper_summary:
                  "Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.",
                paper_title: "Lecture Notes: Optimization for Machine Learning",
                paper_url: "http://arxiv.org/pdf/1909.03550v1",
              },
              {
                paper_authors: "Elad Hazan",
                paper_summary:
                  "Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.",
                paper_title: "Lecture Notes: Optimization for Machine Learning",
                paper_url: "http://arxiv.org/pdf/1909.03550v1",
              },
              {
                paper_authors: "Elad Hazan",
                paper_summary:
                  "Lecture notes on optimization for machine learning, derived from a course at\nPrinceton University and tutorials given in MLSS, Buenos Aires, as well as\nSimons Foundation, Berkeley.",
                paper_title: "Lecture Notes: Optimization for Machine Learning",
                paper_url: "http://arxiv.org/pdf/1909.03550v1",
              },
            ]}
          />

          <div className='flex bg-white w-[90%] h-[85vh] border-2 border-gray-300 border-dashed rounded-lg flex-col items-center m-4 justify-center'>
            <div className='flex flex-col items-center justify-center p-8'>
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type='highlight'
                color='rgb(229 231 235)'
                show={true}
              >
                <h1 className='flex items-center font-bold text-3xl p-2 m-2'>
                  Your Uploaded Papers are here{" "}
                  <BsArrowReturnLeft size={21} className='ml-4' />
                </h1>
              </RoughNotation>
              <p className='w-[90%] text-base mt-2'>
                Click on Continue Reading to open it here
              </p>
            </div>
            <p>OR</p>

            <div className='flex flex-col items-center justify-center p-8'>
              <RoughNotation
                animationDelay={1000}
                animationDuration={2000}
                type='highlight'
                color='rgb(229 231 235)'
                show={true}
              >
                <h1 className='flex items-center font-bold text-3xl p-2 m-2'>
                  Upload Papers below
                </h1>
              </RoughNotation>

              <form className='flex flex-col items-center justify-center w-[90%]'>
                <input
                  type='file'
                  name='file'
                  id='file'
                  className='w-[90%] p-2 m-2 border-2 border-gray-300 rounded-md'
                />
              </form>
            </div>
          </div>
        </div>

        {/* <div className='absolute bottom-2 rounded-full bg-green-100 right-2 p-4 shadow-xl hover:scale-105'>
          <AiFillEdit size={40} className='text-green-500' />
        </div> */}
      </motion.div>
    </Layout>
  );
};

export default Search;
