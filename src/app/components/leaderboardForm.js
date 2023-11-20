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
                <h2 className="my-4 text-xl text-center">Your name has been updated. Thank you for playing.</h2>
                <Link className="text-blue-600 my-2 underline text-lg hover:no-underline" href='/leaderboard'>View leaderboards</Link>
                <button className="text-blue-600 underline text-lg hover:no-underline" onClick={handleNewGame}>Start a new game</button>
            </>
        )
    }
     else {
        return (
            <>
                <p className="my-2">Your time has been recorded, you can add your name in the form below if you would like to.</p>
    
                <form data-testid="leaderboard-form" onSubmit={(e) => handleSubmit(e, gameInstance)} className="flex flex-col items-center gap-4 w-full md:w-3/4 lg:w-2/5 p-4 my-5 bg-slate-200" method="post">

                    <div className="flex flex-col w-3/5">
                        <label className="font-semibold text-lg" htmlFor="name">Your name <span className="text-xs">(1-20 characters)</span></label>
                        
                        <input type="text" name="name" id="name" className="p-2 my-3" value={playerName} onChange={handleChange} />
                        <span data-testid="error-msg">{inputError}</span>
                    </div>

                    <button className="w-3/5 bg-black text-white p-2 mb-2">Submit</button>
                </form>
            </>
        )
    }
}