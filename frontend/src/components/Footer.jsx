import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div class="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 py-5">
      <div class="flex flex-wrap justify-between gap-12 md:gap-6">
        <div class="max-w-80">
            <img alt="logo" class="mb-4 h-8 md:h-9 invert opacity-80" src={assets.logo}/>
            <p class="text-sm">Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.</p>
                <div class="flex items-center gap-3 mt-4">
                    <img alt="instagram-icon" class="w-6" src={assets.instagramIcon}/>
                </div>
        </div>
           
        <div>
            <p class="font-playfair text-lg text-gray-800">COMPANY</p>
            <ul class="mt-3 flex flex-col gap-2 text-sm">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Partners</a></li>
            </ul>
            
        </div>
        
        <div>
            <p class="font-playfair text-lg text-gray-800">SUPPORT</p>
            
            <ul class="mt-3 flex flex-col gap-2 text-sm">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Safety Information</a></li>
                <li><a href="#">Cancellation Options</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Accessibility</a></li>
            </ul>
        </div>
        
        <div class="max-w-80">
            <p class="font-playfair text-lg text-gray-800">STAY UPDATED</p>
            <p class="mt-3 text-sm">Subscribe to our newsletter for travel inspiration and special offers.</p>
            
            <div class="flex items-center mt-4">
                <input class="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none" placeholder="Your email" type="text"/>
                <button class="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
                    <img alt="arrow-icon" class="w-3.5 invert" src={assets.arrowIcon}/>
                </button>
            </div>
        </div>
    </div>
    
    
    </div>
    </div>
  )
}

export default Footer;
