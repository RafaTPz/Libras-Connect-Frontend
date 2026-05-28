import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatArea } from '../components/ChatArea';

export function ChatPage() {
  const [activeChat, setActiveChat] = useState(1);

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-deaf-bg font-sans">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatArea activeChat={activeChat} />
    </div>
  );
}
