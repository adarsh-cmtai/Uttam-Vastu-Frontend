"use client"

import React, { useState, useEffect } from 'react'
import { MoreVertical, Search, Calendar, Check, Clock } from 'lucide-react'
import toast from "react-hot-toast"
import liveSessionService from '@/services/liveSessionService'
import siteVisitService from '@/services/siteVisitService'

type Booking = { _id: string; name: string; contact: string; state: string; chosenPackage: string; qualifications: string; experience: string; createdAt: string; status: 'Payment Pending' | 'Confirmed' | 'Completed'; }
type SiteVisit = { _id: string; name: string; contact: string; location: string; chosenPackage: string; qualifications: string; experience: string; createdAt: string; status: 'Pending Review' | 'Approved' | 'Scheduled'; }

const liveStatusConfig = {
  'Payment Pending': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: Clock },
  'Confirmed': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: Check },
  'Completed': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: Check },
}
const siteVisitStatusConfig = {
  'Pending Review': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', icon: Clock },
  'Approved': { color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300', icon: Check },
  'Scheduled': { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', icon: Calendar },
}

export default function StudentTrainingPage() {
  const [activeTab, setActiveTab] = useState('Live Session Bookings')
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
        const [bookingsRes, siteVisitsRes] = await Promise.all([
            liveSessionService.getAllBookings(),
            siteVisitService.getAllApplications()
        ]);
        setBookings(bookingsRes.data.data);
        setSiteVisits(siteVisitsRes.data.data);
    } catch (error) {
        toast.error("Failed to fetch student session data.");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => { fetchAllData() }, []);

  const handleLiveStatusUpdate = async (id: string, status: 'Confirmed' | 'Completed') => {
      try {
          await liveSessionService.updateStatus(id, status);
          toast.success(`Booking status updated to ${status}.`);
          fetchAllData();
      } catch (error) {
          toast.error("Failed to update status.");
      }
      setOpenMenuId(null);
  }

  const handleSiteVisitStatusUpdate = async (id: string, status: 'Approved' | 'Scheduled') => {
      try {
          await siteVisitService.updateStatus(id, status);
          toast.success(`Application status updated to ${status}.`);
          fetchAllData();
      } catch (error) {
          toast.error("Failed to update status.");
      }
      setOpenMenuId(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student & Training Management</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Manage all student applications for live sessions and site visits.</p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="p-4 sm:p-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {['Live Session Bookings', 'Site Visit Applications'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
        <div className="overflow-x-auto">
          {activeTab === 'Live Session Bookings' && (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profile</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                    <tr><td colSpan={6} className="text-center py-10">Loading bookings...</td></tr>
                ) : bookings.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-10">No live session bookings found.</td></tr>
                ) : bookings.map((booking) => {
                  const statusInfo = liveStatusConfig[booking.status];
                  return (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.contact}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.chosenPackage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div><strong>Qual:</strong> {booking.qualifications}</div>
                          <div><strong>Exp:</strong> {booking.experience}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                              <statusInfo.icon className="h-3 w-3" />{booking.status}
                          </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button onClick={() => setOpenMenuId(openMenuId === booking._id ? null : booking._id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><MoreVertical className="h-5 w-5"/></button>
                        {openMenuId === booking._id && booking.status === 'Payment Pending' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                <button onClick={() => handleLiveStatusUpdate(booking._id, 'Confirmed')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Check size={14}/> Mark as Confirmed
                                </button>
                            </div>
                        )}
                        {openMenuId === booking._id && booking.status === 'Confirmed' && (
                             <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                <button onClick={() => handleLiveStatusUpdate(booking._id, 'Completed')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <Check size={14}/> Mark as Completed
                                </button>
                            </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {activeTab === 'Site Visit Applications' && (
             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Package</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profile</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                    <tr><td colSpan={6} className="text-center py-10">Loading applications...</td></tr>
                ) : siteVisits.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-10">No site visit applications found.</td></tr>
                ) : siteVisits.map((app) => {
                  const statusInfo = siteVisitStatusConfig[app.status];
                  return (
                    <tr key={app._id}>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</div><div className="text-sm text-gray-500 dark:text-gray-400">{app.contact}</div><div className="text-sm text-gray-500 dark:text-gray-400">{app.location}</div></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.chosenPackage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"><div><strong>Qual:</strong> {app.qualifications}</div><div><strong>Exp:</strong> {app.experience}</div></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusInfo.color}`}><statusInfo.icon className="h-3 w-3" />{app.status}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button onClick={() => setOpenMenuId(openMenuId === app._id ? null : app._id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><MoreVertical className="h-5 w-5"/></button>
                        {openMenuId === app._id && app.status === 'Pending Review' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                <button onClick={() => handleSiteVisitStatusUpdate(app._id, 'Approved')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600"><Check size={14}/> Mark as Approved</button>
                            </div>
                        )}
                        {openMenuId === app._id && app.status === 'Approved' && (
                             <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                <button onClick={() => handleSiteVisitStatusUpdate(app._id, 'Scheduled')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-600"><Calendar size={14}/> Mark as Scheduled</button>
                            </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}