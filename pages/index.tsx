"use client"
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
  const year = date.getFullYear() % 100;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

type DataItem = {
    id: number;
    temp: string;
    ax: number;
    ay: number;
    az: number;
    servo: number;
    ultra: number;
    timestamp: string;
};

const variables = [
    { name: "Aceleración en X", key: "ax", color: "rgba(255, 99, 132, 0.5)" },
    { name: "Aceleración en Y", key: "ay", color: "rgba(54, 162, 235, 0.5)" },
    { name: "Aceleración en Z", key: "az", color: "rgba(255, 206, 86, 0.5)" },
    { name: "Ultrasonido", key: "ultra", color: "rgba(75, 192, 192, 0.5)" },
    { name: "Temperatura", key: "temp", color: "rgba(153, 102, 255, 0.5)" },
    { name: "Servo", key: "servo", color: "rgba(100, 50, 10, 0.5)" },
]

function VariableChart({ variable }: { variable: typeof variables[0] }) {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/data");
            const result = await res.json();
            setData(result);
        }
        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy()
                }

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.map(d => formatDate(new Date(d.timestamp))),
                        datasets: [{
                            label: variable.name,
                            data: data.map(d => (d[variable.key as keyof typeof d] as number)),
                            borderColor: variable.color,
                            backgroundColor: variable.color,
                            fill: true,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                          duration: 0
                        },
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Tiempo'
                                }
                            },
                            y: {
                                beginAtZero: false,
                                title: {
                                    display: true,
                                    text: 'Valor'
                                }
                            }
                        }
                    }
                })
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [variable, data])

    return (
        <div className="w-full bg-white rounded-lg shadow-md">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{variable.name}</h2>
                <div className="h-[400px]">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard de Variables del Carro a Control remoto</h1>
            <p className="text-gray-600 mb-4 text-center">Valores en el tiempo</p>
            <div className="space-y-6">
                {variables.map((variable) => (
                    <VariableChart key={variable.key} variable={variable} />
                ))}
            </div>
        </div>
    )
}