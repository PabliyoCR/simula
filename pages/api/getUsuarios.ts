import clientPromise from "../../lib/mongodb";

export default async (req : any, res : any) => {
  try {
    const client = await clientPromise;
    const db = client.db("simulacion");

    const usuarios = await db.collection("usuarios").find({}).limit(50).toArray();

    res.json(usuarios);
    
  } catch (e : any) {
    console.error(e);
    throw new Error(e).message;
  }
};