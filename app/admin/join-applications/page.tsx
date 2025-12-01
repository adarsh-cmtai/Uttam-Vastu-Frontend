"use client"

import React, { useState, useEffect } from 'react'
import { MoreVertical, Check, X, Clock, UserCheck, Trash2 } from 'lucide-react'
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

export default function JoinApplicationsPage() {
  const [activeTab, setActiveTab] = useState('New Applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [approved, setApproved] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    setSelectedItems([]);
  }, [activeTab]);

  const handleStatusUpdate = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
        await applicationService.updateStatus(id, status);
        toast.success(`Application has been ${status.toLowerCase()}.`);
        fetchApplications();
    } catch (error) {
        toast.error("Failed to update status.");
    }
    setOpenMenuId(null);
  }

  const handleSelectAll = () => {
    const currentList = activeTab === 'New Applications' ? applications : approved;
    if (selectedItems.length === currentList.length) {
        setSelectedItems([]);
    } else {
        setSelectedItems(currentList.map(app => app._id));
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
        setSelectedItems([...selectedItems, id]);
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} selected items? This cannot be undone.`)) return;
    
    setIsDeleting(true);
    try {
        await applicationService.deleteApplications(selectedItems);
        toast.success("Selected items deleted successfully.");
        
        if (activeTab === 'New Applications') {
            setApplications(prev => prev.filter(app => !selectedItems.includes(app._id)));
        } else {
            setApproved(prev => prev.filter(app => !selectedItems.includes(app._id)));
        }
        setSelectedItems([]);
    } catch (error) {
        toast.error("Failed to delete selected items.");
    } finally {
        setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team & Consultant Management</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Review applications and manage your network of Vastu experts.</p>
        </div>
        {selectedItems.length > 0 && (
            <button 
                onClick={handleBulkDelete} 
                disabled={isDeleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-500 transition-colors shadow-sm"
            >
                <Trash2 size={18} />
                {isDeleting ? 'Deleting...' : `Delete ${selectedItems.length} Selected`}
            </button>
        )}
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
                  <th scope="col" className="px-6 py-3">
                    <input 
                        type="checkbox" 
                        checked={applications.length > 0 && selectedItems.length === applications.length}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qualifications</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Experience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (<tr><td colSpan={7} className="text-center py-10">Loading...</td></tr>) : applications.length === 0 ? (<tr><td colSpan={7} className="text-center py-10">No applications found.</td></tr>) : applications.map((app) => {
                  const statusInfo = statusConfig[app.status];
                  return (
                    <tr key={app._id} className={selectedItems.includes(app._id) ? 'bg-orange-50 dark:bg-orange-900/10' : ''}>
                      <td className="px-6 py-4">
                        <input 
                            type="checkbox" 
                            checked={selectedItems.includes(app._id)}
                            onChange={() => handleSelectItem(app._id)}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
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
          <div className="p-4 sm:p-6">
             <div className="flex items-center mb-4 gap-2">
                <input 
                    type="checkbox"
                    checked={approved.length > 0 && selectedItems.length === approved.length}
                    onChange={handleSelectAll}
                    id="selectAllApproved"
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-5 h-5 cursor-pointer"
                />
                <label htmlFor="selectAllApproved" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">Select All Consultants</label>
             </div>
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                 {loading ? (<p>Loading consultants...</p>) : approved.length === 0 ? (<p className="text-gray-500">No approved consultants yet.</p>) : approved.map((consultant) => (
                   <div 
                      key={consultant._id} 
                      className={`relative rounded-xl border transition-all ${selectedItems.includes(consultant._id) ? 'border-orange-500 ring-2 ring-orange-200 dark:ring-orange-900 bg-orange-50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md'}`}
                   >
                     <div className="absolute top-4 right-4 z-10">
                        <input 
                            type="checkbox"
                            checked={selectedItems.includes(consultant._id)}
                            onChange={() => handleSelectItem(consultant._id)}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-5 h-5 cursor-pointer"
                        />
                     </div>
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
                     <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between rounded-b-xl">
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
          </div>
        )}
      </div>
    </div>
  )
}