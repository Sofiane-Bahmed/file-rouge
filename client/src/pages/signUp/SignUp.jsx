import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/userService';
import logo from "../../assets/logo.png";
import FormInput from "../../components/common/FormInput";

const SignUp = () => {
    const [formData, setFormData] = useState({
        userRole: 'aprenant',
        firstName: '',
        lastName: '',
        mail: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { firstName, lastName, mail, password, userRole } = formData;
        
        if (firstName && lastName && mail && password && userRole) {
            try {
                await signUp(formData);
                navigate('/logIn');
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'Registration failed');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-[#F9FFF5] lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <img src={logo} width={250} alt="Logo" />
                    <div className="mt-16 space-y-3">
                        <h3 className="text-[#007749] text-3xl font-bold">Find your mentor and progress</h3>
                        <p className="text-gray-600">
                            Create an account and get access to all features 
                        </p>
                        <div className="flex items-center -space-x-2 overflow-hidden">
                            {[79, 80, 81, 86, 82].map(id => (
                                <img key={id} src={`https://randomuser.me/api/portraits/${id % 2 === 0 ? 'men' : 'women'}/${id}.jpg`} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                            ))}
                            <p className="text-sm text-gray-400 font-medium translate-x-5">
                                Join 5.000+ users
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 my-auto h-[500px]"
                    style={{
                        background: "linear-gradient(152.92deg, rgba(0, 119, 73, 0.2) 4.54%, rgba(0, 119, 73, 0.26) 34.2%, rgba(170, 212, 193, 0.1) 77.55%)", filter: "blur(118px)"
                    }}
                ></div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div>
                        <img src={logo} width={150} className="lg:hidden" alt="Logo" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                            <p>Already have an account? <Link to="/logIn" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
                        </div>
                    </div>
                   
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="font-medium text-sm text-gray-700 uppercase tracking-wider">User Role</label>
                            <select 
                                className='w-full mt-2 px-4 py-3 text-gray-500 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#007749]/20 focus:border-[#007749] outline-none transition-all'
                                value={formData.userRole}
                                onChange={handleChange('userRole')}
                            >
                                <option value="aprenant">Learner</option>
                                <option value="mentor">Mentor</option>
                             </select>
                        </div>

                        <FormInput label="First Name" value={formData.firstName} onChange={handleChange('firstName')} required placeholder="first name" />
                        <FormInput label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} required placeholder="last name" />
                        <FormInput label="Email" type="email" value={formData.mail} onChange={handleChange('mail')} required placeholder="email" />
                        <FormInput label="Password" type="password" value={formData.password} onChange={handleChange('password')} required placeholder="password" />

                        <button
                            className="w-full px-4 py-3 text-white font-bold bg-[#AAD4C1] hover:bg-[#7EC7A6] active:bg-[#7EC7A6] rounded-xl duration-150 shadow-md"
                            type='submit'
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default SignUp;