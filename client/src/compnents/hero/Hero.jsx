
import "../../compnents/hero/hero.css"
import { TypeAnimation } from 'react-type-animation';
 
import Search from "../search/Search"
import heroImage from "../../assets/heroImg.png"


const Hero = () => {

    return (
        <div className='relative  '>
            <div className='relative'>

                <section className="h-auto">
                    <div className="  px-4 py-20 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex bg-[#f9fff5] z-0">
                        <div className='flex-none space-y-10 max-w-xl relative'>
                            <div className='absolute inset-0 -top-20 right-10 blur-xl h-[580px] z-1 w-full bg-[#AAD4C1]/30 rounded-full'  ></div>

                            <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl z-0">
                                Get mentorship on <br /> 
                                <span className='text-[#007749]'> 
                                    <TypeAnimation sequence={[
                                    'web devlopment',
                                    1000,
                                    'marketing',
                                    1000,
                                    'web design',
                                    1000,
                                    'Product manager',
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
                      
                            <p className="mt-8">
                                Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                            </p>
                            <Search />

                        </div>
                        <div className='flex-1 hidden md:block relative'>
                            {/* Replace with your image */}
                            <img src={heroImage} className="max-w-2xl relative -top-20 md:-top-32" />
                        </div>
                    </div>
                  
                </section>
            </div>
        </div>
        
    )
}

  
  export default Hero;

