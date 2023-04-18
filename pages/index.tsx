import Link from 'next/link'
import { useState } from 'react';

export default function Home() {

  const [userName, setUsername] = useState("");

  return (
    <>
      <h3>Tu nombre</h3>
      <input type="text" value={userName} onChange={(e) => {setUsername(e.currentTarget.value)}}/>
      <Link href={{pathname : "item", query : {userName}}}>Iniciar</Link>
    </>
  )
}
