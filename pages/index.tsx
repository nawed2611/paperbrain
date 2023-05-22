import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { RoughNotation } from "react-rough-notation";
import Link from "next/link";
import Layout from "./layout";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import Image from "next/image";
import Logo from "../public/logo.png";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setActive(true);
      toast.success(`Welcome! ${user.name}`);
      router.push("/search");
    }
  }, [user, router]);

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
        <Toaster />
        <div className='h-screen'>
          <div className='bg-gray-50 flex items-center justify-between px-6 shadow'>
            <div className='inline-flex items-center mx-8 gap-x-6 my-3'>
              <Image
                src={Logo}
                className='rounded-2xl'
                alt='PaperBrain'
                width={40}
                height={40}
              />
              <h1 className='text-2xl font-extrabold text-black'>PaperBrain</h1>
            </div>
            <button className='p-2 mx-8 text-white text-md text-center rounded-lg cursor-pointer bg-black px-4 hover:scale-105 transition-all'>
              <Link href={active ? "/search" : "/api/auth/login"}>Sign In</Link>
            </button>
          </div>
          <div className='p-12 flex items-center justify-center gap-x-12'>
            <div className='w-[30%]'>
              <div className='m-4'>
                <RoughNotation
                  animationDelay={1000}
                  animationDuration={2000}
                  type='box'
                  show={true}
                >
                  <h1 className='font-extrabold text-2xl p-2'>
                    Exploring research papers has never been easier!
                  </h1>
                </RoughNotation>
              </div>
              <div className='flex items-center justify-center m-8'>
                <ul className='flex gap-x-4 text-gray-900 text-sm'>
                  <Link href='https://twitter.com/__paperbrain' target='blank'>
                    <li className='cursor-pointer hover:scale-105 transition-all'>
                      <AiOutlineTwitter size={22} />
                    </li>
                  </Link>

                  <Link href='https://github.com/paperbrain100' target='blank'>
                    <li className='cursor-pointer hover:scale-105 transition-all'>
                      <AiOutlineGithub size={22} />
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <video
              className='w-[65%] rounded-xl shadow-2xl'
              autoPlay
              muted
              loop
              src='https://user-images.githubusercontent.com/83456083/233063742-ca57e432-a4db-4d65-b7eb-20bd78e3ed72.mp4'
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
