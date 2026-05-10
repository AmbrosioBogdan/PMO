"use client";
import React, { useState, useEffect } from 'react';
import { Button, Card } from '@wa-hub/ui';
import { io } from 'socket.io-client';

export default function Dashboard() {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    // Check if window is defined to avoid SSR issues
    if (typeof window !== 'undefined') {
      const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

      socket.on('connect', () => console.log('Connected to WS'));
      socket.on('browser:status', (s) => setStatus(s));

      fetchJobs();
      const interval = setInterval(fetchJobs, 5000);
      return () => {
        socket.disconnect();
        clearInterval(interval);
      }
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/jobs`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch jobs');
    }
  };

  const handleSend = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/messages/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, message })
      });
      setTo('');
      setMessage('');
      fetchJobs();
    } catch (e) {
      console.error('Failed to send message');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">WA Automation Hub</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Engine Status:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            {status}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Quick Send">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded-md p-2"
                placeholder="393331234567"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                className="mt-1 block w-full border rounded-md p-2"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button onClick={handleSend} className="w-full">Enqueue Message</Button>
          </div>
        </Card>

        <div className="md:col-span-2">
          <Card title="Recent Jobs">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job: any) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.type}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          job.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(job.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
