import Link from "next/link"

export default function Nav(){
    return (
        <nav className="flex justify-center p-5 bg-zinc-800 text-white">
            <ul  className="flex  gap-10">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/game">Play</Link></li>
                <li><Link href="/leaderboard">Leaderboards</Link></li>
            </ul>
        </nav>
    )
}