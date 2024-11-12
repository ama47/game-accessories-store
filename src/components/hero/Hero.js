import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../images/hero.jpg";

export default function Hero() {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-pink-900 to-orange-500 py-16 font-[sans-serif]">
        <div className="absolute inset-0">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl mb-12">
            Experience excellence like never before with our exclusive
            accessories and services.
          </p>
          <Link to="/products">
            <button
              type="button"
              className="bg-pink-600 hover:bg-pink-700 text-white text-base tracking-wide px-6 py-3 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              Shop Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
