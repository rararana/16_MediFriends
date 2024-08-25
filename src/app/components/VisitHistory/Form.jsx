'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useEffect } from 'react';

const Form = () => {
  const router = useRouter();
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)

    const card = {
      hospital, date, diagnosis, treatment
    }
    //pake fake API untuk sementara waktu
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
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
        <form onSubmit={handleSubmit}>
            <input required
            type="text"
            value={hospital}
            placeholder="Nama Rumah Sakit"
            onChange={(e) => setHospital(e.target.value)}
            />
            <input required
            type="date"
            value={date}
            placeholder="Waktu Berkunjung"
            onChange={(e) => setDate(e.target.value)}
            />
            <input required
            type="text"
            value={diagnosis}
            placeholder="Diagnosa"
            onChange={(e) => setDiagnosis(e.target.value)}
            />
            <input required
            type="text"
            value={treatment}
            placeholder="Pengobatan"
            onChange={(e) => setTreatment(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading && <span>Memproses...</span>}
              {!isLoading && <span>Simpan</span>}
            </button>
        </form>
        </div>
    </>
  )
}

export default Form