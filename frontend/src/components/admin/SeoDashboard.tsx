import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Globe, Activity, FileCode, AlertTriangle } from "lucide-react";
import { adminService } from "@/services/adminService";
import { Link } from "@tanstack/react-router";

export const SeoDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-seo-health"],
    queryFn: () => adminService.getSeoHealth(),
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-700">
        <div className="flex items-center gap-2 font-semibold">
          <AlertCircle className="h-5 w-5" />
          Error Loading SEO Data
        </div>
        <p className="mt-2 text-sm">Could not fetch SEO health metrics. Please try again later.</p>
      </div>
    );
  }

  const {
    healthScore,
    totalPackages,
    activePackages,
    totalBlogs,
    publishedBlogs,
    packageIssues,
    blogIssues,
    sitemapUrl,
    robotsUrl,
  } = data.data;

  const scoreColor =
    healthScore >= 90 ? "text-emerald-500" : healthScore >= 70 ? "text-amber-500" : "text-red-500";

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Health Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your platform's search engine visibility, indexing status, and metadata quality.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:col-span-1 flex flex-col justify-center items-center text-center"
        >
          <div className="mb-2 rounded-full bg-primary/10 p-3">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Overall SEO Health</p>
          <div className={`mt-2 flex items-baseline gap-1 ${scoreColor}`}>
            <span className="text-5xl font-bold tracking-tight">{healthScore}</span>
            <span className="text-xl font-medium">/100</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {healthScore >= 90
              ? "Excellent! Your site is well-optimized."
              : healthScore >= 70
                ? "Good, but there are some issues to fix."
                : "Critical SEO issues found. Action required."}
          </p>
        </motion.div>

        {/* Coverage Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Packages Indexed</p>
                <p className="mt-2 text-3xl font-bold">
                  {activePackages} <span className="text-sm font-normal text-muted-foreground">/ {totalPackages}</span>
                </p>
              </div>
              <div className="rounded-full bg-emerald-500/10 p-3">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/admin/packages" className="text-primary hover:underline font-medium">
                Manage packages →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Articles Indexed</p>
                <p className="mt-2 text-3xl font-bold">
                  {publishedBlogs} <span className="text-sm font-normal text-muted-foreground">/ {totalBlogs}</span>
                </p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <FileCode className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/admin/blogs" className="text-primary hover:underline font-medium">
                Manage blogs →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Issues List - Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col"
        >
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Package SEO Issues
            </h3>
          </div>
          <div className="p-0 flex-1 overflow-auto max-h-[400px]">
            {packageIssues.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <CheckCircle2 className="mb-2 h-8 w-8 text-emerald-500/50" />
                <p>No package SEO issues detected</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {packageIssues.map((pkg: any) => (
                  <li key={pkg.id} className="p-4 hover:bg-muted/20 transition-colors">
                    <p className="font-medium text-sm">{pkg.title}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {pkg.issues.map((issue: string, idx: number) => (
                        <span key={idx} className="inline-flex rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        {/* Issues List - Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col"
        >
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Blog SEO Issues
            </h3>
          </div>
          <div className="p-0 flex-1 overflow-auto max-h-[400px]">
            {blogIssues.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <CheckCircle2 className="mb-2 h-8 w-8 text-emerald-500/50" />
                <p>No blog SEO issues detected</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {blogIssues.map((blog: any) => (
                  <li key={blog.id} className="p-4 hover:bg-muted/20 transition-colors">
                    <p className="font-medium text-sm">{blog.title}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {blog.issues.map((issue: string, idx: number) => (
                        <span key={idx} className="inline-flex rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="font-semibold text-lg mb-4">Crawler Access</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={sitemapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">sitemap.xml</p>
                <p className="text-xs text-muted-foreground mt-0.5">View live XML sitemap</p>
              </div>
            </div>
          </a>
          <a
            href={robotsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <FileCode className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">robots.txt</p>
                <p className="text-xs text-muted-foreground mt-0.5">View indexing rules</p>
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
