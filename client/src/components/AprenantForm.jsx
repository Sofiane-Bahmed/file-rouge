import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { updateAprenantProfile } from '../api/aprenantService';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import TagInput from './common/TagInput';
import Modal from './common/Modal';

const FormAprenant = ({ data, onCancel, refetch }) => {
    const { aprenantId } = useParams();

    const [formData, setFormData] = useState({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        domainInteret: data?.domainInteret || [],
        goal: data?.goal || "",
        about: data?.about || "",
        disponibility: data?.disponibility || "",
    });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleAddDomain = (domain) => {
        if (!formData.domainInteret.includes(domain)) {
            setFormData({ ...formData, domainInteret: [...formData.domainInteret, domain] });
        }
    };

    const handleRemoveDomain = (domainToRemove) => {
        setFormData({ ...formData, domainInteret: formData.domainInteret.filter(d => d !== domainToRemove) });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateAprenantProfile(aprenantId, formData);
            onCancel(false);
            refetch();
        } catch (error) {
            console.error('Error updating learner profile:', error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <Modal 
            isOpen={true} 
            onClose={() => onCancel(false)} 
            title="Edit Profile" 
            description="Update your learner profile information"
        >
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="First Name" value={formData.firstName} onChange={handleChange('firstName')} required />
                    <FormInput label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} required />
                    <FormInput label="Availability" value={formData.disponibility} onChange={handleChange('disponibility')} placeholder="e.g. Weekdays after 6pm" className="md:col-span-2" />
                    
                    <FormTextarea label="About Me" value={formData.about} onChange={handleChange('about')} className="md:col-span-2" placeholder="Tell potential mentors about yourself..." />
                    
                    <TagInput 
                        label="Interests & Domains" 
                        tags={formData.domainInteret} 
                        onAddTag={handleAddDomain} 
                        onRemoveTag={handleRemoveDomain} 
                        placeholder="Type a domain and press Enter..."
                        className="md:col-span-2"
                    />
                </div>

                <div className="mt-12 flex items-center justify-end gap-4">
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
        </Modal>
    );
};

export default FormAprenant;