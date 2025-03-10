"use client";
import { PaperPlaneIcon } from "@/components/icons";
import { useState } from "react";


export default function Home() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        {
            id: 1,
            message: "You were the Chosen One!",
            role: "assistant",
            timestamp: new Date(),
        },
        {
            id: 2,
            message: "I hate you!",
            role: "user",
            timestamp: new Date(),
        },
    ]);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    });

    const handleSendMessage = () => {
        console.log("Sending message...");

        if (message.trim() === "") {
            return;
        }

        const messageObj = {
            id: chat.length + 1,
            message: message,
            role: "user",
            timestamp: new Date(),
        };

        const newChat = [...chat, messageObj];

        setMessage("");
        setChat(newChat);

        window.scrollY = document.body.scrollHeight;
    };

    return (
        <div className="h-screen flex items-center justify-center py-10">
            <div className="w-full max-w-[800px]">
                <div className="mb-10 flex flex-col gap-5 overflow-y-scroll h-[600px]">
                    {chat.map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
                </div>
                <label className="rounded-full bg-base-200 w-full p-3 px-8 flex flex-row border border-gray-700">
                    <input
                        type="text"
                        placeholder="Pregunta lo que quieras..."
                        className="focus:outline-none flex-1 placeholder:text-gray-400"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="btn btn-primary btn-circle" onClick={handleSendMessage}>
                        <PaperPlaneIcon size={18} />
                    </button>
                </label>
            </div>
        </div>
    );
}

const Message = ({ message }) => {
    return (
        <div className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span className="text-xl">
                            {message.role === "user" ? "U" : "AI"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="chat-header">
                {message.role === "user" ? "You" : "ChatDevAI"}
                <time className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                </time>
            </div>
            <div className="chat-bubble">{message.message}</div>
        </div>
    );
};
