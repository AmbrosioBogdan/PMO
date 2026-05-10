"use client";
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function WhatsAppHub() {
  const [status, setStatus] = useState('connecting');
  const [qr, setQr] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

    socket.on('wa:status', (s) => setStatus(s));
    socket.on('wa:qr', (qrData) => setQr(qrData));
    socket.on('wa:chats', (data) => setChats(data));

    return () => { socket.disconnect(); };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.name);
      const interval = setInterval(() => fetchMessages(selectedChat.name), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async (name: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/chats/${encodeURIComponent(name)}/messages`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) { console.error(e); }
  };

  const handleSend = async () => {
    if (!newMessage || !selectedChat) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: selectedChat.name, message: newMessage })
      });
      setNewMessage('');
    } catch (e) { console.error(e); }
  };

  if (status === 'qr_required' || !status.includes('auth')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0f2f5] p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-light text-gray-700 mb-6">WhatsApp Automation Hub</h1>
          {qr ? (
            <div className="space-y-4">
              <img src={`data:image/png;base64,${qr}`} alt="QR Code" className="mx-auto w-64 h-64 border" />
              <p className="text-sm text-gray-500">Scan this code with WhatsApp on your phone</p>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-64 h-64 bg-gray-200 rounded mb-4"></div>
              <p className="text-sm text-gray-500">Loading WhatsApp session...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        <header className="h-16 bg-[#f0f2f5] flex items-center px-4 border-b">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <h2 className="ml-4 font-semibold">My Chats</h2>
        </header>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 border-b ${selectedChat?.id === chat.id ? 'bg-gray-200' : ''}`}
            >
              <div className="w-12 h-12 bg-[#00a884] rounded-full flex items-center justify-center text-white font-bold">
                {chat.name[0]}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{chat.name}</h3>
                  <span className="text-xs text-gray-500">12:00</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage || 'Click to view'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col bg-[#e5ddd5] relative">
        {selectedChat ? (
          <>
            <header className="h-16 bg-[#f0f2f5] flex items-center px-4 border-b z-10">
              <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white font-bold">
                {selectedChat.name[0]}
              </div>
              <h2 className="ml-4 font-semibold">{selectedChat.name}</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-2" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-2 rounded-lg shadow-sm text-sm ${
                    msg.fromMe ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <footer className="h-16 bg-[#f0f2f5] flex items-center px-4 gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message"
                className="flex-1 bg-white rounded-lg px-4 py-2 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-[#00a884] text-white px-4 py-2 rounded-lg font-medium"
              >
                Send
              </button>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-32 h-32 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M11 7h2v6h-2zm0 8h2v2h-2z"/></svg>
            </div>
            <h2 className="text-2xl font-light">Select a chat to start messaging</h2>
            <p className="mt-2">The hub will synchronize your WhatsApp Web session in real-time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
