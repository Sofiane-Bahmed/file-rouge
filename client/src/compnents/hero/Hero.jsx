
import { TypeAnimation } from 'react-type-animation';

import Search from "../search/Search"
import heroImage from "../../assets/heroImg.png"

const Hero = () => {

    return (
        <div className='relative bg-gradient-to-b from-white via-[#f9fff5] to-[#f0f9f1] overflow-hidden'>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pt-10 md:pb-32 lg:pb-40">
                {/* Modern subtle mesh background effect */}
                <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-radial from-[#57F2CC]/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-radial from-[#AAD4C1]/20 to-transparent rounded-full blur-3xl"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className='space-y-8 relative z-10'>
                        <div className='absolute -top-20 -left-20 blur-3xl h-[400px] w-[400px] bg-[#AAD4C1]/20 rounded-full -z-10'></div>

                        <h1 className="text-4xl text-gray-900 font-extrabold sm:text-5xl lg:text-6xl leading-tight">
                            Get mentorship on <br /> 
                            <span className='text-[#007749]'> 
                                <TypeAnimation sequence={[
                                    'web development',
                                    1000,
                                    'marketing',
                                    1000,
                                    'web design',
                                    1000,
                                    'Product management',
                                    1000,
                                    'Digital marketing',
                                    1000,
                                    'Data science',
                                    1000,
                                    'graphic design',
                                    1000,
                                    'Cybersecurity',
                                    1000,
                                ]}
                                    speed={60}
                                    className='text-accent'
                                    wrapper='span'
                                    repeat={Infinity}
                                />
                            </span>   
                        </h1>

                        <p className="text-lg text-gray-600 max-w-lg">
                            Connect with expert mentors and accelerate your career. Our community of professionals is here to guide you through every step of your journey.
                        </p>

                        <div className="max-w-md">
                            <Search />
                        </div>
                    </div>

                    <div className='hidden md:block relative'>
                        <div className='absolute -bottom-10 -right-10 blur-2xl h-[300px] w-[300px] bg-[#57F2CC]/10 rounded-full'></div>
                        <img 
                            src={heroImage} 
                            alt="Mentorship Hero"
                            className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Hero;

