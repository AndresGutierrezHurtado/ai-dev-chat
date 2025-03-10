"use client";
import { PaperPlaneIcon } from "@/components/icons";
import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        {
            message: "You were the Chosen One!",
            role: "assistant",
            timestamp: new Date(),
        },
        {
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
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const messageObj = {
            message,
            role: "user",
            timestamp: new Date(),
        };

        const updatedChat = [...chat, messageObj];
        setChat(updatedChat);
        setMessage("");

        document.querySelector(".chat-container").scrollTop =
            document.querySelector(".chat-container").scrollHeight;

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: message }),
            });

            if (!response.ok) throw new Error("Error en la API");

            const data = await response.json();

            const responseObj = {
                message: data.generated_text || "No se recibió respuesta.",
                role: "assistant",
                timestamp: new Date(),
            };

            setChat((prevChat) => [...prevChat, responseObj]);
        } catch (error) {
            console.error("Error enviando mensaje:", error);
            setChat((prevChat) => [
                ...prevChat,
                { message: "Error al obtener respuesta", role: "assistant", timestamp: new Date() },
            ]);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center py-10">
            <div className="w-full max-w-[800px]">
                <div className="mb-10 flex flex-col gap-5 overflow-y-scroll h-[600px] chat-container">
                    {chat.map((message, index) => (
                        <Message key={index} message={message} />
                    ))}
                </div>
                <label className="rounded-full bg-base-200 w-full p-3 px-8 flex flex-row border border-gray-700">
                    <input
                        type="text"
                        placeholder="Pregunta lo que quieras..."
                        className="focus:outline-none flex-1 placeholder:text-gray-400"
                        autoFocus
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="btn btn-primary btn-circle"
                        id="submit-btn"
                        onClick={handleSendMessage}
                    >
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
                        <span className="text-xl">{message.role === "user" ? "U" : "AI"}</span>
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
