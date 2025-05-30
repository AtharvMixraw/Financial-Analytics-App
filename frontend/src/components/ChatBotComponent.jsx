import { useState } from "react";

export default function ChatBotComponent() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="chat-container">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Ask</button>
      {response && <p>💬 {response}</p>}
    </div>
  );
}
