import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "Hi! 🎬 How can I help you with your movie booking today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    let reply = "I'm not sure about that.";
    const msg = input.toLowerCase();

    // 🎯 Custom Responses
    if (msg.includes("movie"))
      reply =
        "You can explore all available movies on the Home or Movies page! 🍿";
    else if (msg.includes("book"))
      reply =
        "To book tickets, click 'Book Now' on your desired movie and select seats. 🎟️";
    else if (msg.includes("cancel"))
      reply =
        "Cancellations can be made within 24 hours of booking via your Profile page.";
    else if (msg.includes("hi") || msg.includes("hello"))
      reply =
        "Hello there! 👋 How can I make your movie experience better today?";
    else if (msg.includes("guide")) reply = "Yes, how can I help you? 😊";

    // Simulate delay
    setTimeout(() => {
      setMessages([...newMessages, { sender: "bot", text: reply }]);
    }, 600);

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-gray-900 text-white shadow-2xl rounded-2xl border border-yellow-500 flex flex-col overflow-hidden">
      <div className="bg-yellow-500 text-black p-3 rounded-t-2xl font-bold flex items-center gap-2">
        🎬 MovieBot
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 h-64 bg-gray-800">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-xl max-w-[80%] break-words ${
              m.sender === "bot"
                ? "bg-gray-700 text-yellow-300 self-start"
                : "bg-yellow-500 text-black self-end ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex border-t border-gray-700 bg-gray-900">
        <input
          className="flex-1 p-2 bg-transparent text-white outline-none placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask MovieBot..."
        />
        <button
          onClick={handleSend}
          className="bg-yellow-500 text-black px-4 font-semibold hover:bg-yellow-400 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
