import React, { useState } from 'react'


export async function getUsuarios() {
    try {
      let response = await fetch('http://localhost:3000/api/getUsuarios');
      let usuarios = await response.json();
  
       // console.log(usuarios)

      return {
        props: { usuarios: JSON.parse(JSON.stringify(usuarios)) },
      };
    } catch (e) {
      console.error(e);
    }
  }

const Admin = () => {
    
    const [usrs, setUsrs] = useState<any>([]);

    setInterval(() => {
        getUsuarios().then((res)=>{
            setUsrs(res?.props.usuarios)
            console.log(res)
       })
    }, 2000)

 

  return (
    <>
        <div>Admin</div>
        <div>
        {
          JSON.stringify(usrs)
        }
        </div>
    </>
  )
}

export default Admin