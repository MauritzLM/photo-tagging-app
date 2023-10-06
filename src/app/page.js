import Image from 'next/image'
import Nav from './components/nav'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">Photo tagging app</h1>
      </main>
    </>
  )
}
