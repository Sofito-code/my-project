// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getDataTempHum } from "../../utils/queryFB";

type DataItem = {
  id: number;
  temp: string; // Cambia esto según tu estructura de datos
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataItem[] | { error: string }>
) {
  try {
    const data = await getDataTempHum<DataItem>("sensors");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los datos" });
  }
}
