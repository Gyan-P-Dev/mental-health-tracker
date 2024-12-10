
import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const filterData = (data, period) => {
    const today = new Date();
    return data.filter(item => {
        const itemDate = new Date(item.date);

        if (period === 'weekly') {
            const diffTime = today - itemDate;
            const diffDays = diffTime / (1000 * 3600 * 24);
            return diffDays <= 7 && diffDays >= 0;
        }

        if (period === 'monthly') {
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();
            return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
        }

        return false;
    });
};

const ChartVisualization = ({ data }) => {
    const [period, setPeriod] = useState('weekly');

    const filteredData = filterData(data, period);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            {data.length > 0 ? (
                <><div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setPeriod('weekly')}
                        className={`px-4 py-2 rounded-lg text-lg font-semibold ${period === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setPeriod('monthly')}
                        className={`px-4 py-2 rounded-lg text-lg font-semibold ${period === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
                    >
                        Monthly
                    </button>
                </div><ResponsiveContainer width="100%" height={400}>
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="mood" stroke="blue" name="Mood" />
                            <Line dataKey="anxiety" stroke="red" name="Anxiety" />
                            <Line dataKey="sleep" stroke="green" name="Sleep" />
                        </LineChart>
                    </ResponsiveContainer></>
            ): <div>No data found</div>
        }

        </div>
    );
};

export default ChartVisualization;
