'use client'
import Nav from "../components/nav"
import GameTimer from "../components/timer"
import GameImage from "../components/gameImage"
import SelectOptions from "../components/selectOptions"
import GameEnd from "../components/gameEnd"
import LeaderboardForm from "../components/leaderboardForm"
import { updateSelection } from "@/utils/utils"
import img1 from "../../../public/images/image-1.jpg"
import img2 from "../../../public/images/pic-2.jpg"
import img3 from "../../../public/images/pic-1.jpg"
import { useEffect, useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';


// game image objects, add characters array to object*
const image1 = {
    src: img1.src,
    name: 'image1',
    characters: ['walrus', 'lion', 'bear']
}

const image2 = {
    src: img2.src,
    name: 'image2',
    characters: ['char1', 'char2', 'char3']
}

const image3 = {
    src: img3.src,
    name: 'image3',
    characters: ['char4', 'char5', 'char6']
}

export default function Game() {
    // start game state
    const [gameStart, setGameStart] = useState(false);

    // game image selected
    const [gameImage, setGameImage] = useState({ ...image1 });

    // game instance
    const [gameInstance, setGameInstance] = useState({ id: '', time: '' });

    // number of characters found 
    const [charactersFound, setCharactersFound] = useState(['char1', 'char2']);

    // character selected from popup
    const [selectedCharacter, setSelectedCharacter] = useState('');

    // popup box coords, z-index and click coords 
    const [clickCoords, setClickCoords] = useState({ x: 5, y: 5 });
    const [popupZIndex, setPopupZIndex] = useState(-10);

    // image dimensions
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);


    // handle starting a game
    async function handleGameStart(img) {
        setGameStart(true);
        setGameImage(img);

        // create id for game instance
        const id = uuidv4();
        setGameInstance({ ...gameInstance, id: id });

        try {
            // send req to record start time
            let response = await fetch('http://localhost:3002/gamestart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id, image: img.name })
            });

            console.log(response);

        }
        catch (error) {
            console.log(error)
            return;
        }
    }

    // handle end game
    async function handleGameEnd(id) {
        try {
            // send request to server to calculate time
            let response = await fetch('http://localhost:3002/gameend', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id })
            });

            const result = await response.json();
            
            // set game time
            setGameInstance({...gameInstance, time: result})

        }
        catch (error) {
            console.log(error)
        }
    }

    // handle new game
    function handleNewGame() {
        setCharactersFound([]);
        setGameStart(false);
    }


    // set coords of click
    function setCoords(e) {

        // update position of box
        setClickCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

        // change z-index of box based on current z-index
        (popupZIndex === -10 ? setPopupZIndex(10) : setPopupZIndex(-10));
    }

    // update character selection
    function handleSelection(event) {
        setSelectedCharacter(event.target.value);
    }

    // submit selection function
    async function handleFormSubmit(event) {
        try {
            event.preventDefault();

            // get coords of cursor/click
            // calculate x and y values
            let x_percentage = clickCoords.x / imageWidth;
            let y_percetage = clickCoords.y / imageHeight;

            console.log(Math.floor(x_percentage * 100), Math.floor(y_percetage * 100));

            console.log(selectedCharacter)

            // form
            const form = event.target;

            // create request body
            let user_selection = {
                x: Math.floor(x_percentage * 100),
                y: Math.floor(y_percetage * 100),
                image: gameImage.name,
                character: selectedCharacter,
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
            if (result && updateSelection(selectedCharacter, charactersFound)) {
                setCharactersFound([...charactersFound, selectedCharacter]);
            };

            console.log(result);

            // change z-index of popup to hide it
            setPopupZIndex(-10);

            return;

        } catch (error) {
            console.log(error);
            return;
        }
    }

    // if gameover (all characters found)
    // start new game link*
    if (charactersFound.length === 3) {
        return (
            <>
                <Nav />
                <GameEnd handleGameEnd={handleGameEnd} gameInstance={gameInstance} />
                <LeaderboardForm image={gameImage.name} gameInstance={gameInstance} handleNewGame={handleNewGame} />
            </>
        )
    }


    if (!gameStart) {
        return (
            <>
                <Nav />
                <main className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <p>select image</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

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
                    <GameTimer gameStart={gameStart} />
                    <h1 className="font-bold text-2xl">Game page</h1>
                    <p>characters found: {charactersFound.length}</p>

                    <div className="relative w-full h-full">

                        <GameImage gameImage={gameImage} setCoords={setCoords} setImageWidth={setImageWidth} setImageHeight={setImageHeight} imageWidth={imageWidth} />

                        <SelectOptions x={clickCoords.x} y={clickCoords.y} z={popupZIndex} handleFormSubmit={handleFormSubmit} gameImage={gameImage} handleSelection={handleSelection} />

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





