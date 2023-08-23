<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Kecamatan</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data kecamatan Kabupaten Pesawaran yang dikelola sebagai master
        data.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Kecamatan</q-item-label
                  >
                  <q-item-label
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    >{{ this.countKecamatan }}</q-item-label
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
          >Table data kecamatan</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data kecamatan yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
        >
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
              <q-td key="KODE_KECAMATAN" :props="props" class="text-uppercase">
                <q-badge color="positive" rounded>{{
                  props.row.id_kec
                }}</q-badge>
              </q-td>
              <q-td key="KECAMATAN" :props="props" class="text-capitalize">
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
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      columns: [
        {
          name: "KODE_KECAMATAN",
          align: "left",
          label: "KODE KECAMATAN",
          field: "KODE_KECAMATAN",
        },
        {
          name: "KECAMATAN",
          align: "left",
          label: "KECAMATAN",
          field: "KECAMATAN",
        },
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      rows: [],
      visibles: false,
      countKecamatan: 0,
      duration: 2000,
      interval: null,
    };
  },
  mounted() {
    this.getCountKecamatan();
  },
  created() {
    this.getKecamatan();
  },
  methods: {
    getKecamatan: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`area/kecamatan/1809`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getCountKecamatan: async function () {
      this.$q.loading.show();
      this.$axios
        .get(`area/getCountKecamatan/1809`)
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            console.log(data);

            const incrementKecamatan = Math.ceil(data / (this.duration / 100));
            this.interval = setInterval(() => {
              if (this.countKecamatan < data) {
                this.countKecamatan += incrementKecamatan;
              } else {
                this.countKecamatan = data;
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
