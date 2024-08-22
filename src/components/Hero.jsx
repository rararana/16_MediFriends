import React from 'react';

const Hero = () => {
  return (
    <div className="container mx-auto my-5 p-4 h-[150vh] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="md:col-span-2 flex flex-col space-y-4"> 
          <div className="hero-box bg-[#6BC2EB] min-h-[250px] flex items-center pl-10">
            <h1 className="text-[4rem] lg:text-[6rem] font-playfair font-bold">Medi
              <span className='text-white'>Friends</span>
            </h1>
          </div>
          <div className="hero-box bg-gray-300 flex-grow max-h-[420px] bg-[url('/images/hero-img-2.jpeg')] bg-cover bg-center"></div>
          <div className="grid grid-cols-5 gap-4 h-1/7 flex-grow">
            <div className="hero-box col-span-3 bg-gray-400 bg-[url('/images/hero-img-3.jpeg')] bg-cover bg-center"></div>
            <div className="hero-box col-span-2 bg-gray-100 bg-[url('/images/hero-img-4.jpeg')] bg-cover bg-center"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 h-full">
          <div className="hero-box bg-gray-200 h-2/5 bg-[url('/images/hero-img-1.jpeg')] bg-cover bg-center"></div>
          <div className="hero-box bg-[#6BC2EB] flex-grow flex h-3/5 items-center justify-center">
          <h2 className="text-[2rem] md:text-[2.5rem] xl:text-[5rem] text-white font-semibold font-playfair text-left overflow-hidden">
            <div className="flex md:flex-col">
              {/* Below md screen */}
              <span className="inline md:hidden mr-4">Your</span>
              <span className="inline md:hidden text-black mr-4">Health</span>
              <div className="inline md:hidden">
                <span>Tool</span>
                <span className='text-black ml-5 mr-4'>&</span>
              </div>
              <span className="inline md:hidden text-black">Assistant</span>
              
              {/* Above md screen */}
              <div className="hidden md:block md:flex md:flex-col">
                <span>Your</span>
                <span className='text-black'>Health</span>
                <div className="flex items-center">
                  <span>Tool</span>
                  <span className='text-black ml-5'>&</span>
                </div>
                <span className='text-black'>Assistant</span>
              </div>
            </div>
          </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
