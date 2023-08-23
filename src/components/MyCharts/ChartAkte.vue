<template>
	<q-card :bordered="false" class="dashboard-bar-chart">
		<q-card-section>
			<div class="text-subtitle2 text-indigo-10">Data AKTE</div>
			<div class="text-caption text-grey">Informasi data yang mempunyai akte kelahiran</div>
			<Bar :data="chartAkte" :height="300" />
		</q-card-section>
	</q-card>

</template>

<script>
import { Bar } from 'vue-chartjs'

export default ({
	components: {
		Bar,
	},
	props: {
		label : {
      type: Array,
      default: null
    },
		jumlahAkte:{
			type: Array,
			default: null
		},
    color:{
			type: Array,
			default: null
		},
	},
	data() {
		return {
			chartAkte: {
        labels: this.label,
        datasets: [
          {
            label: 'Data Akte',
            backgroundColor: this.color,
						borderRadius: 6,
            data: this.jumlahAkte,
						maxBarThickness: 30,
          }
        ]
      },
		}
	}
})

</script>