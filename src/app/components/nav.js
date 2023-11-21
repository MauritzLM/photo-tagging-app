import Link from "next/link";

export default function Nav({ currentPage }) {
    return (
        <nav className="flex justify-center p-5 text-text-primary shadow-sm sticky top-0 z-10 bg-secondary">
            <ul className="flex  gap-10">
                <li className={currentPage === 'home' ? 'border-b-2 border-primary font-semibold' : 'hover:border-b-2 border-primary'}><Link href="/">Home</Link></li>
                <li className={currentPage === 'game' ? 'border-b-2 border-primary font-semibold' : 'hover:border-b-2 border-primary'}><Link href="/game">Play</Link></li>
                <li className={currentPage === 'leaderboard' ? 'border-b-2 border-primary font-semibold' : 'hover:border-b-2 border-primary'}><Link href="/leaderboard">Leaderboards</Link></li>
            </ul>
        </nav>
    )
}