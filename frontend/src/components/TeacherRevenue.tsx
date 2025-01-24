import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'
import { fetchTeacherRevenue } from '../api/teacher';

export default function TeacherRevenue() {
    const [chartOptions, setChartOptions] = useState({});
    const [yearData, setYearData] = useState<any>([])
    const [monthData, setMonthData] = useState<any>([])


    async function getTeacherRevenue() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        let result = await fetchTeacherRevenue()

        if (!result.success) {
            return alert("system error")
        }

        let yearLabels = []
        let yearCredit = []
        for (let eachYear of result.data.yearData) {
            yearLabels.push(eachYear.year)
            yearCredit.push(eachYear.credit)
        }

        let monthLabels = []
        let monthCredit = []
        for (let eachMonth of result.data.monthData) {
            monthLabels.push(eachMonth.month)
            monthCredit.push(eachMonth.credit)

        }





        const dataOfMonth = {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Credit',
                    data: monthCredit,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };


        const dataOfYear = {
            labels: yearLabels, // 年份
            datasets: [
                {
                    label: 'Credit', // 圖例
                    data: yearCredit, // 對應年份的營業額
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(201, 204, 26, 0.2)',
                        'rgba(104, 21, 238, 0.2)',
                    ], // 背景色
                    borderColor: 'rgba(54, 162, 235, 1)', // 邊框色
                    borderWidth: 1,
                },
            ],
        };




        setMonthData(dataOfMonth)
        setYearData(dataOfYear)
        setChartOptions(options);

    }



    useEffect(() => {
        getTeacherRevenue()


    }, []);




    return (
        <div className='container'>
            <div className="card">
                <h2>This Year Revenue</h2>
                <Chart type="line" data={monthData} options={chartOptions} />
            </div>
            <br />
            <div className="card">
                <h2>5 Years Revenue</h2>
                <Chart type="bar" data={yearData} />
            </div>


        </div>
    );
}
