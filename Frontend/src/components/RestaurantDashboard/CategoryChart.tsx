"use client"

import React, { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement, 
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement, 
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

import { fetchRestaurantCategoryBreakdown } from "../../services/analytics"
import { useAppSelector } from "../../redux/hooks"


const RestaurantCategoryChart: React.FC = () => {
  const [categoryData, setCategoryData] = useState<{ category: string; count: number }[]>([])
  const restaurantId = useAppSelector((state: any) => state.user.type_id)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRestaurantCategoryBreakdown(restaurantId)
        setCategoryData(data)
      } catch (error) {
        console.error("Error loading category data", error)
      }
    }

    if (restaurantId) loadData()
  }, [restaurantId])

  const colors = ["#00A896", "#02C39A","#00FFB2","#028090", "#028090", "#05668D"]

  const chartData = {
    labels: categoryData.map((c) => c.category),
    datasets: [
      {
        data: categoryData.map((c) => c.count),
        backgroundColor: colors.slice(0, categoryData.length),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          padding: 16,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default RestaurantCategoryChart