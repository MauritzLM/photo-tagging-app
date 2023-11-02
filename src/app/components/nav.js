import Link from "next/link"

export default function Nav(){
    return (
        <nav className="flex justify-center p-4">
            <ul  className="flex  gap-10">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/game">Game</Link></li>
                <li><Link href="/leaderboard">Leaderboards</Link></li>
            </ul>
        </nav>
    )
}