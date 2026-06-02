import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  DollarSign,
  Package,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { adminService } from "@/services/adminService";

type StatusCard = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
};

const StatCard = ({ stat, index }: { stat: StatusCard; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="bg-card rounded-xl p-6 border shadow-sm"
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
        <h3 className="text-2xl font-bold">{stat.value}</h3>
      </div>
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        <stat.icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span
        className={
          stat.positive
            ? "text-emerald-500 font-medium flex items-center"
            : "text-rose-500 font-medium flex items-center"
        }
      >
        {stat.positive ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        {stat.change}
      </span>
      <span className="text-muted-foreground ml-2">from live dashboard data</span>
    </div>
  </motion.div>
);

export const DashboardOverview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard-overview"],
    queryFn: async () => {
      const [dashboardStats, bookingOverview] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getBookingOverview(),
      ]);

      return {
        dashboardStats: dashboardStats.stats,
        bookingOverview,
      };
    },
  });

  const bookingChartData = useMemo(() => {
    return (data?.bookingOverview.bookingStats || []).map((item) => ({
      name: String(item._id || "unknown"),
      count: item.count,
      revenue: item.totalRevenue || 0,
    }));
  }, [data]);

  const paymentChartData = useMemo(() => {
    return (data?.bookingOverview.paymentStats || []).map((item) => ({
      name: String(item._id || "unknown"),
      count: item.count,
    }));
  }, [data]);

  const totalRevenue = useMemo(
    () => bookingChartData.reduce((sum, item) => sum + (item.revenue || 0), 0),
    [bookingChartData],
  );

  const stats: StatusCard[] = [
    {
      label: "Total Users",
      value: String(data?.dashboardStats.totalUsers ?? 0),
      change: "Live",
      positive: true,
      icon: Users,
    },
    {
      label: "Active Packages",
      value: String(data?.dashboardStats.activePackages ?? 0),
      change: "Live",
      positive: true,
      icon: Package,
    },
    {
      label: "Total Bookings",
      value: String(data?.dashboardStats.totalBookings ?? 0),
      change: "Live",
      positive: true,
      icon: CalendarDays,
    },
    {
      label: "New Inquiries",
      value: String(data?.dashboardStats.newInquiries ?? 0),
      change: "Live",
      positive: true,
      icon: MessageSquare,
    },
    {
      label: "Pending Reviews",
      value: String(data?.dashboardStats.pendingReviews ?? 0),
      change: "Live",
      positive: true,
      icon: ShieldCheck,
    },
    {
      label: "Revenue Total",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "From booking stats",
      positive: true,
      icon: DollarSign,
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-2xl glass border border-border/50 p-10 text-center text-muted-foreground">
        Loading dashboard overview…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl glass border border-red-500/20 bg-red-500/10 p-6 text-red-800">
        <p className="font-semibold">Unable to load dashboard overview</p>
        <p className="text-sm mt-2">
          {error instanceof Error ? error.message : "Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Live business metrics from the site admin backend.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold">Bookings by Status</h3>
            <p className="text-sm text-muted-foreground">
              Count and revenue grouped by booking status.
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bookingChartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold">Payment Status</h3>
            <p className="text-sm text-muted-foreground">
              Breakdown of payment status values from live bookings.
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                  }}
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
