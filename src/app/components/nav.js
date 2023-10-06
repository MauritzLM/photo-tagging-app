
export default function Nav(){
    return (
        <nav className="flex justify-center p-4">
            <ul  className="flex  gap-10">
                <li><a href="/">Home</a></li>
                <li><a href="/game">Game</a></li>
                <li>Leaderboards</li>
            </ul>
        </nav>
    )
}