import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
import { chartTooltip } from '../../../utils'
import palette from '../../../styles/palette'

function renderOptions(series: number[], id: string, labelText = 'ALL') {
	const colors = [palette.red, palette.lightGreen]
	const options = {
		tooltip: { ...chartTooltip() },
		series,
		colors,
		chart: {
			type: 'donut',
			height: 350
		},
		legend: {
			show: false
		},
		labels: ['Доходонеприносящие', 'Доходоприносящие'],
		fill: {
			colors
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							offsetY: 10
						},
						total: {
							show: true,
							showAlways: true,
							label: labelText,
							fontSize: '45px',
							fontWeight: 550,
							formatter: () => ''
						}
					}
				}
			}
		},
		dataLabels: {
			enabled: true,
			formatter: function (value: number, { w, seriesIndex }: any) {
				return `${w.config.series[seriesIndex].toFixed(2)}%`
			},
			style: {
				fontSize: '18px',
				colors: ['#fff']
			}
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	}
	const chart = new ApexCharts(document.querySelector(`#${id}`), options)
	chart.render()
}

interface VlaBufferChartProps {
	series: number[]
	labelText?: string
}

const VlaBufferChart: React.FC<VlaBufferChartProps> = ({ series, labelText }) => {
	const id = `vla_buffer_${labelText?.toLowerCase()}`
	useEffect(() => {
		if (series.filter(Boolean).length && series.length) {
			document.querySelector(`#${id}`)!.innerHTML = ''
			renderOptions(series, id, labelText)
		}
	}, [id, series, labelText])
	return <div id={`${id}`} />
}

export default VlaBufferChart
