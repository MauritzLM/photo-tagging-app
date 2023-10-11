'use client'
import Nav from "../components/nav"
import pic1 from "../../../public/images/pic-1.jpg"
import pic2 from "../../../public/images/pic-2.jpg"
import { useEffect, useState } from "react"
import Image from "next/image"

import useTimer from "@/utils/timer"
import { formatTime } from "@/utils/utils"

export default function Game() {

    const [gameStart, setGameStart] = useState(false);
    const [gameImage, setGameImage] = useState(pic1);

    const [popupCoords, setPopupCoords] = useState({ x: 5, y: 5 });
    const [popupZIndex, setPopupZIndex] = useState(-10);

    // handle starting game
    function handleGameStart(img) {
        setGameStart(true);
        setGameImage(img);

        // timer*
        
    }

    //   useEffect(() => {
    //       console.log(gameStart)
    //      })

    // clicking on image displays options box at cursor
    function setCoords(e) {

        console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        // update position of box
        setPopupCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        // change z-index of box
        (popupZIndex === -10 ? setPopupZIndex(10) : setPopupZIndex(-10));
    }

    // selecting character from box
    function handleFormSubmit(e) {
        e.preventDefault();
        // check if selection is correct* (fetch)
        // handle result, update game state*
        // change z-index of popup*
        setPopupZIndex(-10);
    }

    if (!gameStart) {
        return (
            <>
                <Nav />
                <main className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <p>select image</p>
                    <div className="flex gap-4">
                        <picture className="w-96 h-96" onClick={() => handleGameStart(pic1)}>
                            <Image src={pic1.src} alt="" width={500} height={500} className="w-full h-full" />
                            {/* <img className="w-full h-full" src={pic1.src} alt="" /> */}
                        </picture>
                        <picture className="w-96 h-96" onClick={() => handleGameStart(pic2)}>
                            {/* <img className="w-full h-full" src={pic2.src} alt="" /> */}
                            <Image src={pic2.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                    </div>
                </main>
            </>
        )
    } else {
        return (
            <>
                <Nav />
                <main className="flex flex-col items-center p-4">
                    <GameTimer gameStart={gameStart}/>
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <div className="relative w-full h-full">
                        <picture className="w-full h-full" onClick={(e) => setCoords(e)}>
                            <Image src={gameImage.src} alt="" width={800} height={800} className="w-full h-full" />
                            {/* <img className="w-full h-full" src={pic1.src} alt="" /> */}
                        </picture>
                        <SelectOptions x={popupCoords.x} y={popupCoords.y} z={popupZIndex} handleFormSubmit={handleFormSubmit}/>
                    </div>
                </main>

            </>
        )
    }

}


// create game instructions popup* (optional)
// display which characters need to be found
// button to start game and timer 
function GameInstructions() {
    return (
        <>
            <div className="flex gap-2 absolute">

                <div>
                    <h2>Game instructions</h2>
                    <p>find these characters</p>
                </div>

                <div>
                    <p>character-1</p>
                    <p>character-2</p>
                </div>
            </div>
        </>
    )
}

// create popup box commponent*
// form with multiple submit buttons
// on submit check if correct and display result
function SelectOptions({ x, y, z, handleFormSubmit }) {
    return (
        <>
            <form className="flex flex-col bg-neutral-300 w-40 absolute" style={{ top: `${y}px`, left: `${x}px`, zIndex: z }} onSubmit={(e)=> handleFormSubmit(e)}>
                <button>character 1</button>
                <button>character 2</button>
                <button>character 3</button>
            </form>
        </>
    )
}

function GameTimer({gameStart}) {

        const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

    return (
        <>
        <div>
            <p>Time: {formatTime(timer)}</p>
        </div>
        </>
    )
}