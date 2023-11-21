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
            <Nav currentPage={'leaderboard'}/>
            
            <main className="flex flex-col items-center gap-10 p-4 text-text-secondary">
            <h1 className="font-bold text-3xl text-center my-8">Select a leaderboard to display</h1>

            <div className="flex items-center gap-5 w-5/6 lg:w-1/2">
                <button className={showLeaderboard === 'image1' ? 'bg-secondary text-text-primary font-semibold p-3 border border-secondary rounded-sm w-1/3' : ' p-3 border border-secondary rounded-sm w-1/3 hover:bg-secondary'} onClick={() => getLeaderboard('image1')}>Harbour</button>
                <button className={showLeaderboard === 'image2' ? 'bg-secondary text-text-primary font-semibold p-3 border border-secondary rounded-sm w-1/3' : ' p-3 border border-secondary rounded-sm w-1/3 hover:bg-secondary'} onClick={() => getLeaderboard('image2')}>Science</button>
                <button className={showLeaderboard === 'image3' ? 'bg-secondary text-text-primary font-semibold p-3 border border-secondary rounded-sm w-1/3' : ' p-3 border border-secondary rounded-sm w-1/3 hover:bg-secondary'} onClick={() => getLeaderboard('image3')}>Town</button>
            </div>

           <p className="text-error">{errorMsg}</p>

            <DisplayLeaderboard leaderboard={leaderboard} showLeaderboard={showLeaderboard}/>
            </main>
        </>
    )
}