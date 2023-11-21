// selection popup
export default function SelectOptions({ x, y, z, imageWidth, imageHeight, handleFormSubmit, gameImage, handleSelection, charactersFound }) {

    // characters in image
    const characterArr = gameImage.characters;

    // characters not found yet
    let charactersNotFound = characterArr.filter(character => 
        charactersFound.includes(character.name) === false);

    // determine max values for x and y
    let x_max = imageWidth * .88;
    let y_max = imageHeight * .95;

    if (x > x_max) {
        x = x_max;
    };

    if (y > y_max) {
        y = y_max;
    };

    return (
        <>
            <form method="post" className="flex flex-col bg-primary w-40 absolute text-text-secondary rounded-md p-3 border-2" style={{ top: `${y}px`, left: `${x}px`, zIndex: z }} onSubmit={(e) => handleFormSubmit(e)}>
                {/* create button for each character not found yet */}
                {charactersNotFound.map(character => {
                    return <button key={character.name} className="p-2 font-semibold font-xl hover:underline" value={character.name} type="submit" onClick={handleSelection}>{character.name}</button>
                })}

            </form>
        </>
    )
}