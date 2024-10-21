import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const UserCountChart = () => {
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        fetchUserCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await fetch('/api/register/count');
            const data = await response.json();
            setUserCount(data.count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    const chartData = {
        labels: ['Users'],
        datasets: [
            {
                label: 'User Count',
                data: [userCount || 0],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">User Count</h2>
            {userCount !== null ? (
                <Line data={chartData} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default UserCountChart;