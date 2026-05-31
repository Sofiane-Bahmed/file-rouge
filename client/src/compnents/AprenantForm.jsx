import React, { useState } from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { MdClose, MdAdd } from 'react-icons/md';

const FormAprenant = ({ data, onCancel, refetch }) => {
    let { aprenantId } = useParams()

    const [firstName, setFirstName] = useState(data?.firstName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const [domainInteret, setDomainInteret] = useState(data?.domainInteret || []);
    const [goal, setGoal] = useState(data?.goal || "");
    const [about, setAbout] = useState(data?.about || "");
    const [disponibility, setDisponibility] = useState(data?.disponibility || "");
    const [domainValue, setDomainValue] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            firstName, lastName, domainInteret, goal, disponibility, about
        };

        try {
            await axios.put(`http://localhost:8082/aprenants/updateApprenantProfile/${aprenantId}`, formData, {
                withCredentials: true
            });
            onCancel(false);
            refetch(prev => !prev);
        } catch (error) {
            console.error('Error updating learner profile:', error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleAddDomain = (e) => {
        if (e.key === "Enter" && domainValue.trim() !== "") {
            e.preventDefault();
            if (!domainInteret.includes(domainValue.trim())) {
                setDomainInteret([...domainInteret, domainValue.trim()]);
            }
            setDomainValue("");
        }
    };

    const removeDomain = (domainToRemove) => {
        setDomainInteret(domainInteret.filter(d => d !== domainToRemove));
    };

    return (
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                    <p className="text-sm text-gray-500">Update your learner profile information</p>
                </div>
                <button 
                    onClick={() => onCancel(false)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                    <MdClose size={24} />
                </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Names */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Availability</label>
                        <input
                            type="text"
                            value={disponibility}
                            onChange={(e) => setDisponibility(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all"
                            placeholder="e.g. Weekdays after 6pm"
                        />
                    </div>

                    {/* About Full Width */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">About Me</label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all resize-none"
                            placeholder="Tell potential mentors about yourself..."
                        />
                    </div>

                    {/* Domains Full Width */}
                    <div className="md:col-span-2 space-y-4">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Interests & Domains</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={domainValue}
                                onChange={(e) => setDomainValue(e.target.value)}
                                onKeyDown={handleAddDomain}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all pl-12"
                                placeholder="Type a domain and press Enter..."
                            />
                            <MdAdd className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {domainInteret.map((domain, idx) => (
                                <span 
                                    key={idx} 
                                    className="flex items-center gap-2 px-3 py-1.5 bg-[#F0F9F1] text-[#007749] rounded-full text-sm font-bold border border-[#AAD4C1]/30 group hover:border-[#007749] transition-all"
                                >
                                    {domain}
                                    <button 
                                        type="button"
                                        onClick={() => removeDomain(domain)}
                                        className="text-[#007749]/50 hover:text-red-500 transition-colors"
                                    >
                                        <MdClose size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-12 flex items-center justify-end gap-4 pb-4">
                    <button
                        type="button"
                        onClick={() => onCancel(false)}
                        className="px-8 py-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-10 py-3 bg-[#007749] text-white font-bold rounded-xl shadow-lg shadow-[#007749]/20 hover:bg-[#00663d] transition-all transform hover:scale-[1.02]"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormAprenant;