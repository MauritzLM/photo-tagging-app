
export default function DisplayLeaderboard({ leaderboard }) {

    if(leaderboard) {
        return (
            <>
                <h1>Leaderboard</h1>
                <ol>
                    {leaderboard.map(player => 
                        <li key={player.time}>
                            {player.player_name} - {player.time}
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