"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", "Average Score": 55 },
  { month: "Feb", "Average Score": 60 },
  { month: "Mar", "Average Score": 61 },
  { month: "Apr", "Average Score": 72 },
  { month: "May", "Average Score": 80 },
  { month: "Jun", "Average Score": 88 },
];

const Chart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[40, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="Average Score" stroke="#EC6530" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;