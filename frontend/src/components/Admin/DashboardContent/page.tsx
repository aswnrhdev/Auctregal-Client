'use client'

import { Line, Radar, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, RadialLinearScale } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
);

const DashboardContent = () => {
    const cardsData = [
        { title: 'Profit Amount', value: '$12,345', icon: '💵' },
        { title: 'Number of Bidders', value: '150', icon: '👥' },
        { title: 'Number of Sellers', value: '30', icon: '🛒' },
        { title: 'Total Amount Bidded', value: '$45,678', icon: '📈' },
    ];

    // const lineChartData = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    //     datasets: [
    //         {
    //             label: 'Total Bids',
    //             data: [120, 150, 180, 220, 200, 250, 270],
    //             borderColor: '#1F2937',
    //             backgroundColor: 'rgba(31, 41, 55, 0.1)',
    //             fill: true,
    //         },
    //     ],
    // };

    const radarChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Monthly Profit',
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const areaChartData = {
        labels: ['Online', 'Offline', 'Live'],
        datasets: [
            {
                label: 'Mode of Auction',
                data: [45, 30, 25],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const mixedChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                type: 'bar',
                label: 'Bidders',
                data: [12, 19, 3, 5, 2, 3, 9],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: 'Trend',
                data: [15, 12, 10, 8, 6, 4, 3],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const bidsChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Total Number of Bids',
                data: [120, 140, 160, 180, 200, 220, 240],
                backgroundColor: '#22D3EE',
            },
        ],
    };

    const sellersChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Total Number of Sellers',
                data: [10, 12, 14, 16, 18, 20, 22],
                backgroundColor: '#FFCE56',
            },
        ],
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-1xl italic mb-4">Welcome back, Admin!</h1>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
                {cardsData.map((card, index) => (
                    <div key={index} className="p-4 border border-gray-200 shadow-sm rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{card.icon}</span>
                            <div>
                                <h2 className="text-lg font-semibold">{card.title}</h2>
                                <p className="text-xl">{card.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Mode of Auction</h2>
                    <Line data={areaChartData} options={{ fill: true }} />
                </div>
                
                <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Number of Bidders Joined</h2>
                    <Bar data={mixedChartData} />
                </div>
            </div>


  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Monthly Profit</h2>
                    <Radar data={radarChartData} />
                </div>
                <div className="flex flex-col col-span-1 gap-6">
                    
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Total Number of Bidders</h2>
                        <Bar data={bidsChartData} />
                    </div>
                    
                    <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Total Number of Sellers</h2>
                        <Bar data={sellersChartData} />
                    </div>
                </div>
            </div> */}


        </div>
    );
};

export default DashboardContent;
