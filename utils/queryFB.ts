import { collection, query, orderBy, limit, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getData<T = DocumentData>(collectionName: string): Promise<T[]> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, orderBy("timestamp", "desc"), limit(10));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  return data;
}