
export default function Marker({ character, x, y, display, imageWidth, imageHeight }) {

    // determine max values for x and y
    let x_max = imageWidth * .92;
    let y_max = imageHeight * .95;

    if (x > x_max) {
        x = x_max;
    };

    if (y > y_max) {
        y = y_max;
    };

    return (
        <>
            <div data-testid="marker" className="bg-marker text-text-secondary border-2 rounded-md absolute p-3" style={{ top: `${y}px`, left: `${x}px`, display: display }}>
                {character}
            </div>
        </>
    )
}