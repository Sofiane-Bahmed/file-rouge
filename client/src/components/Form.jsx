import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { updateMentorProfile } from '../api/mentorService';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import TagInput from './common/TagInput';
import Modal from './common/Modal';

const Form = ({ data, onCancel, refetch }) => {
    const { mentorId } = useParams();

    const [formData, setFormData] = useState({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        domain: data?.domain || "",
        company: data?.company || "",
        experience: data?.experience || "",
        about: data?.about || "",
        skills: data?.skills || [],
        localisation: data?.localisation || "",
        disponibility: data?.disponibility || "",
        responseTime: data?.responseTime || "",
        price: data?.price || "",
    });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleAddSkill = (skill) => {
        if (!formData.skills.includes(skill)) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateMentorProfile(mentorId, formData);
            onCancel(false);
            refetch();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <Modal 
            isOpen={true} 
            onClose={() => onCancel(false)} 
            title="Edit Profile" 
            description="Update your professional information"
        >
            <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="First Name" value={formData.firstName} onChange={handleChange('firstName')} required />
                    <FormInput label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} required />
                    <FormInput label="Domain / Role" value={formData.domain} onChange={handleChange('domain')} placeholder="e.g. Senior Software Engineer" />
                    <FormInput label="Company" value={formData.company} onChange={handleChange('company')} placeholder="e.g. Microsoft" />
                    <FormInput label="Location" value={formData.localisation} onChange={handleChange('localisation')} placeholder="e.g. New York, USA" />
                    <FormInput label="Availability" value={formData.disponibility} onChange={handleChange('disponibility')} placeholder="e.g. Weekends, 6pm - 9pm" />
                    <FormInput label="Price per Month ($)" type="number" value={formData.price} onChange={handleChange('price')} />
                    <FormInput label="Experience Level" value={formData.experience} onChange={handleChange('experience')} placeholder="e.g. 5+ years" />
                    
                    <FormTextarea label="About" value={formData.about} onChange={handleChange('about')} className="md:col-span-2" placeholder="Describe your professional background..." />
                    
                    <TagInput 
                        label="Skills" 
                        tags={formData.skills} 
                        onAddTag={handleAddSkill} 
                        onRemoveTag={handleRemoveSkill} 
                        placeholder="Type a skill and press Enter..."
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

export default Form;