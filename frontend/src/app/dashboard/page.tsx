'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface WhatsAppStatus {
  connected: boolean;
  phoneNumber?: string;
  lastSync?: string;
}

interface Message {
  id: string;
  chat_id: string;
  content: string;
  direction: 'incoming' | 'outgoing';
  timestamp: string;
  read: boolean;
}

export default function Dashboard() {
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus>({
    connected: false,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch WhatsApp status and messages on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/messages');
        const data = await response.json();
        
        if (data.success) {
          setMessages(data.messages || []);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleConnectWhatsApp = async () => {
    try {
      setConnecting(true);
      setError(null);

      // In a real implementation, this would trigger the worker to open WhatsApp Web
      // For now, we'll show instructions
      const message = `WhatsApp connection initiated. 
      
Please follow these steps:
1. The WhatsApp Web window will open automatically
2. Scan the QR code with your phone
3. Confirm the connection
4. The dashboard will update once connected

The connection will be maintained for seamless message sync.`;

      alert(message);

      // Simulate connection status update
      setTimeout(() => {
        setWhatsappStatus({
          connected: true,
          phoneNumber: '+1234567890',
          lastSync: new Date().toISOString(),
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to WhatsApp');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
              <h1 className="text-2xl font-bold text-white">PMO</h1>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Back
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* WhatsApp Status Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">WhatsApp Connection</h2>
                <p className="text-slate-400">
                  {whatsappStatus.connected
                    ? `Connected to ${whatsappStatus.phoneNumber || 'Your phone'}`
                    : 'Not connected. Connect to start messaging.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      whatsappStatus.connected
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {whatsappStatus.connected ? '● Connected' : '● Disconnected'}
                  </span>
                  {whatsappStatus.lastSync && (
                    <p className="text-xs text-slate-500 mt-2">
                      Last sync: {new Date(whatsappStatus.lastSync).toLocaleTimeString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleConnectWhatsApp}
                  disabled={connecting || whatsappStatus.connected}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {connecting ? 'Connecting...' : whatsappStatus.connected ? 'Connected' : 'Connect WhatsApp'}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-red-300">
              {error}
            </div>
          )}

          {/* Messages Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Messages</h2>
            
            {loading ? (
              <div className="text-center text-slate-400 py-8">
                <p>Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-slate-400 py-8">
                <p>No messages yet. Connect to WhatsApp to start messaging.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg ${
                      msg.direction === 'incoming'
                        ? 'bg-cyan-500/10 border border-cyan-500/20 ml-0'
                        : 'bg-blue-500/10 border border-blue-500/20 ml-auto'
                    } max-w-lg`}
                  >
                    <p className="text-white">{msg.content}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-white font-semibold mb-1">AI Assistant</h3>
              <p className="text-sm text-slate-400">Auto-reply and smart responses</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-semibold mb-1">Scheduled Messages</h3>
              <p className="text-sm text-slate-400">Plan messages for later</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-white font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-slate-400">Track conversations</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
