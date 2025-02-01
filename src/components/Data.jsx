import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getClicksData } from "../services";
import "../styles/data.css";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const Data = () => {
  const navigate = useNavigate();
  const [clickData, setClickData] = useState({
    totalClicks: 0,
    datewiseClicks: {},
    deviceClicks: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showData();
  }, []);

  const showData = async () => {
    const res = await getClicksData();
    if (res.status === 200) {
      const data = await res.json(res);
      setClickData({
        totalClicks: data.totalClicks,
        datewiseClicks: data.datewiseClicks,
        deviceClicks: data.deviceClicks,
      });
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const datewiseData = Object.entries(clickData.datewiseClicks)
    .map(([date, clicks]) => ({ date, clicks }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, curr, index) => {
      if (acc.length > 0) {
        curr.clicks += acc[acc.length - 1].clicks;
      }
      acc.push(curr);
      return acc;
    }, [])
    .reverse();

  const deviceData = Object.entries(clickData.deviceClicks).map(
    ([device, clicks]) => ({
      device: device,
      clicks: clicks,
    })
  );

  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text 
        x={x} 
        y={y} 
        dy={5} 
        textAnchor="end"
        style={{ fontSize: "1em" }}
      >
        {payload.value}
      </text>
    );
  };

  const barContainerHeight = Math.max(120, datewiseData.length * 40);


  return (
    <div className="data-container">
      <div className="total-clicks">
        <p>
          Total Clicks <span>{clickData.totalClicks}</span>
        </p>
      </div>
      <div className="click-details">
        <div className="date-wise-clicks">
          <p>Date-wise Clicks</p>

          <ResponsiveContainer
            className="datewise-chart"
            width="90%"
            height={barContainerHeight}
          >
            <BarChart
              data={datewiseData}
              layout="vertical"
              margin={{ right: 30 }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                dataKey="date"
                type="category"
                width={66}
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Bar
                dataKey="clicks"
                fill="blue"
                barSize={20}
                width={"80%"}
                label={{ position: "right", fill: "#3B3C51" }}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="click-devices">
          <p>Click Devices</p>
          <ResponsiveContainer
            className="device-chart"
            width="90%"
            height={120}
          >
            <BarChart
              data={deviceData}
              layout="vertical"
              margin={{ right: 30 }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                dataKey="device"
                type="category"
                width={75}
                axisLine={false}
                tickLine={false}
                tick={{ textAnchor: "start", dx: -67 }}
              />
              <Bar
                dataKey="clicks"
                fill="blue"
                barSize={20}
                width={"80%"}
                margin={{ right: 15 }}
                label={{ position: "right", fill: "#3B3C51" }}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Data;
