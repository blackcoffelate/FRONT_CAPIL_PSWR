<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2 text-indigo-10">
        Grafik penduduk berdasarkan usia
      </div>
      <div class="text-caption text-grey">
        Informasi Data penduduk dilihat dalam bentuk grafik sebagai bantuan
        analitik data
      </div>
      <Bar :data="chartBarUsia" :height="245" />
    </q-card-section>
  </q-card>
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
    color: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartBarUsia: {
        labels: this.label,
        datasets: [
          {
            label: "Data Usia",
            backgroundColor: ["#304FFE", "#ef6445", "#304FF1"],
            borderRadius: 6,
            data: this.jumlahBantuan,
            maxBarThickness: 30,
          },
        ],
      },
    };
  },
};
</script>
