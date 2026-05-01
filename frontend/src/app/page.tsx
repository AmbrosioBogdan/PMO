'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full">
              <span className="text-2xl">💬</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Personal Messaging OS
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            AI-enhanced WhatsApp automation dashboard
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all">
              Documentation
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-300">
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">📨</div>
              <p className="text-sm">Messages</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm">AI Powered</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">⏰</div>
              <p className="text-sm">Scheduled</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🔄</div>
              <p className="text-sm">Automated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
