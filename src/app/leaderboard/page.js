'use client'
import { useEffect, useState } from "react";
import Nav from "../components/nav"
import DisplayLeaderboard from "../components/leaderboard";

export default function LeaderboardPage() {

    // leaderboard state* (add current selection to change styles)
    const [leaderboard, setLeaderboard] = useState([]);

    // handle button click*

    // function to fetch leaderboard*
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
            
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLeaderboard('image1')
    }, []);

    return (
        <>
            <Nav />
            <h1>Leaderboards page</h1>
            <div>
                <button>Image 1</button>
                <button>Image 2</button>
                <button>Image 3</button>
            </div>

            <DisplayLeaderboard leaderboard={leaderboard}/>
        </>
    )
}