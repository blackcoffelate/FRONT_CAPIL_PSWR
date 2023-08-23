<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2 text-indigo-10">
        Grafik penduduk berdasarkan jenis kelamin
      </div>
      <div class="text-caption text-grey">
        Informasi Data penduduk dilihat dalam bentuk grafik sebagai bantuan
        analitik data
      </div>
      <Doughnut :data="dataDoughnut" :height="37" />
    </q-card-section>
  </q-card>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  components: {
    Doughnut,
  },
  props: {
    label: {
      type: Array,
      default: null,
    },
    jumlahLaki: {
      type: Array,
      default: null,
    },
    colorLaki: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      dataDoughnut: {
        labels: this.label,
        datasets: [
          {
            backgroundColor: this.colorLaki,
            data: this.jumlahLaki,
          },
        ],
      },
    };
  },
};
</script>
