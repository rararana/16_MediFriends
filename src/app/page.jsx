"use client";

import React, { useState } from 'react';
import Form from './components/Form';

export default function Profile() {

    const ProfileCard = ({ user }) => (
        <div style={styles.card}>
            <div style={styles.header}>
                <img
                    src="https://via.placeholder.com/100"
                    alt="profile"
                    style={styles.profileImage}
                />
                <h2>Hello, {user.name}</h2>
            </div>
            <div style={styles.infoContainer}>
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Height:</strong> {user.height} cm</p>
                    <p><strong>Weight:</strong> {user.weight} kg</p>
                    <p><strong>BMI:</strong> {user.bmi}</p>
                </div>
                <div>
                    <p><strong>Blood Type:</strong> {user.bloodType}</p>
                    <p><strong>Allergy:</strong> {user.allergy}</p>
                    <p><strong>Chronic Disease:</strong> {user.chronicDisease}</p>
                </div>
            </div>
        </div>
    );

    const user = {
        name: "John Doe",
        age: 30,
        height: 175,
        weight: 70,
        bmi: 22.9,
        bloodType: "O",
        allergy: "None",
        chronicDisease: "None"
    };

    return (
        <>
            <ProfileCard user={user} />
            <Form />
        </>
    );
}

const styles = {
    card: {
        backgroundColor: '#87CEEB',
        padding: '20px',
        borderRadius: '10px',
        width: '350px',
        margin: '20px auto',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    header: {
        textAlign: 'center',
    },
    profileImage: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    form: {
        backgroundColor: '#87CEEB',
        padding: '20px',
        borderRadius: '10px',
        width: '350px',
        margin: '20px auto',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    }
};
