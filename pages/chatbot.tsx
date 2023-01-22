import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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

    axios
      .post("http://127.0.0.1:5000/chat", {
        message: input,
      })
      .then((res) => {
        console.log("ass", res.data.Answer);
        const Answer = res.data.Answer;
        setChats([
          ...chats,
          { message: input, author: "user" },
          { message: Answer, author: "bot" },
        ]);
        setInput("");
      })
      .catch((error) => {
        console.log("bruh", error);
      });
  };

  return (
    <div className='mx-2'>
      <div
        ref={chatContainerRef}
        className='max-h-[70vh] rounded-lg shadow-lg mx-2 overflow-y-auto scroll-smooth'
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`py-0.5 rounded-lg mx-2.5 my-2 ${
              chat.author === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-2 py-1 leading-8 text-m text-white rounded-lg ${
                chat.author === "user" ? "bg-green-600" : "bg-[#147efb]"
              }`}
            >
              {chat.message}
            </span>
          </div>
        ))}
      </div>
      <div className='bg-green-600 mx-4 rounded-lg z-1 p-2 drop-shadow-md w-[42vw] bottom-1 absolute'>
        <form onSubmit={handleSubmit} className=''>
          <div className='px-4 py-2 flex items-center text-white'>
            <input
              type='text'
              value={input}
              placeholder='Ask anything about your document...'
              onChange={(event) =>
                setInput(
                  event.target.value.charAt(0).toUpperCase() +
                    event.target.value.slice(1)
                )
              }
              className='bg-inherit border-none outline-none text-white w-full'
            />
            <button type='submit' className='ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='bg-gray-700'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
