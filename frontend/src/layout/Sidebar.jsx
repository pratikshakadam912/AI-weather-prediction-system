import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { WeatherContext } from "../context/WeatherContext";

import {
  FaCloudSun,
  FaHouse,
  FaRobot,
  FaChartLine,
  FaGear,
  FaLocationDot,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import { WiDaySunny } from "react-icons/wi";

function Sidebar() {
  const { weather, theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className={`
          fixed
          top-5
          left-5
          z-50
          lg:hidden
          w-12
          h-12
          rounded-2xl
          flex
          items-center
          justify-center
          shadow-lg
          transition-all

          ${
            isDark
              ? "bg-slate-900 text-white border border-white/10"
              : "bg-white text-slate-700 border border-pink-100"
          }
        `}
      >
        <FaBars />
      </button>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          lg:sticky
          top-0
          left-0
          z-50
          lg:z-10

          h-screen
          w-72

          flex
          flex-col

          transform
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

          ${
            isDark
              ? "bg-[#0B1220] border-r border-white/10"
              : "bg-gradient-to-b from-pink-50 via-white to-blue-50 border-r border-pink-100 shadow-lg"
          }
        `}
      >
        {/* Close Button */}

        <button
          onClick={() => setOpen(false)}
          className={`
            absolute
            top-5
            right-5
            lg:hidden
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center

            ${isDark ? "bg-slate-800 text-white" : "bg-pink-100 text-slate-700"}
          `}
        >
          <FaXmark />
        </button>

        {/* Logo */}

        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-4">
            <div
              className={`
                w-16
                h-16
                rounded-3xl
                flex
                items-center
                justify-center
                shadow-lg

                ${
                  isDark
                    ? "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 shadow-cyan-500/20"
                    : "bg-gradient-to-br from-pink-400 via-sky-400 to-blue-500 shadow-pink-300/40"
                }
              `}
            >
              <FaCloudSun className="text-white text-4xl" />
            </div>

            <div>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                WeatherAI
              </h1>

              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Smart Forecast
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-5 space-y-3 overflow-y-auto">
          <SidebarItem
            icon={<FaHouse />}
            title="Dashboard"
            active
            onClick={() => setOpen(false)}
          />

          <SidebarItem
            icon={<FaCloudSun />}
            title="History"
            onClick={() => setOpen(false)}
          />

          <SidebarItem
            icon={<FaRobot />}
            title="AI Prediction"
            onClick={() => setOpen(false)}
          />

          <SidebarItem
            icon={<FaChartLine />}
            title="Analytics"
            onClick={() => setOpen(false)}
          />

          <SidebarItem
            icon={<FaGear />}
            title="Settings"
            onClick={() => setOpen(false)}
          />
        </nav>

        {/* ================= Current Location ================= */}
        {/* ================= Current Location ================= */}

        <div className="p-5">
          <div
            className={`
                        rounded-3xl
                        backdrop-blur-xl
                        p-5
                        transition-all
                        duration-500

                        ${
                          isDark
                            ? "bg-slate-900/80 border border-white/10"
                            : "bg-white/80 border border-blue-100 shadow-md"
                        }
                    `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                                w-12
                                h-12
                                rounded-2xl
                                flex
                                items-center
                                justify-center

                                ${isDark ? "bg-cyan-500/15" : "bg-blue-100"}
                            `}
              >
                <FaLocationDot
                  className={`text-lg ${
                    isDark ? "text-cyan-400" : "text-blue-500"
                  }`}
                />
              </div>

              <div className="min-w-0">
                <p
                  className={`text-xs uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Current City
                </p>

                <h3
                  className={`font-semibold text-lg truncate ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {weather ? weather.city : "Pune"}
                </h3>
              </div>
            </div>

            <div
              className={`
                            mt-5
                            pt-5
                            flex
                            items-center
                            justify-between

                            ${
                              isDark
                                ? "border-t border-white/10"
                                : "border-t border-slate-200"
                            }
                        `}
            >
              <div>
                <p
                  className={`text-4xl font-bold ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {weather ? `${weather.temperature}°` : "31°"}
                </p>

                <p
                  className={`text-sm mt-1 capitalize ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {weather ? weather.description : "Mostly Sunny"}
                </p>
              </div>

              <div
                className={`
                               w-14
h-14
sm:w-16
sm:h-16
                                rounded-2xl
                                flex
                                items-center
                                justify-center

                                ${isDark ? "bg-yellow-400/10" : "bg-yellow-100"}
                            `}
              >
                <WiDaySunny className="text-yellow-400 text-4xl sm:text-5xl" />
              </div>
            </div>
          </div>

          <p
            className={`text-center text-xs mt-5 ${
              isDark ? "text-slate-600" : "text-slate-500"
            }`}
          >
            {weather ? `Showing weather for ${weather.city}` : "WeatherAI v1.0"}
          </p>
        </div>
      </aside>
    </>
  );
}
function SidebarItem({ icon, title, to, onClick }) {
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        group
        relative
        w-full
        flex
        items-center
        gap-4
        px-5
        py-4
        rounded-2xl
        transition-all
        duration-300

        ${
          isActive
            ? isDark
              ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
              : "bg-gradient-to-r from-pink-100 to-blue-100 border border-pink-200 text-slate-800 shadow-sm"
            : isDark
              ? "text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent"
              : "text-slate-600 hover:bg-pink-50 hover:text-slate-800 border border-transparent"
        }
      `}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div
              className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${
                isDark ? "bg-cyan-400" : "bg-pink-500"
              }`}
            />
          )}

          <span
            className={`text-xl ml-2 ${
              isActive
                ? isDark
                  ? "text-cyan-400"
                  : "text-pink-500"
                : isDark
                  ? "group-hover:text-cyan-400"
                  : "group-hover:text-pink-500"
            }`}
          >
            {icon}
          </span>

          <span className={`font-medium ${isDark ? "" : "text-slate-700"}`}>
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default Sidebar;
