import clientPromise from "../../lib/mongodb";

export default async (req : any, res : any) => {
  try {
    const client = await clientPromise;
    const db = client.db("simulacion");

    const status = await db.collection("status").find({}).limit(50).toArray();

    res.json(status[0]);
    
  } catch (e : any) {
    console.error(e);
    throw new Error(e).message;
  }
};