import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const WeeklyForecast = () => {
  const [dailyForecast, setDailyForecast] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const city = "Lumajang";

    const labels = dailyForecast.map(item =>
        dayjs(item.dt_txt).format("ddd")
    );

    const tempsMin = dailyForecast.map(item =>
        item.main.temp_min
    );

    const tempsMax = dailyForecast.map(item =>
        item.main.temp_max
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Suhu Minimum (°C)",
                data: tempsMin,
                backgroundColor: "#0072ed", // biru
            },
            {
                label: "Suhu Maksimum (°C)",
                data: tempsMax,
                backgroundColor: "#ed0000", // merah
            },
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Perbandingan Suhu Harian" },
        },
        scales: {
            x: {
                stacked: false,
                ticks: { display: true },
                CategoryPersentage: 0.6,
                barPercentage: 0.3,
            },
            y: {
                beginAtZero: true,
                CategoryPersentage: 0.6,
                barPercentage: 0.3,
            }
        }
    };

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
                );

                const data = res.data.list;

                // Filter: ambil data jam 12:00 siang saja dari setiap hari
                const filtered = data.filter((item) =>
                    item.dt_txt.includes("12:00:00")
                );

                setDailyForecast(filtered); // max 5 hari
            } catch (err) {
                console.error("Gagal fetch cuaca mingguan:", err);
            }
        };
        fetchForecast();
    }, [apiKey]);

    if (!dailyForecast.length) return <p>Loading forecast...</p>;

    return (
        <div className="bg-white shadow rounded-lg p-4 w-full">
            <h2 className="text-lg font-merri mb-4">Prakiraan Cuaca (5 Hari)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {dailyForecast.map((item, index) => {
                    const date = dayjs(item.dt_txt).format("ddd");
                    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

                    return (
                        <div key={index} className="bg-gray-100 rounded-lg p-2 text-center hover:shadow">
                            <p className="font-semibold">{date}</p>
                            <img src={iconUrl} alt={item.weather[0].description} className="mx-auto w-12 h-12"/>
                            <p className="text-sm capitalize">{item.weather[0].main}</p>
                            <p className="text-sm">{item.main.temp}°C</p>
                        </div>
                    );
                })}
            </div>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default WeeklyForecast;
