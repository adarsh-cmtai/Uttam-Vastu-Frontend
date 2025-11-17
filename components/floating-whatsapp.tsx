"use client"

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData { name: string; email: string; phone: string; subject: string; message: string; }

export default function FloatingWhatsApp() {
    const { t } = useLanguage();
    const content = t.floatingWhatsApp;

    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const initialData: FormData = { name: '', email: '', phone: '', subject: 'Vastu Enquiry via Website Chat', message: '' };
    const [formData, setFormData] = useState<FormData>(initialData);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const whatsappMessage = `*New Enquiry from Website Chat*\n--------------------------------\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`.trim().replace(/\n\s+/g, '\n');

        const adminWhatsAppNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER;
        if (adminWhatsAppNumber) {
            const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            console.error("Admin WhatsApp number not configured in .env.local");
        }
        
        setFormData(initialData);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute bottom-[80px] right-0 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200"
                    >
                        <header className="bg-[#075E54] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#075E54]"><User size={24} /></div>
                                <div>
                                    <h3 className="font-bold">{content.headerTitle}</h3>
                                    <p className="text-xs opacity-80">{content.headerCaption}</p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/20 cursor-pointer"><X size={20} /></button>
                        </header>
                        
                        <div className="p-4 h-96 overflow-y-auto bg-gray-100">
                            <div className="bg-white p-3 rounded-lg shadow-sm mb-4 max-w-[85%]">
                                <p className="text-sm text-gray-800">{content.welcomeMessage}</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input type="text" name="name" placeholder={content.placeholderName} value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                                <input type="email" name="email" placeholder={content.placeholderEmail} value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                                <input type="tel" name="phone" placeholder={content.placeholderPhone} value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                                <input type="text" name="subject" placeholder={content.placeholderSubject} value={formData.subject} onChange={handleChange} required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                                <textarea name="message" placeholder={content.placeholderMessage} value={formData.message} onChange={handleChange} required rows={3} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
                                
                                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#128C7E] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#075E54] transition-colors cursor-pointer">
                                    <Send size={18} />
                                    {content.buttonSend}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-end">
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="mr-3 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg whitespace-nowrap"
                        >
                            {content.tooltip}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={toggleChat}
                    className="bg-[#25D366] text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:bg-green-600 transition shadow-lg cursor-pointer"
                    aria-label="Chat on WhatsApp"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <X /> : <MessageSquare />}
                </motion.button>
            </div>
        </div>
    );
}