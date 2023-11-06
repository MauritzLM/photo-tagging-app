
export default function Marker({ character, x, y, display }) {

    return (
        <>
            <div className="bg-slate-200 absolute p-3" style={{ top: `${y}px`, left: `${x}px`, display: display }}>
                {character}
            </div>
        </>
    )
}