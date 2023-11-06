import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

// game image component
export default function GameImage({ gameImage, setCoords, setImageWidth, setImageHeight, imageWidth }) {
    const ref = useRef(null)

    // get image width and height
    useLayoutEffect(() => {

        // use settimeout to get correct values
        setTimeout(() => {
            setImageWidth(ref.current.offsetWidth);
            setImageHeight(ref.current.offsetHeight);
        }, 100)

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
    }, [setImageHeight, setImageWidth]);

    return (
        <>
            <picture className="w-full h-full" onClick={(e) => setCoords(e)}>
                <Image ref={ref} src={gameImage.src} alt="" height={800} width={800} className="w-full h-full" />
            </picture>
        </>
    )
}
