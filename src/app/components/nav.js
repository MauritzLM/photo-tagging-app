import Link from "next/link";

export default function Nav({ currentPage }) {
    return (
        <>
        <div></div>
        <nav className="flex justify-center p-5 text-text-secondary shadow-sm sticky top-0 z-10 bg-secondary text-lg">
            <ul className="flex  gap-10">
                <li className={currentPage === 'home' ? 'border-b-2 border-text-secondary font-semibold' : 'hover:border-b-2 border-text-secondary transition-all'}><Link href="/">Home</Link></li>
                <li className={currentPage === 'game' ? 'border-b-2 border-text-secondary font-semibold' : 'hover:border-b-2 border-text-secondary transition-all'}><Link href="/game">Play</Link></li>
                <li className={currentPage === 'leaderboard' ? 'border-b-2 border-text-secondary font-semibold' : 'hover:border-b-2 border-text-secondary transition-all'}><Link href="/leaderboard">Leaderboards</Link></li>
            </ul>
        </nav>
        </>
    )
}