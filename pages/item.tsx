import React, { useState } from 'react'
import clientPromise from '../lib/mongodb';
import { useRouter } from 'next/router';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export async function getStatus() {
    try {
      let response = await fetch('http://localhost:3000/api/getStatus');
      let status = await response.json();

      return {
        props: { usuarios: JSON.parse(JSON.stringify(status)) },
      };
    } catch (e) {
      console.error(e);
    }
  }


const Item = () => {

    const router = useRouter()
    const query =  router.query;

    const [status, setStatus] = useState<any>();

    const [resp, setResp] = useState(false);

    const interval = setInterval(() => {
        getStatus().then(res => {
            //console.log(res?.props.usuarios)
            setStatus(res?.props.usuarios)
        })
    }, 2000)

    const evaluar = async () => {
        setResp(true)
        let response = await fetch("http://localhost:3000/api/addUsuario", {
          method: "POST",
          body: JSON.stringify({
            username : query.userName,
            respuesta : (document.getElementById("resp") as HTMLSelectElement).value,
            tiempo :0
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
    }

  return (
    <>
        <div>Hola {query.userName}</div>
        <div style={{display : status?.itemAvailable ? 'block' : 'none'}}>
            <iframe src="https://pabliyocr.github.io/simulacion/" width={1000} height={400}></iframe>
            <p>Un auto circula a 72 km/h por un camino horizontal recto. Frena y para en 5 segundos. Calcule la distancia recorrida hasta pararse</p>
            <p style={{display : status?.pista1 ? 'block' : 'none'}}>Pista 1: <InlineMath>v = v_0 + a(t-t_0)</InlineMath></p>
            <p style={{display : status?.pista2 ? 'block' : 'none'}}>Pista 2: <InlineMath>r = r_0 + v_0(t - t_0)+ \frac 1 2    a(t-t_0)^2</InlineMath></p>
            <div style={{display : !resp ? 'block' : 'none'}}>
                <select name="resp" id="resp">
                    <option value="30m">30m</option>
                    <option value="40m">40m</option>
                    <option value="50m">50m</option>
                    <option value="60m">60m</option>
                </select>
                <button onClick={evaluar}>Responder</button>
            </div>
        </div>
    </>
  )
}

export default Item