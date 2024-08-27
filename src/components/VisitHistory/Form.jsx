'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';

const Form = () => {
  const router = useRouter();
  const [clinicHospitalName, setHospital] = useState("");
  const [visitDate, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)

    const card = {
      id:"3", userId: "cm08fuidt0000to4wrfk5w2xs", visitDate, clinicHospitalName, diagnosis, treatment
    }
    const response = await fetch("/api/visitHistory/createVisitHistory", {
      method: "POST",
      body: JSON.stringify(card)
    })

    if(response.status == 201){
      router.refresh()
      router.push('/card')
    }

  }

  return (
    <>
     <div className="Form">
        <form onSubmit={handleSubmit} className="text-xs m-5">
            <input className="bg-stone-50 mb-1 border-stone-200 border-[0.5px] rounded-md p-1 w-full" required
            type="text"
            value={clinicHospitalName}
            placeholder="Nama Rumah Sakit"
            onChange={(e) => setHospital(e.target.value)}
            />
            <br />
            <input className="bg-stone-50 mb-1 border-stone-200 border-[0.5px] rounded-md p-1 w-full" required
            type="date"
            value={visitDate}
            placeholder="Waktu Berkunjung"
            onChange={(e) => setDate(e.target.value)}
            />
            <input className="bg-stone-50 mb-1 border-stone-200 border-[0.5px] rounded-md p-1 w-full" required
            type="text"
            value={diagnosis}
            placeholder="Diagnosa"
            onChange={(e) => setDiagnosis(e.target.value)}
            />
            
            <input className="bg-stone-50 mb-1 border-stone-200 border-[0.5px] rounded-md p-1 w-full" required
            type="text"
            value={treatment}
            placeholder="Pengobatan"
            onChange={(e) => setTreatment(e.target.value)}
            />
            <br />
            <button className="inline-block ml-100 bg-blue-500 rounded-md p-2 text-white " type="submit" disabled={isLoading}>
              {isLoading && <span>Memproses...</span>}
              {!isLoading && <span>Simpan</span>}
            </button>
        </form>
        </div>
    </>
  )
}

export default Form