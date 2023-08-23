<template>
  <Bar :data="chartBarBantuan" :height="150" />
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  components: {
    Bar,
  },
  props: {
    label: {
      type: Array,
      default: null,
    },
    jumlahBantuan: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartBarBantuan: {
        labels: this.label,
        datasets: [
          {
            label: "Data Bantuan",
            backgroundColor: ["#304FFE", "#ef6445", "#304FF1"],
            borderRadius: 6,
            data: this.jumlahBantuan,
            maxBarThickness: 30,
            minBarLength: 10,
          },
        ],
      },
    };
  },
};
</script>
