"use client";

import { useState } from 'react';

export default function VaccineHistory() {
    const [vaccines, setVaccines] = useState([]);
    const [form, setForm] = useState({
        vaccineName: '',
        date: '',
        hospitalName: '',
    });
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updateVaccines = vaccines.map((vaccine, index) =>
                index === editIndex ? form : vaccine
            );
            setVaccines(updateVaccines);
            setEditIndex(null);
        } else {
            setVaccines([...vaccines, form]);
        }
    
    setForm({ vaccineName: '', date: '', hospitalName: '' });
    };

    const handleEdit = (index) => {
        setForm(vaccines[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setVaccines(vaccines.filter((_,i) => i !== index));
    };

    return (
        <div>
        <h1>Vaccine History</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Vaccine Name:</label>
            <input
                type="text"
                name="vaccineName"
                value={form.vaccineName}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <label>Vaccine Date:</label>
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <label>Hospital Name:</label>
            <input
                type="text"
                name="hospitalName"
                value={form.hospitalName}
                onChange={handleInputChange}
                required
            />
            </div>
            <button type="submit">
                {editIndex !== null ? 'Update Vaccine' : 'Add Vaccine'}
            </button>
            {editIndex !== null && (
                <>
                    <br />
                    <button
                        type="button"
                        onClick={() => {
                            setForm({ vaccineName: '', date: '', hospitalName: ''});
                            setEditIndex(null);
                            }}
                        >
                            Cancel Edit
                        </button>
                    </>
            )}
        </form>

        <br />
        <h2>Vaccine List</h2>
        <ul>
            {vaccines.map((vaccine, index) => (
            <li key={index}>
                <strong>{vaccine.vaccineName}</strong><br />
                Date: {vaccine.date}<br />
                Hospital Name: {vaccine.hospitalName}
                <div>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <br />
                    <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
}
