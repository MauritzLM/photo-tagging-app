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
            <h1 className="text-3xl font-bold text-center my-7">Game complete!</h1>
            <div className="flex gap-4">
                <p className="self-center my-5">Your time:</p>
                <div className="self-center">
                    <span className="text-2xl font-semibold" data-testid="time">{("0" + Math.floor((gameInstance.time / 60000) % 60)).slice(-2)}:</span>
                    <span className="text-2xl font-semibold" data-testid="time">{("0" + Math.floor((gameInstance.time / 1000) % 60)).slice(-2)}:</span>
                    <span className="text-2xl font-semibold" data-testid="time">{("0" + ((gameInstance.time / 10) % 100)).slice(-2)}</span>
                </div>
            </div>
        </>
    )
}