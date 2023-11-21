import { useEffect } from "react";

export default function GameEnd({ handleGameEnd, gameInstance }) {

    useEffect(() => {

        let ignore = false;

        handleGameEnd(gameInstance.id)

        // clean up function
        return () => {
            ignore = true;
        };

    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold text-center my-7">Game complete!</h1>

            <p className="my-4 text-lg">Your time : <span className="text-2xl font-semibold" data-testid="time">{("0" + Math.floor((gameInstance.time / 60000) % 60)).slice(-2)}:</span>
                <span className="text-2xl font-semibold" data-testid="time">{("0" + Math.floor((gameInstance.time / 1000) % 60)).slice(-2)}:</span>
                <span className="text-2xl font-semibold mr-2" data-testid="time">{("0" + ((gameInstance.time / 10) % 100)).slice(-2)}</span>
                 has been recorded</p>

            <p className="text-lg">You can add your name in the form below if you would like to.</p>
        </>
    )
}