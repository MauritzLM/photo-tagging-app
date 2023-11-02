import { useState } from "react";
import Link from "next/link";

export default function LeaderboardForm({ gameInstance, handleNewGame }) {

    const [playerName, setPlayerName] = useState('');
    const [inputError, setInputError] = useState('');
    const [nameUpdated, setNameUpdated] = useState(false);

    // input onchange value
    function handleChange(event) {
        setPlayerName(event.target.value)
    };

    // function to handlesubmit
    async function handleSubmit(event, gameInstance) {
        event.preventDefault();

        try {
            // get form data
            const form = event.target;

            // post request to /leaderboard -> send player_name and game id
            const response = await fetch('http://localhost:3002/leaderboard', {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ name: playerName, id: gameInstance.id })
            });

            const result = await response.json();

            // if validation errors
            if (result.errors) {
                setInputError(result.errors[0].msg)
                return;
            }

            // no errors update state
            setNameUpdated(true);

        }
        catch (error) {
            console.log(error)
        }
    }

    if (nameUpdated) {
        return (
            <>
                <p>Your name has been updated. Thank you for playing.</p>
                <Link href='/leaderboard'>View leaderboards</Link>
                <button onClick={handleNewGame}>Start a new game</button>
            </>
        )
    }
     else {
        return (
            <>
                <h2>Enter your name to submit your time</h2>
                <form onSubmit={(e) => handleSubmit(e, gameInstance)} className="flex flex-col items-center gap-4 max-w-md p-4 border-solid border-2" method="post">

                    <div className="flex flex-col gap-2 w-3/5">
                        <label htmlFor="name">Name</label>
                        <span>(1-20 characters)</span>
                        <input type="text" name="name" id="name" className="border-solid border-2 border-black-600" value={playerName} onChange={handleChange} />
                        <span>{inputError}</span>
                    </div>

                    <button className="w-3/5">Submit</button>
                </form>
            </>
        )
    }
}