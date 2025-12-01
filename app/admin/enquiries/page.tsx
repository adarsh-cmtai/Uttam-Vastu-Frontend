"use client"

import React, { useState, useEffect, FormEvent } from 'react'
import { MoreVertical, Search, Mail, Phone, Eye, MessageSquare, Check, Send, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast';
import consultationService from '@/services/consultationService';
import enquiryService from '@/services/enquiryService';

type ConsultationRequest = { _id: string; name: string; phone: string; email: string; city: string; purpose: string; propertyType: string; comments: string; createdAt: string; status: 'Pending' | 'Contacted' | 'Resolved'; }
type Enquiry = { _id: string; name: string; email: string; phone: string; subject: string; message: string; createdAt: string; status: 'New' | 'Contacted' | 'Resolved'; }

const statusColors = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Contacted: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
}

const DetailsModal = ({ request, onClose }: { request: ConsultationRequest; onClose: () => void; }) => ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}> <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}> <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Consultation Details</h2> <div className="space-y-4 text-sm"> <div> <h3 className="font-semibold text-gray-500">Client Info</h3> <p><strong>Name:</strong> {request.name}</p> <p><strong>Email:</strong> {request.email}</p> <p><strong>Phone:</strong> {request.phone}</p> <p><strong>City:</strong> {request.city}</p> </div> <hr className="dark:border-gray-600"/> <div> <h3 className="font-semibold text-gray-500">Request Info</h3> <p><strong>Purpose:</strong> {request.purpose}</p> <p><strong>Property Type:</strong> {request.propertyType}</p> <p><strong>Submitted On:</strong> {new Date(request.createdAt).toLocaleString()}</p> </div> <hr className="dark:border-gray-600"/> <div> <h3 className="font-semibold text-gray-500">Comments</h3> <p className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md whitespace-pre-wrap">{request.comments || 'No comments provided.'}</p> </div> </div> <div className="mt-6 text-right"> <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">Close</button> </div> </div> </div> )

const ReplyModal = ({ 
    target, 
    type, 
    onClose, 
    onReplySent 
}: { 
    target: { _id: string; name: string; email: string; subject?: string }; 
    type: 'consultation' | 'enquiry';
    onClose: () => void; 
    onReplySent: (id: string, type: 'consultation' | 'enquiry') => void; 
}) => {
    const defaultSubject = type === 'consultation' 
        ? "Re: Your Vastu Consultation Request"
        : `Re: ${target.subject || 'Your Enquiry'}`;

    const [subject, setSubject] = useState(defaultSubject);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        try {
            if (type === 'consultation') {
                await consultationService.replyToRequest(target._id, { subject, message });
            } else {
                await enquiryService.replyToEnquiry(target._id, { subject, message });
            }
            
            toast.success("Reply sent successfully!");
            onReplySent(target._id, type);
            onClose();
        } catch (error) {
            toast.error("Failed to send reply.");
        } finally {
            setIsSending(false);
        }
    };

    return ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}> 
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}> 
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reply to {target.name}</h2> 
                <form onSubmit={handleSend} className="space-y-4"> 
                    <div> 
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To:</label> 
                        <p className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">{target.email}</p> 
                    </div> 
                    <div> 
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject:</label> 
                        <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"/> 
                    </div> 
                    <div> 
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message:</label> 
                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={8} className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"/> 
                    </div> 
                    <div className="flex justify-end gap-4"> 
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button> 
                        <button type="submit" disabled={isSending} className="px-4 py-2 flex items-center gap-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-500 disabled:opacity-60"> 
                            <Send size={16}/>{isSending ? 'Sending...' : 'Send Reply'} 
                        </button> 
                    </div> 
                </form> 
            </div> 
        </div> 
    );
};

export default function EnquiriesPage() {
  const [activeTab, setActiveTab] = useState('Consultation Requests');
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [replyTarget, setReplyTarget] = useState<{ target: any, type: 'consultation' | 'enquiry' } | null>(null);
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fetchAllData = async () => {
    setLoading(true);
    try {
        const [consultRes, enquiryRes] = await Promise.all([
            consultationService.getAllRequests(),
            enquiryService.getAllEnquiries()
        ]);
        setConsultations(consultRes.data.data);
        setEnquiries(enquiryRes.data.data);
    } catch (error) {
        toast.error("Failed to fetch leads.");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => { fetchAllData() }, []);
  
  useEffect(() => {
      setSelectedItems([]);
  }, [activeTab]);

  const handleEnquiryStatusUpdate = async (id: string, status: 'Contacted' | 'Resolved') => {
      try {
          await enquiryService.updateStatus(id, status);
          toast.success(`Enquiry status updated.`);
          fetchAllData();
      } catch (error) {
          toast.error("Failed to update status.");
      }
      setOpenMenuId(null);
  }
  
  const handleReplySent = (id: string, type: 'consultation' | 'enquiry') => {
    if (type === 'consultation') {
        setConsultations(prev => prev.map(req => req._id === id ? { ...req, status: 'Contacted' } : req));
    } else {
        setEnquiries(prev => prev.map(enq => enq._id === id ? { ...enq, status: 'Contacted' } : enq));
    }
  }

  const getWhatsAppLink = (phone: string, name: string) => {
    const prefilledMessage = encodeURIComponent(`Hello ${name}, thank you for your Vastu consultation request. This is from Vastumaye.`);
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${prefilledMessage}`;
  }
  
  const handleSelectAll = () => {
      if (activeTab === 'Consultation Requests') {
          if (selectedItems.length === consultations.length) {
              setSelectedItems([]);
          } else {
              setSelectedItems(consultations.map(c => c._id));
          }
      } else {
          if (selectedItems.length === enquiries.length) {
              setSelectedItems([]);
          } else {
              setSelectedItems(enquiries.map(e => e._id));
          }
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
      if (!confirm(`Are you sure you want to delete ${selectedItems.length} selected items? This action cannot be undone.`)) return;

      setIsDeleting(true);
      try {
          if (activeTab === 'Consultation Requests') {
              await consultationService.deleteRequests(selectedItems);
              setConsultations(prev => prev.filter(c => !selectedItems.includes(c._id)));
              toast.success("Selected consultation requests deleted.");
          } else {
              await enquiryService.deleteEnquiries(selectedItems);
              setEnquiries(prev => prev.filter(e => !selectedItems.includes(e._id)));
              toast.success("Selected enquiries deleted.");
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
      {selectedRequest && <DetailsModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
      
      {replyTarget && (
        <ReplyModal 
            target={replyTarget.target} 
            type={replyTarget.type} 
            onClose={() => setReplyTarget(null)} 
            onReplySent={handleReplySent} 
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lead & Enquiry Management</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">View and manage all incoming leads from your website.</p>
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
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {['Consultation Requests', 'Contact Enquiries'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'Consultation Requests' ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <input 
                                type="checkbox" 
                                checked={consultations.length > 0 && selectedItems.length === consultations.length}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                            />
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client Details</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Property Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purpose</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (<tr><td colSpan={7} className="text-center py-10">Loading requests...</td></tr>) : consultations.length === 0 ? (<tr><td colSpan={7} className="text-center py-10">No requests found.</td></tr>) : (
                        consultations.map((req) => (
                        <tr key={req._id} className={selectedItems.includes(req._id) ? 'bg-orange-50 dark:bg-orange-900/10' : ''}>
                            <td className="px-6 py-4">
                                <input 
                                    type="checkbox" 
                                    checked={selectedItems.includes(req._id)}
                                    onChange={() => handleSelectItem(req._id)}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 dark:text-white">{req.name}</div><div className="text-sm text-gray-500 dark:text-gray-400">{req.email}</div><div className="text-sm text-gray-500 dark:text-gray-400">{req.phone}</div></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{req.propertyType}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{req.purpose}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusColors[req.status]}`}>{req.status}</span></td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                <button onClick={() => setOpenMenuId(openMenuId === req._id ? null : req._id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><MoreVertical className="h-5 w-5"/></button>
                                {openMenuId === req._id && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                                        <button onClick={() => { setSelectedRequest(req); setOpenMenuId(null); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"><Eye size={14}/> View Full Details</button>
                                        <button onClick={() => { setReplyTarget({ target: req, type: 'consultation' }); setOpenMenuId(null); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"><Mail size={14}/> Reply from Dashboard</button>
                                        <a href={getWhatsAppLink(req.phone, req.name)} target="_blank" rel="noopener noreferrer" className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"><MessageSquare size={14}/> Quick Reply on WhatsApp</a>
                                    </div>
                                )}
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                        <input 
                            type="checkbox" 
                            checked={enquiries.length > 0 && selectedItems.length === enquiries.length}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                        />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (<tr><td colSpan={6} className="text-center py-10">Loading enquiries...</td></tr>) : enquiries.length === 0 ? (<tr><td colSpan={6} className="text-center py-10">No contact enquiries found.</td></tr>) : enquiries.map((enq) => (
                  <tr key={enq._id} className={selectedItems.includes(enq._id) ? 'bg-orange-50 dark:bg-orange-900/10' : ''}>
                    <td className="px-6 py-4">
                        <input 
                            type="checkbox" 
                            checked={selectedItems.includes(enq._id)}
                            onChange={() => handleSelectItem(enq._id)}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900 dark:text-white">{enq.name}</div><div className="text-sm text-gray-500 dark:text-gray-400">{enq.email}</div><div className="text-sm text-gray-500 dark:text-gray-400">{enq.phone}</div></td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-sm truncate">{enq.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(enq.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusColors[enq.status]}`}>{enq.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button onClick={() => setOpenMenuId(openMenuId === enq._id ? null : enq._id)} className="text-gray-500 hover:text-gray-700"><MoreVertical className="h-5 w-5"/></button>
                      {openMenuId === enq._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border dark:border-gray-600">
                            <button onClick={() => { setReplyTarget({ target: enq, type: 'enquiry' }); setOpenMenuId(null); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"><Mail size={14}/> Reply from Dashboard</button>
                            {enq.status === 'New' && <button onClick={() => handleEnquiryStatusUpdate(enq._id, 'Contacted')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"><Check size={14}/> Mark as Contacted</button>}
                            {enq.status !== 'Resolved' && <button onClick={() => handleEnquiryStatusUpdate(enq._id, 'Resolved')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"><Check size={14}/> Mark as Resolved</button>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}