import { useState,useEffect } from "react";

// game timer
export default function GameTimer({ gameStart}) {

    const [time, setTime] = useState(0);
    // const [running, setRunning] = useState(true);
    useEffect(() => {
        let interval;
    
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <div>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </>
    )
}