
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DailyLogForm from './DailyLogForm';
import axios from 'axios';
import ChartVisualization from './ChartVisualization';
import { Modal } from '@mantine/core';

const socket = io('http://localhost:5000');

const Dashboard = ({ user }) => {
  const [openModel, setOpenModel] = useState(false);
  const [logs, setLogs] = useState([]);
  const { email } = user;

  useEffect(() => {
    fetchLogs();
    socket.on('logAdded', (data) => {
      console.log('Received logAdded:', data);
    });

    socket.on("test", (data) => {
      console.log(data);
    })
    socket.on('user-logs', (data) => {
      console.log(data, 'data====>');
      if (data) {
        setLogs((prev) => [...prev, data]);
      } else {
        console.log('No logs found');
      }
    });

    return () => {
      socket.off('logAdded');
    };
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logs', {
        params: { email },
      });
      setLogs(response.data);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center p-6'>
      <div className='max-w-3xl w-full bg-white rounded-lg shadow-lg p-8 mb-6'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
          Welcome, {user.name}
        </h2>
        <p className='text-lg text-gray-600 mb-4'>
          Here's your daily log dashboard. You can view the logs and visualize them below.
        </p>
        <button
          onClick={() => setOpenModel(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
          Add New Log
        </button>
        <Modal
          opened={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
          title="Daily Log Form"
          centered
          size="lg"

        >
          <DailyLogForm user={user} setOpenModel={setOpenModel} onLogAdded={fetchLogs} />
        </Modal>
      </div>

      <div className='max-w-3xl w-full bg-white rounded-lg shadow-lg p-8'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
          Your Logs
        </h3>
        <ChartVisualization data={logs} />

      </div>
    </div>
  );
};

export default Dashboard;
