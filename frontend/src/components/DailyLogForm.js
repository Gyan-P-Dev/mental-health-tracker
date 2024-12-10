import React, { useState } from 'react';
import axios from 'axios';

const DailyLogForm = ({ user,setOpenModel, onLogAdded} ) => {
    const {name, email}=user

    const [formData, setFormData] = useState({
        mood: 0,
        anxiety: 0,
        sleepHours: '',
        sleepQuality: '',
        sleepDisturbances: '',
        activityType: '',
        activityDuration: '',
        socialFrequency: '',
        stress: 0,
        symptoms: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/log', { ...formData, email, name });
            // onLogAdded();
            alert('Log submitted successfully');
            setOpenModel(false);
            setFormData({
                mood: 0,
                anxiety: 0,
                sleepHours: '5',
                sleepQuality: '',
                sleepDisturbances: '',
                activityType: '',
                activityDuration: '',
                socialFrequency: '',
                stress: 0,
                symptoms: '',
            });
        } catch (error) {
            console.error('Error submitting log:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-gray-100 shadow-md rounded-lg p-8"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Daily Mental Health Log
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Mood (1-10):
                    </label>
                    <input
                        type="number"
                        name="mood"
                        value={formData.mood}
                        min="1"
                        max="10"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Anxiety (1-10):
                    </label>
                    <input
                        type="number"
                        name="anxiety"
                        value={formData.anxiety}
                        min="1"
                        max="10"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Sleep Patterns:
                    </label>
                    <input
                        type="number"
                        name="sleepHours"
                        value={formData.sleepHours}
                        placeholder="Hours of sleep"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                    <input
                        type="text"
                        name="sleepQuality"
                        value={formData.sleepQuality}
                        placeholder="Quality of sleep"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                    <input
                        type="text"
                        name="sleepDisturbances"
                        value={formData.sleepDisturbances}
                        placeholder="Disturbances (optional)"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Physical Activity:
                    </label>
                    <input
                        type="text"
                        name="activityType"
                        value={formData.activityType}
                        placeholder="Type of activity"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                    <input
                        type="number"
                        name="activityDuration"
                        value={formData.activityDuration}
                        placeholder="Duration (minutes)"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Social Interactions:
                    </label>
                    <input
                        type="text"
                        name="socialFrequency"
                        value={formData.socialFrequency}
                        placeholder="Frequency of social engagements"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Stress Levels (1-10):
                    </label>
                    <input
                        type="number"
                        name="stress"
                        value={formData.stress}
                        min="1"
                        max="10"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-1">
                        Symptoms (optional):
                    </label>
                    <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        placeholder="Describe symptoms and severity"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DailyLogForm;
