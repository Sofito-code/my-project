// pages/index.tsx
import { useEffect, useState } from "react";

type DataItem = {
  id: number;
  temp: string;
};

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/data");
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Datos de Firebase</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
