"use client"

import React, { useState, useEffect } from 'react'
import { Users, MessageSquare, FileText, Briefcase, Clock, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import dashboardService from '@/services/dashboardService'
import { formatTimeAgo } from '@/lib/utils/time'
import toast from 'react-hot-toast'

interface StatCardProps { title: string; value: string; icon: LucideIcon; }
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"><Icon className="h-5 w-5" /></div>
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
)

interface ActivityItem { _id?: string; type: 'enquiry' | 'consultation' | 'application'; person: string; createdAt: string; }
const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  const icons = {
    enquiry: <MessageSquare className="h-4 w-4" />,
    consultation: <FileText className="h-4 w-4" />,
    application: <UserPlus className="h-4 w-4" />,
  };
  const colors = {
    enquiry: 'bg-blue-100 text-blue-600',
    consultation: 'bg-green-100 text-green-600',
    application: 'bg-purple-100 text-purple-600',
  }
  return <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors[type]}`}>{icons[type]}</div>
}

const getActivityText = (item: ActivityItem) => {
  switch (item.type) {
    case 'enquiry': return <p>New contact enquiry from <strong>{item.person}</strong></p>
    case 'consultation': return <p>Consultation request from <strong>{item.person}</strong></p>
    case 'application': return <p><strong>{item.person}</strong> applied to join the team</p>
    default: return ''
  }
}

interface StatsData { todaysNewLeads: number; totalEnquiries: number; totalConsultations: number; totalJoinUs: number; pendingJoinUs: number; }

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await dashboardService.getDashboardStats();
            setStats(response.data.data.stats);
            setActivityFeed(response.data.data.recentActivity);
        } catch (error) {
            toast.error("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  const statCards: StatCardProps[] = [
    { title: "Today's New Leads", value: loading ? '...' : String(stats?.todaysNewLeads || 0), icon: Users },
    { title: 'Total Contact Enquiries', value: loading ? '...' : String(stats?.totalEnquiries || 0), icon: MessageSquare },
    { title: 'Total Consultation Requests', value: loading ? '...' : String(stats?.totalConsultations || 0), icon: FileText },
    { title: 'Total Join Us Applications', value: loading ? '...' : String(stats?.totalJoinUs || 0), icon: Briefcase },
    { title: 'Pending Join Us Apps', value: loading ? '...' : String(stats?.pendingJoinUs || 0), icon: Clock },
  ]

  return (
    <div className="space-y-8">
      <div><h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1><p className="mt-1 text-gray-600 dark:text-gray-400">Welcome back, Admin! Here's a summary of your website's activity.</p></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{statCards.map((stat) => (<StatCard key={stat.title} {...stat} />))}</div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6"><h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity Feed</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A log of the most recent form submissions.</p></div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? <div className="p-6 text-center text-gray-500">Loading activity...</div>
            : activityFeed.length === 0 ? <div className="p-6 text-center text-gray-500">No recent activity.</div>
            : activityFeed.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <ActivityIcon type={item.type} />
                    <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                        {getActivityText(item)}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(item.createdAt)}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}