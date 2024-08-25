import React from 'react';
import CardList from './components/VisitHistory/CardList';

const Datas = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        cache: "no-store"
    });
    const datas = await response.json();

    return (
        <>
            <h1 className="text-center text-neutral-700 font-bold text-lg m-5">Data Kunjungan Rumah Sakit</h1>
            {datas.map((data) => {
                return (
                <CardList>
                    <div className="font-semibold rounded-md mb-3 bg-stone-200 p-1">{data.name}</div> 
                    <div className="rounded-md bg-stone-200 p-1">
                        <div>{data.address.zipcode}</div>
                        <div>{data.company.name}</div>
                        <div>{data.company.catchPhrase}</div>
                    </div>
                    
                </CardList>
                );
            })}

        </>
    );
}

export default Datas;