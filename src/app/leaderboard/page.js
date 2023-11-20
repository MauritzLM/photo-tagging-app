'use client'
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import DisplayLeaderboard from "../components/leaderboard";

export default function LeaderboardPage() {

    // leaderboard state
    const [leaderboard, setLeaderboard] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // function to fetch leaderboard
    async function getLeaderboard(image) {
        try {

            const respone = await fetch('http://localhost:3002/getleaderboard', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ image })

            });

            const result = await respone.json();

            setLeaderboard([...result]);
            setShowLeaderboard(image);
            setErrorMsg('');
            
        }
        catch (error) {
            setErrorMsg('Error: failed to connect to server');
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            
            <main className="flex flex-col items-center gap-5 p-4">
            <h1 className="font-bold text-2xl text-center my-5">Select a leaderboard to display</h1>

            <div className="flex items-center gap-5">
                <button className={showLeaderboard === 'image1' ? 'bg-slate-200 text-white p-3 border border-gray-200 rounded-sm' : ' p-3 border border-gray-200 rounded-sm'} onClick={() => getLeaderboard('image1')}>Harbour</button>
                <button className={showLeaderboard === 'image2' ? 'bg-slate-200 text-white p-3 border border-gray-200 rounded-sm' : ' p-3 border border-gray-200 rounded-sm'} onClick={() => getLeaderboard('image2')}>Science</button>
                <button className={showLeaderboard === 'image3' ? 'bg-slate-200 text-white p-3 border border-gray-200 rounded-sm' : ' p-3 border border-gray-200 rounded-sm'} onClick={() => getLeaderboard('image3')}>Town</button>
            </div>

           <p className="text-rose-600">{errorMsg}</p>

            <DisplayLeaderboard leaderboard={leaderboard} showLeaderboard={showLeaderboard}/>
            </main>
        </>
    )
}