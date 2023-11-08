
export default function DisplayLeaderboard({ leaderboard }) {

    if (leaderboard) {
        return (
            <>
                <h1>Leaderboard</h1>
                <ol>
                    {leaderboard.map(player =>
                        <li key={player.time}>
                            {player.player_name} - <span>{("0" + Math.floor((player.time / 60000) % 60)).slice(-2)}:</span>
                            <span>{("0" + Math.floor((player.time / 1000) % 60)).slice(-2)}:</span>
                            <span>{("0" + ((player.time / 10) % 100)).slice(-2)}</span>
                        </li>
                    )}
                </ol>
            </>
        )
    } else {
        return (
            <>
                <h1>Leaderboard</h1>
                <p>fetching data...</p>
            </>
        )
    }


}