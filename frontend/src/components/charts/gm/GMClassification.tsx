import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
import { chartSubtitle, chartTooltip, formatNumber } from '../../../utils'

function renderOptions(values: any, data: any) {
	const colors = ['#00B050', '#f38003', '#ff6363', '#4CB9E1']
	const options = {
		title: {
			text: 'КЛАССИФИКАЦИЯ ДЕНЕЖНЫХ СРЕДСТВ ПО AO "UZAUTO MOTORS" ',
			align: 'left'
		},
		subtitle: {
			...chartSubtitle('в экв. сум')
		},
		tooltip: { ...chartTooltip() },
		dataLabels: {
			style: {
				colors: ['#666']
			},
			background: {
				enabled: true
			}
		},
		colors,
		series: values,
		chart: {
			width: 500,
			type: 'pie'
		},
		fill: {
			colors
		},
		labels: ['USD', 'EUR', 'RUB', 'UZS'],
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
		],
		legend: {
			show: true,
			formatter: function (label: string, opts: any) {
				return label + ' - ' + formatNumber(data[opts.seriesIndex] * Math.pow(10, 6))
			},
			position: 'left',
			fontSize: 15
		}
	}

	const chart = new ApexCharts(document.querySelector('#gm_classification'), options)
	chart.render()
}

interface GMClassificationProps {
	series: any
	data: any
}

const GMClassification: React.FC<GMClassificationProps> = ({ series = [], data = [] }) => {
	console.log(series, data)
	useEffect(() => {
		if (series.filter(Boolean).length) {
			document.querySelector('#gm_classification')!.innerHTML = ''
			renderOptions(series, data)
		}
	}, [series, data])
	return <div id="gm_classification" />
}

export default GMClassification
