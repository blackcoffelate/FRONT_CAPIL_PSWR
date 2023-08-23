<template>
  <Bar :data="chartBarPenyakit" :height="150" />
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
    arrayJumlah: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartBarPenyakit: {
        labels: this.label,
        datasets: [
          {
            label: "Data Penyakit",
            backgroundColor: ["#304FFE", "#ef6445", "#304FF1"],
            borderRadius: 6,
            data: this.arrayJumlah,
            maxBarThickness: 30,
            minBarLength: 10,
          },
        ],
      },
    };
  },
};
</script>
