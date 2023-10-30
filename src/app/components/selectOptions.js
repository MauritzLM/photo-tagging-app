// selection popup
export default function SelectOptions({ x, y, z, handleFormSubmit, gameImage, handleSelection }) {

    const characterArr = gameImage.characters;

    return (
        <>
            <form method="post" className="flex flex-col bg-neutral-300 w-40 absolute" style={{ top: `${y}px`, left: `${x}px`, zIndex: z }} onSubmit={(e) => handleFormSubmit(e)}>
                <button value={characterArr[0]} type="submit" onClick={handleSelection}>{characterArr[0]}</button>
                <button value={characterArr[1]} type="submit" onClick={handleSelection}>{characterArr[1]}</button>
                <button value={characterArr[2]} type="submit" onClick={handleSelection}>{characterArr[2]}</button>
            </form>
        </>
    )
}