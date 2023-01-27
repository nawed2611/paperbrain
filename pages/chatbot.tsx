import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from '@auth0/nextjs-auth0';
import { BsArrowReturnRight } from "react-icons/bs";
import { client } from "../utils/client";

interface Chat {
  message: string;
  author: string;
}

const Chatbot = (name: { name: string }) => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  let url = name.name == "explain" ? "/chat" : "/explain";

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
    setLoading(true);

    client.post(url, {
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setChats([...chats, { message: input, author: "user" }, { message: "Sorry, I don't understand", author: "bot" },]);
        setInput("");
        setLoading(false);

      });
  };

  return (
    <div className='mx-2'>
      <div
        ref={chatContainerRef}
        className='h-[72vh] rounded-lg mx-2 mt-2 overflow-y-auto scroll-smooth'
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`py-0.5 rounded-lg mx-2.5 my-2 ${chat.author === "user" ? "text-right" : "text-left w-[80%]"
              }`}
          >
            <span
              className={`inline-block px-2 py-1  leading-8 text-m text-white rounded-lg ${chat.author === "user" ? "bg-green-500 rounded-br-none" : "bg-blue-500 rounded-bl-none"
                }`}
            >
              {chat.message}
            </span>

          </div>
        ))}
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className='flex items-start ml-2 ring-green-400 rounded-full h-4 w-4 animate-spin mt-2'
          >
            <div className='h-2 w-2 bg-green-400 rounded-full'></div>
          </motion.div>
        )}
      </div>
      <div className='bg-green-500 mx-4 rounded-lg z-1 py-2 drop-shadow-md w-[42vw] bottom-4 absolute'>
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
