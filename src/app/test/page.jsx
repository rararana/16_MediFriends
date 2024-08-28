"use client"
import CardList from '@/components/VisitHistory/CardList'
import React, { useState } from 'react'
import MobileNav from "@/components/MobileNav";
import NavDashboard from "@/components/NavDashboard";

const page = () => {
    const [nav, setNav] = useState(false);
	const openNav = () => setNav(true);
	const closeNav = () => setNav(false);

  return (
    <>
    <MobileNav nav={nav} closeNav={closeNav} />
    <NavDashboard openNav={openNav} closeNav={closeNav} />
    <div className="mt-28">
        <h1 className="text-center text-neutral-700 font-bold text-3xl mb-12">
            Data Kunjungan Rumah Sakit
        </h1>
    </div>
    <CardList>
        <div className="ml-5 font-semibold rounded-md text-xl mb-3 tracking-wider">
            RS Barromeus
        </div>
        <div className="leading-relaxed mx-5 my-1 pl-5 rounded-md bg-sky-200 bg-opacity-40 text-lg border-sky-100 border-opacity-20 border-2 py-3">
            <div>28-08-2024</div>
            <div>Batuk</div>
            <div>Antihistamin</div>
        </div>
    </CardList>
    <CardList>
    <div className="ml-5 font-semibold rounded-md text-xl mb-3 tracking-wider">
            RS Bhayangkara
        </div>
        <div className="leading-relaxed mx-5 my-1 pl-5 rounded-md  bg-sky-200 bg-opacity-40 text-lg border-sky-100 border-opacity-20 border-2 py-3">
            <div>29-08-2024</div>
            <div>Pilek, Alergi</div>
            <div>Lansoprazole, Paracetamol</div>
        </div>
    </CardList>
    </>
  )
}

export default page