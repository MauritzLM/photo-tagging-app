import Image from 'next/image'
import Nav from './components/nav'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Nav currentPage={'home'}/>
      <main className="flex flex-col items-center gap-14 text-text-secondary p-6">

        <h1 className="text-center font-bold text-4xl mt-14">Photo tagging app</h1>

        <section className="max-w-xl flex flex-col items-center gap-5">

          <h2 className='font-bold text-2xl my-2'>Game instructions</h2>
          <ol className="p-4 list-decimal">
            <li className="my-4 text-xl">On the <Link className='underline text-link hover:no-underline' href="/game">game page</Link> select an image</li>
            <li className="my-4 text-xl">Find all three characters by clicking on them and selecting the correct option</li>
            <li className="my-4 text-xl">Once you have found all three characters the game is over and you have an option to add your name to the leaderboard</li>
          </ol>

          <p className="font-bold text-lg">Thanks for playing!</p>

        </section>
      </main>
    </>
  )
}
