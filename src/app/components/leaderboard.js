
export default function DisplayLeaderboard({ leaderboard, showLeaderboard }) {

    return (
        <>
            <table className={showLeaderboard === '' ? 'hidden' : 'bg-slate-200 w-full md:w-3/4 text-lg rounded-sm'}>
                <thead>
                    <tr className="border-b border-white">
                        <th className="p-2">Player</th>
                        <th className="p-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard?.map(player =>
                        <tr className="border-b border-white" key={player.time}>
                            <td className="p-2 text-center">{player.player_name}</td>
                            <td className="p-2 text-center">{("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}:{("0" + ((player.time / 10) % 100)).slice(-2)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}