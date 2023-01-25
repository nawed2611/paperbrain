import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BsArrowReturnRight } from "react-icons/bs";
import { client } from "../utils/client";

interface Chat {
  message: string;
  author: string;
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChats([...chats, { message: input, author: "user" }]);

    client
      .post("explain", {
        message: input,
      })
      .then((res) => {

        const Answer = res.data.answer;
        setChats([
          ...chats,
          { message: input, author: "user" },
          { message: Answer, author: "bot" },
        ]);
        setInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='mx-2'>
      <div
        ref={chatContainerRef}
        className='h-[70vh]  rounded-lg mx-2 overflow-y-auto scroll-smooth'
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`py-0.5 rounded-lg mx-2.5 my-2 ${chat.author === "user" ? "text-right" : "text-left w-[80%]"
              }`}
          >
            <span
              className={`inline-block px-2 py-1 leading-8 text-m text-white rounded-lg ${chat.author === "user" ? "bg-green-500" : "bg-blue-500"
                }`}
            >
              {chat.message}
            </span>
          </div>
        ))}
      </div>
      <div className='bg-green-500 mx-4 rounded-lg z-1 p-2 drop-shadow-md w-[42vw] bottom-1 absolute'>
        <form onSubmit={handleSubmit} className=''>
          <div className='px-4 py-2 flex items-center text-white'>
            <input
              type='text'
              value={input}
              placeholder='Ask about the paper here...'
              onChange={(event) =>
                setInput(
                  event.target.value.charAt(0).toUpperCase() +
                  event.target.value.slice(1)
                )
              }
              className='bg-inherit border-none outline-none text-white w-full placeholder:text-white'
            />
            <button type='submit' className='ml-2'>
              <BsArrowReturnRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
