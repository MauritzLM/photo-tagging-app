
export default function DisplayLeaderboard({ leaderboard, showLeaderboard }) {

    return (
        <>
            <table className={showLeaderboard === '' ? 'hidden' : 'bg-slate-500'}>
                <thead>
                    <tr>
                        <th className="p-2">Player</th>
                        <th className="p-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard?.map(player =>
                        <tr key={player.time}>
                            <td className="p-2">{player.player_name}</td>
                            <td className="p-2">{("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}:{("0" + ((player.time / 10) % 100)).slice(-2)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

{/*<ol>
                {leaderboard?.map(player =>
                    <li key={player.time}>
                        {player.player_name} - <span>{("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}:</span>
                        <span>{("0" + ((player.time / 10) % 100)).slice(-2)}</span>
                    </li>
                )}
            </ol> */}