<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Desa</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data desa Kabupaten Pesawaran yang dikelola sebagai master
        data.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Desa</q-item-label
                  >
                  <q-item-label
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    >{{ this.countDesa }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col"></div>

          <div class="col"></div>
        </div>

        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10 q-mt-md"
          >Table data desa</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data desa yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
        >
          <template v-slot:top>
            <div class="q-gutter-sm">
              <q-btn
                color="blue-10"
                size="sm"
                icon="filter_list"
                label="Filter Kecamatan"
                @click="cetak = true"
              >
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  :offset="[0, 10]"
                  class="q-mt-md"
                >
                  <q-list style="min-width: 100%; width: 400px">
                    <q-form @submit="onFilter()" class="q-gutter-md">
                      <q-item>
                        <q-item-section>
                          <q-item-label caption>Pilih Kecamatan</q-item-label>
                          <q-item-label>
                            <q-select
                              standout="bg-blue-10 text-white"
                              v-model="form.KECAMATAN"
                              class="text-white col text-capitalize"
                              label="Kecamatan"
                              :options="options.kecamatan"
                              option-label="nama"
                              key="nama"
                              dense
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    No results
                                  </q-item-section>
                                </q-item>
                              </template>
                              <template v-slot:prepend>
                                <q-icon name="pix" class="q-pr-md" />
                              </template>
                              <template v-slot:option="scope">
                                <q-item v-bind="scope.itemProps">
                                  <q-item-section>
                                    <q-item-label class="text-capitalize"
                                      >{{ scope.opt.nama }}
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                              </template></q-select
                            >
                          </q-item-label>
                          <q-item-label><q-btn class="q-mt-sm" type="submit" color="blue-10" label="Filter Data" v-close-popup flat dense /></q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-form>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
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
              <q-td key="KODE" :props="props" class="text-uppercase">
                <q-badge color="positive" rounded>{{
                  props.row.id_kel
                }}</q-badge>
              </q-td>
              <q-td key="DESA" :props="props" class="text-capitalize">
                {{ props.row.nama }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ListService } from "./../../helper/services/ListService";

const model = () => {
  return {
    KECAMATAN: null,
  };
};

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      form: model(),
      GUID: null,
      columns: [
        { name: "KODE", align: "left", label: "KODE DESA", field: "KODE" },
        { name: "DESA", align: "left", label: "DESA", field: "DESA" },
      ],
      options: {
        kecamatan: [],
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      rows: [],
      visibles: false,
      countDesa: 0,
      duration: 2000,
      interval: null,
    };
  },
  mounted() {
    this.getCountDesa();
  },
  created() {
    this.getDesa();
    this.getList();
  },
  methods: {
    getList() {
      ListService.getListKecamatan()
        .then((res) => {
          this.options.kecamatan = res.data.data;
        })
        .catch(() => this.$commonErrorNotif());
    },
    onFilter() {
      this.onFilterData();
    },
    onFilterData: async function () {
      console.log(this.form.KECAMATAN.id_kec)
      this.$q.loading.show();
      await this.$axios
        .get(`area/desa/${this.form.KECAMATAN.id_kec}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getDesa: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`area/desa/`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getCountDesa: async function () {
      this.$q.loading.show();
      this.$axios
        .get(`area/getCountDesa`)
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;

            const incrementDesa = Math.ceil(data / (this.duration / 100));
            this.interval = setInterval(() => {
              if (this.countDesa < data) {
                this.countDesa += incrementDesa;
              } else {
                this.countDesa = data;
                clearInterval(this.interval);
              }
            }, 100);
          }
        })
        .catch(() => this.$commonErrorNotif());
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
