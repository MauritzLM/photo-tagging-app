
export default function DisplayLeaderboard({ leaderboard, showLeaderboard }) {

    return (
        <>
            <table className={showLeaderboard === '' ? 'hidden' : 'w-full md:w-3/4 lg:w-1/2 text-lg rounded-sm text-text-secondary'}>
                <thead>
                    <tr className="border-b border-secondary">
                        <th className="p-2">Player</th>
                        <th className="p-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard?.map(player =>
                        <tr className="border-b border-secondary" key={player.time}>
                            <td className="p-2 text-center">{player.player_name}</td>
                            <td className="p-2 text-center">{("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}:{("0" + ((player.time / 10) % 100)).slice(-2)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}