'use client'
import Nav from "../components/nav"
import GameTimer from "../components/timer"
import img1 from "../../../public/images/image-1.jpg"
import img2 from "../../../public/images/pic-2.jpg"
import img3 from "../../../public/images/pic-1.jpg"
import { useEffect, useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"

// images, add characters array to object*
const image1 = {
    src: img1.src,
    name: 'image1',
    characters: []
}

const image2 = {
    src: img2.src,
    name: 'image2'
}

const image3 = {
    src: img3.src,
    name: 'image3'
}

export default function Game() {
    const ref = useRef(null);

    // start game state
    const [gameStart, setGameStart] = useState(false);
    // game image
    const [gameImage, setGameImage] = useState({ ...image1 });

    // number of characters found state*
    // if all characters found update state, ui etc*
    const [charactersFound, setCharactersFound] = useState([]);

    // paused state
    const [gamePause, setGamePause] = useState(false);

    // popup box coords and z-index
    const [clickCoords, setClickCoords] = useState({ x: 5, y: 5 });
    const [popupZIndex, setPopupZIndex] = useState(-10);

    // image width (pass set function to gameimage component)
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    // handle starting game
    function handleGameStart(img) {
        setGameStart(true);
        setGameImage(img);

        // send request to server to record start time*
    }

    // handle end game
    // send request to server to record end time and calculate game time*


    // clicking on image displays options box at cursor
    function setCoords(e) {

        // update position of box
        setClickCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

        // change z-index of box based on current z-index
        (popupZIndex === -10 ? setPopupZIndex(10) : setPopupZIndex(-10));
    }

    // selecting character from box
    async function handleFormSubmit(event) {
        try {
            event.preventDefault();

            // 1. get coords of cursor/click*
            // calculate x and y values*
            let x_percentage = clickCoords.x / imageWidth;
            let y_percetage = clickCoords.y / imageHeight;

            console.log(Math.floor(x_percentage * 100), Math.floor(y_percetage * 100));

            // get form data
            const form = event.target;
            // const formData = new FormData(form); ?

            // req body
            let user_selection = {
                x: Math.floor(x_percentage * 100),
                y: Math.floor(y_percetage * 100),
                image: gameImage.name,   // how to get correct value?*
                character: 'walrus' // how to get this value?*
            };

            // fetch request to check selection made by user
            let response = await fetch('http://localhost:3002/gameimage', {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(user_selection)
            });

            // handle result, update game state*
            let result = await response.json();

            // update state if correct selection
            //  display selection message*
            if (result) {
                setCharactersFound([...charactersFound, user_selection.character]);
            };

            // if characters found length == 3 then gameover*

            console.log(result);

            // change z-index of popup
            setPopupZIndex(-10);

            return;

        } catch (error) {
            console.log(error);
            return;
        }
    }


    if (!gameStart) {
        return (
            <>
                <Nav />
                <main className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <p>select image</p>
                    <div className="flex gap-4">

                        <picture className="w-96 h-96" onClick={() => handleGameStart(image1)}>
                            <Image src={image1.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                        <picture className="w-96 h-96" onClick={() => handleGameStart(image2)}>
                            <Image src={image2.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                        <picture className="w-96 h-96" onClick={() => handleGameStart(image3)}>
                            <Image src={image3.src} alt="" width={500} height={500} className="w-full h-full" />
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
                    <GameTimer gameStart={gameStart} gamePause={gamePause} />
                    <h1 className="font-bold text-2xl">Game page</h1>

                    <div className="relative w-full h-full">

                        <GameImage gameImage={gameImage} setCoords={setCoords} setImageWidth={setImageWidth} setImageHeight={setImageHeight} />

                        <SelectOptions x={clickCoords.x} y={clickCoords.y} z={popupZIndex} handleFormSubmit={handleFormSubmit} />

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

// game image component
function GameImage({ gameImage, setCoords, setImageWidth, setImageHeight }) {
    const ref = useRef(null)

    // get image width and height
    useLayoutEffect(() => {
        setImageWidth(ref.current.offsetWidth);
        setImageHeight(ref.current.offsetHeight);
    }, []);

    // handle resizing of window
    useEffect(() => {
        function handleWindowResize() {
            setImageWidth(ref.current.offsetWidth);
            setImageHeight(ref.current.offsetHeight);
        }

        window.addEventListener('resize', handleWindowResize);

        // clean up when component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <picture className="w-full h-full" onClick={(e) => setCoords(e)}>
            <Image ref={ref} src={gameImage.src} alt="" width={800} height={800} className="w-full h-full" />
        </picture>
    )
}



// on submit check if correct and display result*
// selection popup
function SelectOptions({ x, y, z, handleFormSubmit }) {
    return (
        <>
            <form method="post" className="flex flex-col bg-neutral-300 w-40 absolute" style={{ top: `${y}px`, left: `${x}px`, zIndex: z }} onSubmit={(e) => handleFormSubmit(e)}>
                <button>character 1</button>
                <button>character 2</button>
                <button>character 3</button>
            </form>
        </>
    )
}

