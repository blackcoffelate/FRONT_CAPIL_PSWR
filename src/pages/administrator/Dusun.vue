<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Dusun</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman data dusun Kabupaten Pesawaran yang dikelola sebagai master
        data.</q-item-label
      >

      <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Dusun</q-item-label
                  >
                  <q-item-label
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    >{{ this.countDusun }}</q-item-label
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
          >Table data dusun</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data dusun yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top>
            <q-btn
              color="blue-10"
              size="sm"
              icon="pix"
              label="Tambah Dusun"
              @click="confirmDialog = true"
            />
              
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
                  placeholder="Cari dusun berdasarkan"
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
                <q-badge color="positive" rounded>{{
                  props.row.id_dus
                }}</q-badge>
              </q-td>
              <q-td key="DUSUN" :props="props" class="text-capitalize">
                {{ props.row.nama }}
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
                    ><q-tooltip>perbaharui dusun</q-tooltip></q-btn
                  >
                  <q-btn
                    round
                    flat
                    @click="this.delete(props.row)"
                    color="blue-10"
                    size="sm"
                    icon="delete"
                    ><q-tooltip>hapus dusun</q-tooltip></q-btn
                  >
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>

      <q-dialog v-model="confirmDialog">
        <q-card style="width: 700px; max-width: 100vw">
          <q-form @submit="onSubmit()" class="q-gutter-md">
            <q-card-section class="bg-blue-10 text-white">
              <div class="text-h6">PENDAFTARAN DUSUN BARU</div>
              <div class="text-caption">
                Pastikan melakukan pengecekan data sebelum mendaftarkan
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-start">
                <q-select
                  standout="bg-blue-10 text-white"
                  v-model="form.AREA.KECAMATAN"
                  @update:model-value="getDes"
                  class="text-white col q-pa-sm text-capitalize"
                  label="Kecamatan"
                  :options="options.area.kecamatan"
                  option-label="nama"
                  key="nama"
                  dense
                  use-input
                  @filter="filterKec"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="map" class="q-pr-md" />
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
                <q-select
                  standout="bg-blue-10 text-white"
                  :disable="form.AREA.KECAMATAN === null"
                  v-model="form.id_kel"
                  class="text-white col q-pa-sm text-capitalize"
                  label="Desa"
                  :options="options.area.desa"
                  option-label="nama"
                  key="nama"
                  dense
                  use-input
                  @filter="filterDes"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="map" class="q-pr-md" />
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label class="text-capitalize">
                          {{ scope.opt.nama }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template></q-select
                >
              </div>
              <div class="row items-start">
                <q-input
                  standout="bg-blue-10 text-white"
                  v-model="form.nama"
                  class="text-white col-6 q-pa-sm text-capitalize"
                  label="Nama dusun"
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
              <div class="text-h6">UBAH DATA DUSUN</div>
              <div class="text-caption">
                Pastikan melakukan pengecekan data sebelum perubahan
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="row items-start">
                <q-input
                  standout="bg-blue-10 text-white"
                  v-model="form.nama"
                  class="text-white col text-capitalize"
                  label="Nama dusun"
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
              @click="this.deleteData(this.id_dus)"
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
import { ListService } from "./../../helper/services/ListService";
let { kecamatan, desa } = []

const model = () => {
  return {
    id_dus: null,
    id_kel: null,
    nama: null,
    AREA: {
      KECAMATAN: null,
    }
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
      id_dus: null,
      columns: [
        { name: "KODE", align: "left", label: "KODE", field: "KODE" },
        { name: "DUSUN", align: "left", label: "DUSUN", field: "DUSUN" },
        { name: "ACTION", align: "center", label: "", field: "ACTION" },
      ],
      options: {
        area: {
          kecamatan: [],
          desa: [],
        }
      },
      pagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 5,
      },
      filter: "",
      rows: [],
      visibles: false,
      countDusun: 0,
      duration: 2000,
      interval: null,
    };
  },
  mounted() {
    this.getCountDusun();
  },
  created() {
    this.getDusun();
    // this.getList();
    this.getKec();
  },
  methods: {
    getKec: async function() {
      await ListService.getListKecamatan().then((res) => {
        res.status === 200 ? kecamatan = res.data.data : kecamatan = []
      }).catch(() => {
        this.$commonErrorNotif();
      })
    },
    filterKec (val, update) {
      if (val === '') {
        update(() => {
          this.options.area.kecamatan = kecamatan
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.area.kecamatan = kecamatan.filter(v => v.nama.toLowerCase().indexOf(needle) > -1)
      })
    },
    getDes: async function(params) {
      await ListService.getListDesa(params.id_kec).then((res) => {
        res.status === 200 ? desa = res.data.data : desa = []
      }).catch(() => {
        this.$commonErrorNotif();
      })
    },
    filterDes (val, update) {
      if (val === '') {
        update(() => {
          this.options.area.desa = desa
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.area.desa = desa.filter(v => v.nama.toLowerCase().indexOf(needle) > -1)
      })
    },
    generateRandomId(length) {
      const randomStr = Math.floor(Math.random(length) * 1000);
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
      const randId = this.form.id_kel.id_kel + this.generateRandomId(5);
      this.form.id_dus = randId;
      this.form.id_kel = this.form.id_kel.id_kel
      this.$axios
        .post("dusun/create", this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getDusun();
            this.getCountDusun();
            this.resetField();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getDusun: async function () {
      this.$q.loading.show();
      await this.$axios
        .get(`dusun/`)
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
      this.form.id_dus = DATA.id_dus;
      this.form.nama = DATA.nama;
    },
    resetField() {
      this.form = model()
    },
    onUpdate() {
      this.$q.loading.show();
      this.$axios
        .put(`dusun/update/${this.form.id_dus}`, this.form)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.editDialog = false;
            this.getDusun();
            this.resetField();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    delete(DATA) {
      this.deleteDialog = true;
      this.id_dus = DATA.id_dus;
    },
    deleteData() {
      this.$q.loading.show();
      this.$axios
        .delete(`dusun/${this.id_dus}`)
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.getDusun();
            this.getCountDusun();
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    getCountDusun: async function () {
      this.$q.loading.show();
      this.$axios
        .get(`dusun/get/count`)
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;

            const incrementDusun = Math.ceil(data / (this.duration / 100));
            this.interval = setInterval(() => {
              if (this.countDusun < data) {
                this.countDusun += incrementDusun;
              } else {
                this.countDusun = data;
                clearInterval(this.interval);
              }
            }, 100);
          }
        })
        .catch(() => this.$commonErrorNotif());
    },
    filterFn: async function (val, update) {
      if (val === '') {
        update(() => {
          this.options.desa = listDesa
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options.desa = listDesa.filter(v => v.nama.toLowerCase().indexOf(needle) > -1)
      })
    }
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
