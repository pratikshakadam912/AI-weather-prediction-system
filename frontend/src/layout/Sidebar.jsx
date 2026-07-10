import {
    FaCloudSun,
    FaHouse,
    FaRobot,
    FaChartLine,
    FaGear,
    FaLocationDot,
} from "react-icons/fa6";

import { WiDaySunny } from "react-icons/wi";

function Sidebar() {
    return (
        <aside className="w-72 min-h-screen bg-[#0B1220] border-r border-white/10 flex flex-col">

            {/* ================= Logo ================= */}

            <div className="px-8 pt-8 pb-6">

                <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">

                        <FaCloudSun className="text-white text-4xl" />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-white">
                            WeatherAI
                        </h1>

                        <p className="text-slate-400 text-sm mt-1">
                            Smart Forecast
                        </p>

                    </div>

                </div>

            </div>

            {/* ================= Navigation ================= */}

            <nav className="flex-1 px-5 space-y-3">

                <SidebarItem
                    icon={<FaHouse />}
                    title="Dashboard"
                    active
                />

                <SidebarItem
                    icon={<FaCloudSun />}
                    title="History"
                />

                <SidebarItem
                    icon={<FaRobot />}
                    title="AI Prediction"
                />

                <SidebarItem
                    icon={<FaChartLine />}
                    title="Analytics"
                />

                <SidebarItem
                    icon={<FaGear />}
                    title="Settings"
                />

            </nav>

            {/* ================= Current Location ================= */}

            <div className="p-5">

                <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">

                            <FaLocationDot className="text-cyan-400 text-lg" />

                        </div>

                        <div>

                            <p className="text-slate-400 text-xs uppercase tracking-wider">
                                Current City
                            </p>

                            <h3 className="text-white font-semibold text-lg">
                                Pune
                            </h3>

                        </div>

                    </div>

                    <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">

                        <div>

                            <p className="text-4xl font-bold text-white">
                                31°
                            </p>

                            <p className="text-slate-400 text-sm mt-1">
                                Mostly Sunny
                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center">

                            <WiDaySunny className="text-yellow-400 text-5xl" />

                        </div>

                    </div>

                </div>

                <p className="text-center text-xs text-slate-600 mt-5">
                    WeatherAI v1.0
                </p>

            </div>

        </aside>
    );
}

function SidebarItem({ icon, title, active }) {
    return (
        <button
            className={`group relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${active
                ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
                : "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
                }`}
        >

            {active && (
                <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-cyan-400" />
            )}

            <span
                className={`text-xl ml-2 ${active
                    ? "text-cyan-400"
                    : "group-hover:text-cyan-400"
                    }`}
            >
                {icon}
            </span>

            <span className="font-medium">
                {title}
            </span>

        </button>
    );
}

export default Sidebar;