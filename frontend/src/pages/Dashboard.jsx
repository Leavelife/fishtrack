import WeatherCard from "../components/WeatherCard"
import WeeklyForecast from "../components/WeeklyForecast"

const Dashboard = () => {
    return (
        <>
        <div className="mt-16 w-full h-screen">
            <div className="flex">
                <div className="overflow-y-auto w-full md:w-1/6 h-screen border-r bg-[#f3f3f3] border-[#4c4c4c]">Side bar</div>
                <section className="flex w-screen">
                    <div className="bg-slate-200 w-1/3">Data kolam</div>
                    <div>
                        <WeatherCard />
                        <WeeklyForecast />
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}

export default Dashboard