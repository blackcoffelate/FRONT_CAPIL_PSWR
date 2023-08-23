<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label style="font-size: 16px" class="text-weight-medium text-indigo-10">Main Data Kepemilikan EKTP dan AKTE
        Kelahiran</q-item-label>
      <q-item-label style="font-size: 12px" class="text-caption text-grey-6 q-mb-md">Halaman data penduduk Kabupaten
        Pesawaran yang memiliki E-KTP dan AKTE
        dikelola langsung di bawah Dinas Kependudukan dan Catatan
        Sipil.</q-item-label>

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs">Memiliki E-KTP</q-item-label>
                    <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MEMILIKI_EKTP"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs">Tidak Memiliki E-KTP</q-item-label>
                    <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.TIDAK_MEMILIKI_EKTP"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs">Memiliki Akte Kelahiran</q-item-label>
                    <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MEMILIKI_AKTE"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs">Tidak Memiliki Akte Kelahiran</q-item-label>
                    <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.TIDAK_MEMILIKI_AKTE"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <q-item-label style="font-size: 16px" class="text-weight-medium text-indigo-10 q-mt-md">Table data
          penduduk</q-item-label>
        <q-item-label style="font-size: 12px" class="text-caption text-grey-6 q-mb-md">Seluruh data penduduk yang tersebar
          di area Kabupaten
          Pesawaran</q-item-label>

        <q-table :rows="rows" :columns="columns" :loading="loading" :filter="filter" @request="onRequest"
          v-model:pagination="pagination" flat binary-state-sort row-key="name"
          no-data-label="Belum ada data yang terdaftar">
          <template v-slot:top>
            <q-space />

            <q-btn flat color="blue-10" icon="search" dense rounded @click="visibles = !visibles" size="md"
              class="q-mr-sm" />
            <q-slide-transition>
              <div v-show="visibles">
                <q-input outlined debounce="400" placeholder="Cari warga berdasarkan" style="width: 300px" color="blue-10"
                  v-model="filter" dense />
              </div>
            </q-slide-transition>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-blue-10">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="NOMOR_KK" :props="props">
                <q-badge color="positive">{{ props.row.NOMOR_KK }}</q-badge>
              </q-td>
              <q-td key="NIK" :props="props">
                <q-badge color="primary">{{ props.row.NIK }}</q-badge>
              </q-td>
              <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                {{ props.row.NAMA_LENGKAP }}
                <q-tooltip>{{ props.row.NAMA_LENGKAP }}</q-tooltip>
              </q-td>
              <q-td key="EKTP" :props="props" class="text-uppercase">
                {{ props.row.EKTP }}
              </q-td>
              <q-td key="AKTE" :props="props" class="text-uppercase">
                {{ props.row.AKTE }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>

      <!-- <q-item-label style="font-size: 16px" class="text-weight-medium text-indigo-10 q-mt-md">Grafik
        Penduduk</q-item-label>
      <q-item-label style="font-size: 12px" class="text-caption text-grey-6 q-mb-md">
        Data penduduk dilihat dalam bentuk grafik sebagai bantuan analitik data.
      </q-item-label> -->

      <!-- <div class="row q-col-gutter-sm">
        <div class="col-md-6 col-xs-12">
          <ChartsBarKtp v-if="!loadingKtp" :label="ktp" :jumlahKtp="jumlahKtp" />
        </div>
        <div class="col-md-6 col-xs-12">
          <ChartsBarAkte v-if="!loadingAkte" :label="akte" :jumlahAkte="jumlahAkte" :colorAkte="colorAkte" />
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
// import ChartsBarKtp from "./../../components/MyCharts/ChartBarKtp.vue";
// import ChartsBarAkte from "./../../components/MyCharts/ChartBarAkte.vue";
import CountUp from "vue-countup-v3";

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

let data = [220, 182];
export default {
  name: "IndexPage",
  components: {
    // ChartsBarKtp,
    // ChartsBarAkte,
    CountUp
  },
  data() {
    return {
      confirmDialog: false,
      tab: "penduduk",
      ktp: [],
      jumlahKtp: [],
      colorAkte: [],
      akte: [],
      jumlahAkte: [],
      loadingAkte: true,
      loadingKtp: true,
      keluarga: [],
      dataKeluarga: [],
      PENDUDUK: 0,
      PRIA: 0,
      WANITA: 0,
      MEMILIKI_AKTE: 0,
      TIDAK_MEMILIKI_AKTE: 0,
      MEMILIKI_EKTP: 0,
      TIDAK_MEMILIKI_EKTP: 0,
      datagender: [],
      BANTUAN: null,
      PENYAKIT: null,
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
          name: "EKTP",
          align: "center",
          label: "MEMILIKI E-KTP",
          field: "EKTP",
        },
        {
          name: "AKTE",
          align: "center",
          label: "MEMILIKI AKTE",
          field: "AKTE",
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
      countMemeilikiAkte: 0,
      countTidakMemilikiAkte: 0,
      countMemilikiEktp: 0,
      countTidakMemilikiEktp: 0,
      duration: 2000,
      interval: null,
      intervalktp: null,
      datatahun: [],
      datacategory: [],
    };
  },
  mounted() {
    this.getCountAkte();
    this.getCountKtp();
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
    onRequest(props) {
      this.loading = true;
      this.$axios
        .get(
          `penduduk/?filter=${this.filter === "" ? null : this.filter}`,
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
            this.loading = false;
          }
        })
        .catch((err) => console.log(err));
    },
    async getCountAkte() {
      await this.$axios
        .get(`penduduk/getCount_akteKtp/akte`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;

            var memiliki = 0;
            var tidakmemiliki = 0;
            var label = [];
            var count = [];
            var color = [];

            data.map(function (datas) {
              if (datas._id != null) {
                if (datas._id.toLowerCase() === "ya") {
                  memiliki = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                  color.push("#70e000");
                } else {
                  tidakmemiliki = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                  color.push("#ef233c");
                }
              }
            });

            this.akte = label;
            this.jumlahAkte = count;
            this.colorAkte = color;
            this.MEMILIKI_AKTE = memiliki;
            this.TIDAK_MEMILIKI_AKTE = tidakmemiliki;

          }
          this.loadingAkte = false;
        })
        .catch((err) => console.log(err));
    },
    async getCountKtp() {
      console.log("getcountktp")
      await this.$axios
        .get(`penduduk/getCount_akteKtp/ektp`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            var memiliki = 0;
            var tidakmemiliki = 0;
            var label = [];
            var count = [];
            
            data.map(function (datas) {
              if (datas._id != null) {
                if (datas._id.toLowerCase() === "ya") {
                  memiliki = datas.count;
                } else {
                  tidakmemiliki = datas.count;
                }
              }
              label.push(datas._id);
              count.push(datas.count);
            });

            this.ktp = label;
            this.jumlahKtp = count;
            
            this.MEMILIKI_EKTP = memiliki;
            this.TIDAK_MEMILIKI_EKTP = tidakmemiliki;
          }
          this.loadingKtp = false;
        })
        .catch((err) => console.log(err));
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
