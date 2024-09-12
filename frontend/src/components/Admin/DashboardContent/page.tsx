import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DashboardContent: React.FC = () => {
    const [dashboardData, setDashboardData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('https://auctregal.rudopedia.shop/admin/dashboard-stats');
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    const { totalUsers, totalItems, totalSlips, recentUsers, recentItems, itemsByCategory, walletChanges } = dashboardData;

    const cardsData = [
        { title: 'Total Users', value: totalUsers, icon: '👥' },
        { title: 'Total Items', value: totalItems, icon: '📦' },
        { title: 'Total Slips', value: totalSlips, icon: '🧾' },
    ];

    const walletChangeData = {
        labels: walletChanges.map((item: any) => `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`),
        datasets: [
            {
                label: 'Wallet Balance Changes',
                data: walletChanges.map((item: any) => item.netChange),
                borderColor: '#1F2937',
                backgroundColor: 'rgba(31, 41, 55, 0.1)',
                fill: true,
            },
        ],
    };

    const itemsByCategoryData = {
        labels: itemsByCategory.map((item: any) => item._id),
        datasets: [
            {
                label: 'Items by Category',
                data: itemsByCategory.map((item: any) => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-4xl font-thin tracking-tighter text-white">Admin Dashboard</h1>
                <p className='font-thin text-white'>This is the admin dashboard, providing detailed information regarding the data.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardsData.map((card, index) => (
                    <div key={index} className="p-4 border border-[#3C2A21] shadow-sm rounded-lg bg-[#3C2A21]">
                        <div className="flex items-center gap-4 font-thin text-white">
                            <span className="text-2xl">{card.icon}</span>
                            <div>
                                <h2 className="text-lg font-thin">{card.title} - {card.value}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#3C2A21] p-6 border border-[#3C2A21] shadow-sm rounded-lg">
                    <h2 className="text-xl font-thin mb-4 text-white">Wallet Balance Changes</h2>
                    <Line
                        data={walletChangeData}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Net Change',
                                        color: '#FFFFFF',
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Year-Month',
                                        color: '#FFFFFF',
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#FFFFFF'
                                    }
                                }
                            }
                        }}
                    />
                </div>

                <div className="bg-[#3C2A21] p-6 border border-[#3C2A21] shadow-sm rounded-lg">
                    <h2 className="text-xl font-thin mb-4 text-white">Items by Category</h2>
                    <Pie
                        data={itemsByCategoryData}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#FFFFFF'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#3C2A21] p-6 border border-[#3C2A21] shadow-sm rounded-lg">
                    <h2 className="text-xl font-thin mb-4 text-white">Recent Users</h2>
                    <ul className="text-white font-thin">
                        {recentUsers.map((user: any) => (
                            <li key={user._id} className="mb-2">
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-[#3C2A21] p-6 border border-[#3C2A21] shadow-sm rounded-lg">
                    <h2 className="text-xl font-thin mb-4 text-white">Recent Items</h2>
                    <ul className="text-white font-thin">
                        {recentItems.map((item: any) => (
                            <li key={item._id} className="mb-2">
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default DashboardContent;
