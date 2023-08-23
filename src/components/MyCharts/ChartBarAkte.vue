<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2 text-indigo-10">Grafik kepemilikan Akte</div>
      <div class="text-caption text-grey">
        Informasi data kepemilikan Akte penduduk Kabupaten Pesawaran yang di
        lihat dalam bentuk grafik analitik.
      </div>
      <Bar :data="chartBarAkte" :height="245" />
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
    jumlahAkte: {
      type: Array,
      default: null,
    },
    colorAkte: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chartBarAkte: {
        labels: this.label,
        datasets: [
          {
            label: "DATA",
            backgroundColor: this.colorAkte,
            borderRadius: 6,
            data: this.jumlahAkte,
            maxBarThickness: 30,
          },
        ],
      },
    };
  },
};
</script>
