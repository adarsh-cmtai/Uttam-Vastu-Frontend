"use client"

import React, { useState, useEffect } from 'react'
import { MoreVertical, Check, X, Clock, UserCheck, Star, Briefcase, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import applicationService from '@/services/applicationService'

type Application = {
  _id: string
  name: string
  contact: string
  state: string
  address: string
  qualifications: string
  experience: string
  createdAt: string
  status: 'Pending Review' | 'Approved' | 'Rejected'
}

const statusConfig = {
  'Pending Review': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', icon: Clock },
  'Approved': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: Check },
  'Rejected': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: X },
}

const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => { /* No change here */ }

const ApplicationDetailsModal = ({ app, onClose }: { app: Application; onClose: () => void; }) => { /* Modal component for details */ }


export default function JoinApplicationsPage() {
  const [activeTab, setActiveTab] = useState('New Applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [approved, setApproved] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
        const response = await applicationService.getAllApplications();
        const allApps: Application[] = response.data.data;
        setApplications(allApps.filter(a => a.status !== 'Approved'));
        setApproved(allApps.filter(a => a.status === 'Approved'));
    } catch (error) {
        toast.error("Failed to fetch applications.");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => { fetchApplications() }, []);

  const handleStatusUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
        await applicationService.updateStatus(id, status);
        toast.success(`Application has been ${status.toLowerCase()}.`);
        fetchApplications(); // Refetch data to update lists
    } catch (error) {
        toast.error("Failed to update status.");
    }
    setOpenMenuId(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team & Consultant Management</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Review applications and manage your network of Vastu experts.</p>
      </div>
      
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="p-4 sm:p-6">
           <div className="border-b border-gray-200 dark:border-gray-700"> <nav className="-mb-px flex space-x-6" aria-label="Tabs"> {['New Applications', 'Approved Consultants'].map((tab) => ( <button key={tab} onClick={() => setActiveTab(tab)} className={`${ activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600' } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}> {tab} </button> ))} </nav> </div>
        </div>

        {activeTab === 'New Applications' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qualifications</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (<tr><td colSpan={6} className="text-center py-10">Loading...</td></tr>) : applications.map((app) => {
                  const statusInfo = statusConfig[app.status];
                  return (
                    <tr key={app._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{app.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{app.contact}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{app.state}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{app.qualifications}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.experience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                          <statusInfo.icon className="h-3 w-3" />
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button onClick={() => setOpenMenuId(openMenuId === app._id ? null : app._id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><MoreVertical className="h-5 w-5"/></button>
                        {openMenuId === app._id && app.status === 'Pending Review' && (
                             <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                <button onClick={() => handleStatusUpdate(app._id, 'Approved')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-600"><Check size={14}/> Approve</button>
                                <button onClick={() => handleStatusUpdate(app._id, 'Rejected')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"><X size={14}/> Reject</button>
                            </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Approved Consultants' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {loading ? (<p>Loading consultants...</p>) : approved.map((consultant) => (
               <div key={consultant._id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-md">
                 <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <UserCheck className="h-10 w-10 text-orange-500" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{consultant.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{consultant.state}</p>
                            </div>
                        </div>
                    </div>
                 </div>
                 <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Joined On</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{new Date(consultant.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button className="rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
                        View Profile
                    </button>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  )
}