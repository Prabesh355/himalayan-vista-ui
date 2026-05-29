import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Users, DollarSign, Package, CalendarDays, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', positive: true, icon: DollarSign },
  { label: 'Total Bookings', value: '256', change: '+12.5%', positive: true, icon: CalendarDays },
  { label: 'Active Packages', value: '42', change: '-4.2%', positive: false, icon: Package },
  { label: 'Total Users', value: '1,234', change: '+8.1%', positive: true, icon: Users },
];

const revenueData = [
  { name: 'Jan', total: 15400 },
  { name: 'Feb', total: 22300 },
  { name: 'Mar', total: 18400 },
  { name: 'Apr', total: 29800 },
  { name: 'May', total: 24500 },
  { name: 'Jun', total: 34500 },
  { name: 'Jul', total: 45200 },
];

const bookingsData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 25 },
  { name: 'Fri', count: 32 },
  { name: 'Sat', count: 45 },
  { name: 'Sun', count: 38 },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-card rounded-xl p-6 border shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
        <h3 className="text-2xl font-bold">{stat.value}</h3>
      </div>
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        <stat.icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={stat.positive ? "text-emerald-500 font-medium flex items-center" : "text-rose-500 font-medium flex items-center"}>
        {stat.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {stat.change}
      </span>
      <span className="text-muted-foreground ml-2">vs last month</span>
    </div>
  </motion.div>
);

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your business performance and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue breakdown for the year.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3 bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold">Weekly Bookings</h3>
            <p className="text-sm text-muted-foreground">Number of bookings processed this week.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
