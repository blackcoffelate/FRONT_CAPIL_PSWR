<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Data Kesehatan Penduduk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data sebaran penderita penyakit penduduk Kabupaten Pesawaran
        yang dikelola langsung di bawah Dinas Kesehatan.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10"
          >Table data penduduk</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data penduduk yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :loading="loading"
          :filter="filter"
          @request="onRequest"
          v-model:pagination="pagination"
          flat
          binary-state-sort
          row-key="name"
          no-data-label="Belum ada data yang terdaftar"
        >
          <template v-slot:top>
            <q-space />

            <q-btn
              flat
              color="blue-10"
              icon="search"
              dense
              rounded
              @click="visibles = !visibles"
              size="md"
              class="q-mr-sm"
            />
            <q-slide-transition>
              <div v-show="visibles">
                <q-input
                  outlined
                  debounce="400"
                  placeholder="Cari warga berdasarkan"
                  style="width: 300px"
                  color="blue-10"
                  v-model="filter"
                  dense
                />
              </div>
            </q-slide-transition>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-blue-10"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="NOMOR_KK" :props="props">
                <q-badge color="positive">{{
                  props.row.PENDUDUK.NOMOR_KK
                }}</q-badge>
              </q-td>
              <q-td key="NIK" :props="props">
                <q-badge color="primary">{{ props.row.NIK }}</q-badge>
              </q-td>
              <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                {{ props.row.PENDUDUK.NAMA_LENGKAP }}
              </q-td>
              <q-td key="PENYAKIT" :props="props" class="text-uppercase">
                <q-badge color="positive" v-for="(d, i) in props.row.PENYAKIT" :key="i">{{ d }}</q-badge>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>

      <!-- <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10 q-mt-md"
        >Grafik Penduduk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Data penduduk dilihat dalam bentuk grafik sebagai bantuan analitik
        data.</q-item-label
      > -->

      <!-- <div class="row">
        <q-card class="col-md-12">
          <ChartsBarPenyakit
            v-if="!loading"
            :label="arrayPenyakit"
            :arrayJumlah="arrayJumlah"
          />
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </q-card>
      </div> -->
    </div>
  </q-page>
</template>

<script>
// import ChartsBarPenyakit from "./../../components/MyCharts/ChartBarPenyakit.vue";
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "IndexPage",
  components: {
    // ChartsBarPenyakit,
    // apexchart: VueApexCharts
  },
  data() {
    return {
      columns: [
        {
          name: "NOMOR_KK",
          label: "NOMOR KK",
          align: "left",
          field: "NOMOR_KK",
        },
        { name: "NIK", align: "left", label: "NIK", field: "NIK" },
        {
          name: "NAMA_LENGKAP",
          align: "left",
          label: "NAMA LENGKAP",
          field: "NAMA_LENGKAP",
        },
        {
          name: "PENYAKIT",
          align: "center",
          label: "PENYAKIT DI DERITA",
          field: "PENYAKIT",
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5,
      },
      filter: null,
      rows: [],
      visibles: false,
      countData: 0,
      loading: true,
      duration: 2000,
      interval: null,
      dataPenyakit: [],
      arrayPenyakit: [],
      arrayJumlah: [],
      datacategory: [],
      series: [
        {
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
      ],
      // chartOptions: {
      //   chart: {
      //     type: "bar",
      //     height: 350,
      //   },
      //   plotOptions: {
      //     bar: {
      //       borderRadius: 4,
      //       horizontal: true,
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   xaxis: {
      //     categories: [
      //       "South Korea",
      //       "Canada",
      //       "United Kingdom",
      //       "Netherlands",
      //       "Italy",
      //       "France",
      //       "Japan",
      //       "United States",
      //       "China",
      //       "Germany",
      //     ],
      //   },
      // },
    };
  },
  mounted() {
    this.getCountPenyakit();
    this.renderChartPenyakit();
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter,
      });
    },
    async renderChartPenyakit() {
      await this.$axios
        .get(`penyakit/getCountPenyakit`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            res.data.data.forEach((datax) => {
              // datax._id = datax._id;
              this.arrayPenyakit.push(datax._id);
              this.arrayJumlah.push(datax.count);
            });
            this.loading = false;
          }
        })
        .catch((err) => console.log(err));
    },
    onRequest(props) {
      this.loading = true;
      this.$axios
        .get(
          `penyakit/?filter=${this.filter === "" ? null : this.filter}`,
          this.$createPaginate(props)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
            this.pagination.rowsPerPage = Number(response.data.resPerPage);
            this.pagination.page = Number(response.data.page);
            this.pagination.rowsNumber = Number(response.data.countData);
          }
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    getCountPenyakit() {
      // this.$axios
      //   .get("penyakit/getCountPenyakit")
      //   .then((res) => {
      //     if (!this.$parseResponse(res.data)) {
      //       const data = res.data.data;
      //       res.data.data.forEach((datax) => {
      //         this.COUNT = datax.count;
      //         const incrementCount = Math.ceil(
      //           this.COUNT / (this.duration / 100)
      //         );
      //         this.interval = setInterval(() => {
      //           if (this.countData < this.COUNT) {
      //             this.countData += incrementCount;
      //           } else {
      //             this.countData = this.COUNT;
      //             clearInterval(this.interval);
      //           }
      //         }, 100);
      //         this.dataPenyakit.push(datax);
      //       });
      //     }
      //   })
      //   .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.counter-animation {
  /* Gaya animasi CSS */
  font-size: 26px;
  font-weight: bold;
  animation: counterAnimation linear 2s;
}

@keyframes counterAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
