import { useState, useEffect } from "react";
import Link from "next/link";
import GameEnd from "./gameEnd";

export default function LeaderboardForm({ handleGameEnd, gameInstance, handleNewGame }) {

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
            const response = await fetch('https://phototagdb-env.eba-ndhc3gvj.eu-north-1.elasticbeanstalk.com/leaderboard', {
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
                <h2 className="my-10 text-2xl font-bold text-center">Your name has been updated. Thank you for playing!</h2>
                <Link className="text-link my-2 underline text-lg hover:no-underline" href='/leaderboard'>View leaderboards</Link>
                <button className="text-link underline text-lg hover:no-underline" onClick={handleNewGame}>Start a new game</button>
            </>
        )
    }
    else {
        return (
            <>

                <GameEnd handleGameEnd={handleGameEnd} gameInstance={gameInstance} />

                {/* form to enter name */}
                <form data-testid="leaderboard-form" onSubmit={(e) => handleSubmit(e, gameInstance)} className="flex flex-col items-center gap-4 w-full max-w-lg p-4 mt-12 bg-slate-200" method="post">

                    <div className="flex flex-col w-full">
                        <label className="font-semibold text-lg" htmlFor="name">Your name <span className="text-xs">(1-20 characters)</span></label>

                        <input type="text" name="name" id="name" className="p-2 my-3 text-text-primary" value={playerName} onChange={handleChange} />
                        <span data-testid="error-msg">{inputError}</span>
                    </div>

                    <button className="w-full border-2 text-text-secondary py-3 mb-2 hover:bg-secondary">Submit</button>
                </form>
            </>
        )
    }
}