<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Data Bantuan Penduduk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data sebaran bantuan yang di dapatkan penduduk Kabupaten
        Pesawaran yang dikelola langsung di bawah Dinas Sosial.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm items-start">
          <div class="col" v-for="(d, i) in databantuan" :key="i">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-weight-medium q-mb-xs text-uppercase"
                    >{{ d._id }}</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="d.count"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10 q-mt-md"
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
                <q-badge color="positive">{{ props.row.NOMOR_KK }}</q-badge>
              </q-td>
              <q-td key="NIK" :props="props">
                <q-badge color="primary">{{ props.row.NIK }}</q-badge>
              </q-td>
              <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                {{ props.row.PENDUDUK.NAMA_LENGKAP }}
              </q-td>
              <q-td key="BANTUAN" :props="props" class="text-uppercase q-gutter-sm">
                <q-badge color="positive" v-for="(d, i) in props.row.BANTUAN" :key="i">{{ d }}</q-badge>
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

      <!-- <div class="row q-gutter-sm">
        <div class="col-md-12 col-xs-12">
          <ChartsBarBantuan
            v-if="!loading"
            :label="bantuan"
            :jumlahBantuan="jumlahBantuan"
          />
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import CountUp from "vue-countup-v3";
// import ChartsBarBantuan from "./../../components/MyCharts/ChartBarBantuan.vue";
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
    // ChartsBarBantuan,
    CountUp
  },
  data() {
    return {
      confirmDialog: false,
      tab: "penduduk",
      keluarga: [],
      loading: true,
      bantuan: [],
      jumlahBantuan: [],
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
          name: "BANTUAN",
          align: "center",
          label: "JENIS BANTUAN",
          field: "BANTUAN",
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
      countMemeilikiAkte: 0,
      countTidakMemilikiAkte: 0,
      countMemilikiEktp: 0,
      countTidakMemilikiEktp: 0,
      duration: 2000,
      interval: null,
      intervalktp: null,
      datatahun: [],
      databantuan: [],
    };
  },
  mounted() {
    this.getCountBantuan();
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
          `bantuan/?filter=${this.filter === "" ? null : this.filter}`,
          this.$createPaginate(props)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            console.log(response.data.data)
            this.rows = response.data.data;
            this.pagination.rowsPerPage = Number(response.data.resPerPage);
            this.pagination.page = Number(response.data.page);
            this.pagination.rowsNumber = Number(response.data.countData);
            this.loading = false;
          }
        })
        .catch((err) => console.log(err));
    },
    getCountBantuan() {
      this.$axios
        .get("bantuan/getCountBantuan")
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            data.forEach((data) => {
              this.COUNT = data.count;
              const incrementCount = Math.ceil(
                this.COUNT / (this.duration / 100)
              );
              this.interval = setInterval(() => {
                if (this.countData < this.COUNT) {
                  this.countData += incrementCount;
                } else {
                  this.countData = this.COUNT;
                  clearInterval(this.interval);
                }
              }, 100);

              this.databantuan.push(data);
            });
            res.data.data.forEach((datax) => {
              this.bantuan.push(datax._id);
              this.jumlahBantuan.push(datax.count);
            });
            this.loading = false;
          }
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
