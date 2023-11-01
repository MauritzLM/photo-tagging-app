
export default function LeaderboardForm({ gameInstance }) {
    // function to handlesubmit*
    // send form data*
    async function handleSubmit(event, gameInstance) {
        event.preventDefault();

        try {
            // get form data*

            // post request* to /leaderboard
        } 
        catch (error) {
           
            console.log(error)
        }

    }
    return (
        <>
            <h2>Enter your name to submit your time</h2>
            <form onSubmit={(e) => handleSubmit(e, gameInstance)} className="flex flex-col items-center gap-4 max-w-md p-4 border-solid border-2">
                <div className="flex flex-col gap-2 w-3/5">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="border-solid border-2 border-black-600" />
                </div>

                <button className="w-3/5">Submit</button>
            </form>
        </>
    )
}