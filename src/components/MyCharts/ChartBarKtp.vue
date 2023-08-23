<template>
  <Bar :data="chartBarKtp" :height="150" />
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
    jumlahKtp: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartBarKtp: {
        labels: this.label,
        datasets: [
          {
            label: "Data Ktp",
            backgroundColor: ["#304FFE", "#ef6445", "#304FF1"],
            borderRadius: 6,
            data: this.jumlahKtp,
            maxBarThickness: 30,
          },
        ],
      },
    };
  },
};
</script>
