'use client'
import Nav from "../components/nav"
import pic1 from "../../../public/images/pic-1.jpg"
import pic2 from "../../../public/images/pic-2.jpg"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Game() {

    const [gameStart, setGameStart] = useState(false);
    const [gameImage, setGameImage] = useState(pic1);

    // handle starting game
    function handleGameStart(img) {
        setGameStart(true);
        setGameImage(img);
    }

    //   useEffect(() => {
    //       console.log(gameStart)
    //      })

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
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <picture className="w-full h-full">
                        <Image src={gameImage.src} alt="" width={800} height={800} className="w-full h-full" />
                        {/* <img className="w-full h-full" src={pic1.src} alt="" /> */}
                    </picture>
                </main>
            </>
        )
    }

}


// create game instructions popup*
// display which characters need to be found
// button to start game and timer 
function GameInstructions() {
    return (
        <>
        <div>
            <h2>Game instructions</h2>

           <p>find these characters</p>
        </div>
        </>
    )
}

// create popup box commponent*
// form with multiple submit buttons
// on submit check if correct and display result
function SelectOptions() {
    return (
        <>
          <form>
              <button>character 1</button>
              <button>character 2</button>
              <button>character 3</button>
          </form>
        </>
    )
}
