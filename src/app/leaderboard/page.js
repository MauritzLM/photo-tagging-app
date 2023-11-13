'use client'
import { useEffect, useState } from "react";
import Nav from "../components/nav"
import DisplayLeaderboard from "../components/leaderboard";

export default function LeaderboardPage() {

    // leaderboard state
    const [leaderboard, setLeaderboard] = useState([]);
    const [showLeaderboard, setShowLeaderboard] = useState('');

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
            
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Nav />
            <h1>Leaderboards page</h1>

            <p>Select a leaderboard to display</p>

            <div>
                <button className={showLeaderboard === 'image1' ? 'bg-slate-500 text-white' : ''} onClick={() => getLeaderboard('image1')}>Image 1</button>
                <button className={showLeaderboard === 'image2' ? 'bg-slate-500 text-white' : ''} onClick={() => getLeaderboard('image2')}>Image 2</button>
                <button className={showLeaderboard === 'image3' ? 'bg-slate-500 text-white' : ''}>Image 3</button>
            </div>

            <DisplayLeaderboard leaderboard={leaderboard} showLeaderboard={showLeaderboard}/>
        </>
    )
}