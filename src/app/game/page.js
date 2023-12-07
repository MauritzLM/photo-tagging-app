'use client'
import Nav from "../components/nav";
import GameTimer from "../components/timer";
import GameImage from "../components/gameImage";
import SelectOptions from "../components/selectOptions";
import LeaderboardForm from "../components/leaderboardForm";
import Marker from "../components/marker";
import { updateSelection } from "@/utils/utils";
import { image1, image2, image3 } from "../../utils/imageData";
import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';


export default function Game() {
    // start game state
    const [gameStart, setGameStart] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // game image selected
    const [gameImage, setGameImage] = useState({ ...image1 });

    // game instance id and time
    const [gameInstance, setGameInstance] = useState({ id: '', time: '' });

    // characters found array
    const [charactersFound, setCharactersFound] = useState([]);

    // correct selection markers
    const [marker1, setMarker1] = useState({ x: 0, y: 0, display: 'none' });
    const [marker2, setMarker2] = useState({ x: 0, y: 0, display: 'none' });
    const [marker3, setMarker3] = useState({ x: 0, y: 0, display: 'none' });

    // character selected from popup
    const [selectedCharacter, setSelectedCharacter] = useState('');

    // popup box coords, z-index and click coords 
    const [clickCoords, setClickCoords] = useState({ x: 50, y: 50 });
    const [popupZIndex, setPopupZIndex] = useState(-10);

    // image dimensions
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    // handle starting a game
    async function handleGameStart(img) {

        setGameImage(img);

        // create id for game instance
        const id = uuidv4();
        setGameInstance({ ...gameInstance, id: id });

        try {
            // send req to record start time
            let response = await fetch('https://photo-tagging-server-production.up.railway.app/gamestart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id, image: img.name })
            });

            if (response.status === 200) {
                setGameStart(true);

                setErrorMsg('');

                return;
            };

        }
        catch (error) {
            console.log(error)
            setErrorMsg('Error: Failed to connect to server');
            return;
        }
    }

    // handle end game
    async function handleGameEnd(id) {
        try {
            // send request to server to calculate time
            let response = await fetch('https://photo-tagging-server-production.up.railway.app/gameend', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ id: id })
            });

            const result = await response.json();

            // set game time
            setGameInstance({ ...gameInstance, time: result });

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

            // console.log(Math.floor(x_percentage * 100), Math.floor(y_percetage * 100));

            console.log(clickCoords.x, clickCoords.y);
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
            let response = await fetch('https://photo-tagging-server-production.up.railway.app/gameimage', {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user_selection)
            });

            // handle result, update game state
            let result = await response.json();

            // update state if correct selection
            //  display marker for correct selection
            if (result && updateSelection(selectedCharacter, charactersFound)) {
                setCharactersFound([...charactersFound, selectedCharacter]);

                // update marker display for selected character
                switch (selectedCharacter) {
                    case gameImage.characters[0].name:
                        setMarker1({ x: clickCoords.x, y: clickCoords.y, display: 'block' });
                        break;
                    case gameImage.characters[1].name:
                        setMarker2({ x: clickCoords.x, y: clickCoords.y, display: 'block' });
                        break;
                    case gameImage.characters[2].name:
                        setMarker3({ x: clickCoords.x, y: clickCoords.y, display: 'block' });
                        break;
                }

            };

            console.log(result);

            setErrorMsg('');

            // change z-index of popup to hide it
            setPopupZIndex(-10);

            return;

        } catch (error) {
            console.log(error);
            setErrorMsg('Error: Failed to connect to server');
            return;
        }
    }

    // if gameover (all characters found)
    if (charactersFound.length === 3) {
        return (
            <>
                <Nav currentPage={'game'} />
                <main className="flex flex-col items-center p-4 text-text-secondary">
                    <LeaderboardForm image={gameImage.name} handleGameEnd={handleGameEnd} gameInstance={gameInstance} handleNewGame={handleNewGame} />
                </main>
            </>
        )
    }


    if (!gameStart) {
        return (
            <>
                <Nav currentPage={'game'} />

                <main className="flex flex-col items-center gap-10 relative text-text-secondary">

                    <h1 className="mt-14 font-bold text-3xl">Select an image to start</h1>

                    <p className="text-error">{errorMsg}</p>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4">

                        <picture className="w-80 h-80 md:w-96 md:h-96 cursor-pointer" onClick={() => handleGameStart(image1)}>
                            <Image priority={true} as="image" src={image1.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                        <picture className="w-80 h-80 md:w-96 md:h-96 cursor-pointer" onClick={() => handleGameStart(image2)}>
                            <Image src={image2.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                        <picture className="w-80 h-80 md:w-96 md:h-96 cursor-pointer" onClick={() => handleGameStart(image3)}>
                            <Image src={image3.src} alt="" width={500} height={500} className="w-full h-full" />
                        </picture>

                    </div>
                </main>
            </>
        )
    } else {
        return (
            <>
                <Nav currentPage={'game'} />
                <main className="flex flex-col items-center gap-7 p-4 relative text-text-secondary">
                    <p className="text-error">{errorMsg}</p>

                    <div className="flex flex-col md:flex-row w-full items-center justify-around gap-5">
                        <GameTimer gameStart={gameStart} />

                        <div className="flex flex-col gap-4">
                            <p className="text-center text-xl font-medium">characters to find:</p>

                            <div className="flex items-end md:items-center gap-5">
                                {gameImage.characters?.map((character, index) =>

                                    <div key={character.name} className="flex flex-col  md:flex-row items-center gap-2 relative">
                                        <Image src={character.imageSrc} alt={character.name} height={35} width={35} />
                                        <p className={charactersFound.includes(character.name) ? 'line-through' : ''} key={`char-${index}`}>{character.name}</p>
                                    </div>
                                    // 
                                )}
                            </div>
                        </div>
                    </div>



                    <div className="relative w-full h-full">

                        <GameImage gameImage={gameImage} setCoords={setCoords} setImageWidth={setImageWidth} setImageHeight={setImageHeight} imageWidth={imageWidth} />

                        <SelectOptions x={clickCoords.x} y={clickCoords.y} z={popupZIndex} imageWidth={imageWidth} imageHeight={imageHeight} handleFormSubmit={handleFormSubmit} gameImage={gameImage} handleSelection={handleSelection} charactersFound={charactersFound} />

                        <Marker character={gameImage.characters[0].name} x={marker1.x} y={marker1.y} display={marker1.display} imageWidth={imageWidth} imageHeight={imageHeight} />
                        <Marker character={gameImage.characters[1].name} x={marker2.x} y={marker2.y} display={marker2.display} imageWidth={imageWidth} imageHeight={imageHeight} />
                        <Marker character={gameImage.characters[2].name} x={marker3.x} y={marker3.y} display={marker3.display} imageWidth={imageWidth} imageHeight={imageHeight} />
                    </div>
                </main>

            </>
        )
    }
}





