import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = client.db("simulacion");
    const { username, respuesta, tiempo } = req.body;

    const usuario = await db.collection("usuarios").insertOne({
      username,
      respuesta,
      tiempo
    });

    res.json(usuario);
  } catch (e : any) {
    console.error(e);
    throw new Error(e).message;
  }
};