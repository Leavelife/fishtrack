import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);

    const city = "Lumajang";
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        const fetchWeather = async () => {
        try {
            const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeather(res.data);
        } catch (err) {
            console.error("Gagal fetch cuaca:", err);
        }
        };

        fetchWeather();
    }, [city, apiKey]);

    if (!weather) return <p>Loading weather...</p>;

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div className="text-[#17265d] font-merri bg-slate-50 shadow rounded-lg m-2 p-4 flex items-center gap-4 w-full max-w-sm">
        <img src={iconUrl} alt="icon cuaca" className="w-16 h-16 rounded-full bg-slate-400" />
            <div>
                <h2 className="text-lg font-semibold">{weather.name}</h2>
                <p className="text-sm text-gray-600 capitalize">
                {weather.weather[0].description}    
                </p>
                <p className="text-xl font-bold">{weather.main.temp}°C</p>
                <p className="text-sm text-gray-600">Angin: {weather.wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherCard;
