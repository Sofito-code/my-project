import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getDataTempHum<T = DocumentData>(collectionName: string): Promise<T[]> {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  // Convierte los datos a un array tipado
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  return data;
}