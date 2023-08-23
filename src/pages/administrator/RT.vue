<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main RT</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data RT Kabupaten Pesawaran yang dikelola sebagai master
        data.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total RT</q-item-label
                  >
                  <q-item-label
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    >{{ this.countRT }}</q-item-label
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
          >Seluruh data RT yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top>
            <div class="col q-gutter-sm">
              <q-btn
                color="blue-10"
                size="sm"
                icon="pix"
                label="Tambah RT"
                @click="confirmDialog = true"
              />
            </div>
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
                  placeholder="Cari RT berdasarkan"
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
              <q-td key="KODE" :props="props" class="text-uppercase">
                <q-badge color="positive" rounded>{{ props.row.KODE_RT }}</q-badge>
              </q-td>
              <q-td key="RT" :props="props" class="text-capitalize">
                {{ props.row.NAMA }}
              </q-td>
              <q-td key="CREATED_AT" :props="props" class="text-capitalize">
                {{ this.$parseDate(props.row.created_at).timeStap }}
              </q-td>
              <q-td key="ACTION" :props="props">
                <div class="justify-center q-gutter-x-xs">
                  <q-btn
                    round
                    flat
                    color="blue-10"
                    @click="this.edit(props.row)"
                    size="sm"
                    icon="edit"
                    ><q-tooltip>perbaharui RT</q-tooltip></q-btn
                  >
                  <q-btn
                    round
                    flat
                    @click="this.delete(props.row)"
                    color="blue-10"
                    size="sm"
                    icon="delete"
                    ><q-tooltip>hapus RT</q-tooltip></q-btn
                  >
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>

      <q-dialog v-model="confirmDialog">
        <q-card style="width: 500px; max-width: 80vw">
          <q-form @submit="onSubmit()" class="q-gutter-md">
            <q-card-section class="bg-blue-10 text-white">
              <div class="text-h6">PENDAFTARAN RT BARU</div>
              <div class="text-caption">
                Pastikan melakukan pengecekan data sebelum mendaftarkan
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-start">
                <q-input
                  standout="bg-blue-10 text-white"
                  v-model="form.NAMA"
                  class="text-white col text-uppercase"
                  label="Nama RT"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="pix" class="q-pr-md" /> </template
                ></q-input>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
              <q-btn type="submit" label="Tambahkan" v-close-popup flat dense />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>

      <q-dialog v-model="editDialog">
        <q-card style="width: 500px; max-width: 80vw">
          <q-form @submit="onEdit()" class="q-gutter-md">
            <q-card-section class="bg-blue-10 text-white">
              <div class="text-h6">UBAH DATA RT</div>
              <div class="text-caption">
                Pastikan melakukan pengecekan data sebelum perubahan
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-start">
                <q-input
                  standout="bg-blue-10 text-white"
                  v-model="form.NAMA"
                  class="text-white col text-uppercase"
                  label="Nama RT"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="pix" class="q-pr-md" /> </template
                ></q-input>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-grey-3 text-indigo q-py-md">
              <q-btn
                type="submit"
                label="Update Data"
                v-close-popup
                flat
                dense
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="deleteDialog"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card class="bg-blue-10 text-white">
          <q-bar>
            <div></div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">Informasi</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Apakah anda yakin akan menghapus data ini ? Penghapusan data
            bersifat permanen yang berarti data ini tidak akan di simpan lagi di
            dalam database sistem.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              @click="this.deleteData(this.GUID)"
              flat
              label="Lanjutkan"
              color="white"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
const model = () => {
  return {
    GUID: null,
    KODE_RT: null,
    NAMA: null,
  };
};

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      confirmDialog: false,
      editDialog: false,
      deleteDialog: false,
      form: model(),
      GUID: null,
      columns: [
        { name: "KODE", align: "left", label: "KODE", field: "KODE" },
        { name: "RT", align: "left", label: "RT", field: "RT" },
        {
          name: "CREATED_AT",
          align: "left",
          label: "TANGGAL DAFTAR",
          field: "CREATED_AT",
        },
        { name: "ACTION", align: "center", label: "", field: "ACTION" },
      ],
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      filter: "",
      rows: [],
      visibles: false,
      countRT: 0,
      duration: 2000,
      interval: null,
    };
  },
  mounted() {
    this.getCountRT();
  },
  created() {
    this.getRT();
  },
  methods: {
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    onSubmit() {
      this.onCreate();
    },
    onEdit() {
      this.onUpdate();
    },
    onCreate() {
      this.$q.loading.show();
      this.form.KODE_RT = this.generateRandomId(5);
      this.$axios
        .post("rt/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getRT();
            this.getCountRT();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getRT: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`rt/`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rows = response.data.data;
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    edit(DATA) {
      this.editDialog = true;
      this.form.GUID = DATA.GUID;
      this.form.KODE_RT = DATA.KODE_RT;
      this.form.NAMA = DATA.NAMA;
    },
    onUpdate() {
      this.$q.loading.show();
      this.$axios
        .put(`rt/update/${this.form.GUID}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getRT();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    delete(DATA) {
      this.deleteDialog = true;
      this.GUID = DATA.GUID;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`rt/${this.GUID}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getRT();
            this.getCountRT();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getCountRT: async function () {
      this.$q.loading.show();
      this.$axios
        .get(`rt/get/count`)
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;

            const incrementRT = Math.ceil(data / (this.duration / 100));
            this.interval = setInterval(() => {
              if (this.countRT < data) {
                this.countRT += incrementRT;
              } else {
                this.countRT = data;
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
