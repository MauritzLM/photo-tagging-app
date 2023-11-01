import { useEffect } from "react"

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
            <h1>GameOver</h1>
            <span>{("0" + Math.floor((gameInstance.time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((gameInstance.time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((gameInstance.time / 10) % 100)).slice(-2)}</span>
        </>
    )
}