<template>
  <VueApexCharts
    height="200"
    type="bar"
    :options="options"
    :series="series"
  ></VueApexCharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "ApexBar",
  components: {
		VueApexCharts,
	},
  data() {
    return {
      options: {
        chart: {
          id: "apex-bar"
        },
        colors: ["#304FFE", "#ef6445", "#304FF1"],
        xaxis: {
          categories: ["BPJS", "BPNT", "BLT", "PKH", "Lainnya"]
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49]
        }
      ]
    };
  }
};
</script>
