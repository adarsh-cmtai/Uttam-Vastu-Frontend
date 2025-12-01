"use client"

import React, { useState, useEffect } from 'react'
import { Users, MessageSquare, FileText, Briefcase, Download, Calendar } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import dashboardService from '@/services/dashboardService'
import { formatTimeAgo } from '@/lib/utils/time'
import toast from 'react-hot-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface StatCardProps { title: string; value: string; subValue?: string; icon: LucideIcon; color: string; }

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, color }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${color} bg-opacity-10 text-opacity-100`}>
          <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  </div>
)

interface ActivityItem { _id?: string; type: 'enquiry' | 'consultation' | 'application'; person: string; createdAt: string; }

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  const icons = {
    enquiry: <MessageSquare className="h-4 w-4" />,
    consultation: <FileText className="h-4 w-4" />,
    application: <Briefcase className="h-4 w-4" />,
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

export default function DashboardPage() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const fetchDashboardData = async () => {
      setLoading(true);
      try {
          const response = await dashboardService.getDashboardStats(selectedMonth, selectedYear);
          setData(response.data.data);
      } catch (error) {
          toast.error("Failed to load dashboard data.");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth, selectedYear]);

  const handleDownload = async () => {
      setDownloading(true);
      try {
          await dashboardService.downloadReport(selectedMonth, selectedYear);
          toast.success("Report downloaded successfully.");
      } catch (error) {
          toast.error("Failed to download report.");
      } finally {
          setDownloading(false);
      }
  };

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  
  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i);

  if (loading && !data) {
      return <div className="flex h-96 items-center justify-center text-gray-500">Loading dashboard...</div>;
  }

  const { total, monthly, graphData, recentActivity } = data || {};

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Select a period to view statistics and download reports.
            </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="bg-transparent border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-0 cursor-pointer py-2 pl-3 pr-8"
                >
                    {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                </select>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-transparent border-none text-sm font-medium text-gray-900 dark:text-white focus:ring-0 cursor-pointer py-2 pl-3 pr-8"
                >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            
            <button 
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all disabled:opacity-70"
            >
                <Download size={16} />
                {downloading ? 'Downloading...' : 'Export CSV'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
            title="Total Enquiries" 
            value={total?.enquiries || 0} 
            subValue={`+${monthly?.enquiries || 0} this month`} 
            icon={MessageSquare} 
            color="bg-blue-500 text-blue-600"
        />
        <StatCard 
            title="Consultations" 
            value={total?.consultations || 0} 
            subValue={`+${monthly?.consultations || 0} this month`} 
            icon={FileText} 
            color="bg-green-500 text-green-600"
        />
        <StatCard 
            title="Team Applications" 
            value={total?.joinUs || 0} 
            subValue={`${total?.pendingJoinUs || 0} pending review`} 
            icon={Users} 
            color="bg-purple-500 text-purple-600"
        />
        <StatCard 
            title="Monthly Leads" 
            value={monthly?.totalLeads || 0} 
            subValue="All sources combined" 
            icon={Calendar} 
            color="bg-orange-500 text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Activity Trends ({months[selectedMonth - 1]})</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            cursor={{ fill: '#F3F4F6' }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="enquiries" name="Enquiries" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="consultations" name="Consultations" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="applications" name="Join Apps" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[340px] p-0 divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity && recentActivity.length > 0 ? (
                    recentActivity.map((item: ActivityItem, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <ActivityIcon type={item.type} />
                            <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                                {getActivityText(item)}
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(item.createdAt)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500 text-sm">No recent activity found.</div>
                )}
            </div>
          </div>
      </div>
    </div>
  )
}