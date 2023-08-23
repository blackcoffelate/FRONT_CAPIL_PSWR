<template>
  <q-page class="row q-pa-xl q-gutter-sm">
    <div class="col">
      <q-card class="my-card q-pa-md">
        <q-item-label style="font-size: 16px" class="text-weight-medium text-indigo-10">Form data penduduk</q-item-label>
        <q-item-label style="font-size: 12px" class="text-caption text-grey-6 q-mb-md">Pastikan melakukan pengecekan data
          sebelum melakukan input data
          penduduk</q-item-label>

        <q-form @reset="resetField()" @submit="onSubmit()" class="q-gutter-md q-mt-md">
          <q-card-section class="q-pt-none">
            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar size="sm" color="primary" text-color="white" class="q-mr-md" icon="calendar_month" />Data Diambil
            </div>
            <div class="row items-start">
              <q-input standout="bg-blue-10 text-white" v-model="form.TAHUN" class="text-white col-4 q-pa-sm"
                label="Data Tahun" mask="####" dense lazy-rules :rules="defaultRules">
                <template v-slot:prepend>
                  <q-icon name="calendar_month" class="q-pr-md" /> </template></q-input>
            </div>
            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar size="sm" color="primary" text-color="white" class="q-mr-md" icon="admin_panel_settings" />Data
              Pokok
            </div>
            <div class="row items-start">
              <q-input standout="bg-blue-10 text-white" v-model="form.NAMA_LENGKAP"
                class="text-white col-4 q-pa-sm text-capitalize" label="Nama Lengkap" dense lazy-rules
                :rules="defaultRules">
                <template v-slot:prepend>
                  <q-icon name="account_circle" class="q-pr-md" />
                </template>
              </q-input>
              <q-input standout="bg-blue-10 text-white" v-model="form.NOMOR_KK"
                class="text-white col-4 q-pa-sm text-capitalize" label="Nomor Kartu Keluarga" mask="################"
                dense lazy-rules :rules="kkRules">
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-input standout="bg-blue-10 text-white" v-model="form.NIK"
                class="text-white col-4 q-pa-sm text-capitalize" label="Nomor Induk Kependudukan" mask="################"
                dense lazy-rules :rules="nikRules">
                <template v-slot:prepend>
                  <q-icon name="pin" class="q-pr-md" />
                </template>
              </q-input>
              <q-select standout="bg-blue-10 text-white" v-model="form.EKTP"
                class="text-white col-4 q-pa-sm text-capitalize" label="Memiliki E-KTP" :options="options.ektp" dense
                lazy-rules :rules="defaultRules">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="badge" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.AKTE"
                class="text-white col-4 q-pa-sm text-capitalize" label="Memiliki Akte" :options="options.akte" dense
                lazy-rules :rules="defaultRules">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="badge" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.JENIS_KELAMIN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Jenis Kelamin" :options="options.jeniskelamin"
                dense lazy-rules :rules="defaultRules" use-input @filter="filterJenisKelamin">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="female" class="q-pr-md" />
                </template>
              </q-select>
              <q-input standout="bg-blue-10 text-white" v-model="form.TANGGAL_LAHIR" class="text-white col-4 q-pa-sm"
                label="Tanggal Lahir" type="date" dense lazy-rules :rules="defaultRules">
                <template v-slot:prepend>
                  <q-icon name="person_pin" class="q-pr-md" /> </template></q-input>
              <q-select standout="bg-blue-10 text-white" v-model="form.STATUS_PERNIKAHAN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Status Pernikahan"
                :options="options.statuspernikahan" dense lazy-rules :rules="defaultRules" use-input @filter="filterStatusPernikahan">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="baby_changing_station" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.HUBUNGAN_KEPALA_KELUARGA"
                class="text-white col-4 q-pa-sm text-capitalize" label="Hubungan Keluarga"
                :options="options.hubungankeluarga" dense lazy-rules :rules="defaultRules" use-input @filter="filterHubunganKeluarga">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="family_restroom" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.PENGHASILAN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Penghasilan" :options="options.penghasilan" dense
                lazy-rules :rules="defaultRules" use-input @filter="filterPenghasilan">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="account_balance_wallet" class="q-pr-md" />
                </template>
              </q-select>
            </div>

            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar size="sm" color="primary" text-color="white" class="q-mr-md" icon="bedroom_parent" />Data
              Pendukung
            </div>
            <div class="row items-start">
              <q-select standout="bg-blue-10 text-white" v-model="form.HP"
                class="text-white col-4 q-pa-sm text-capitalize" label="Memiliki Handphone" :options="options.hp" dense
                lazy-rules :rules="defaultRules">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="phone_iphone" class="q-pr-md" />
                </template>
              </q-select>

              <q-select standout="bg-blue-10 text-white" v-model="form.PENYAKIT"
                class="text-white col-4 q-pa-sm text-capitalize" label="Penderita Penyakit" :options="options.penyakit"
                dense lazy-rules :rules="defaultRules" multiple use-chips>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="self_improvement" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.BANTUAN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Pemilik Bantuan" :options="options.bantuan" dense
                lazy-rules :rules="defaultRules" multiple use-chips>
                <template v-slot:prepend>
                  <q-icon name="volunteer_activism" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.SUMBER_AIR_MINUM"
                class="text-white col-4 q-pa-sm text-capitalize" label="Sumber Air Minum"
                :options="options.sumberairminum" dense lazy-rules :rules="defaultRules" use-input @filter="filterSumberAirMinum">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="water_drop" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.SUMBER_PENERANGAN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Sumber Penerangan"
                :options="options.sumberpenerangan" dense lazy-rules :rules="defaultRules" use-input @filter="filterSumberPenerangan">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="light" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.BAHAN_BAKAR_MASAK"
                class="text-white col-4 q-pa-sm text-capitalize" label="Bahan Bakar Masak"
                :options="options.bahanbakarmasak" dense lazy-rules :rules="defaultRules" use-input @filter="filterBahanBakarMasak">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="outdoor_grill" class="q-pr-md" />
                </template>
              </q-select>
              <q-select standout="bg-blue-10 text-white" v-model="form.FASILITAS_BAB"
                class="text-white col-4 q-pa-sm text-capitalize" label="Fasilitas BAB" :options="options.fasilitasbab"
                dense lazy-rules :rules="defaultRules" use-input @filter="filterFasilitasBab">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:prepend>
                  <q-icon name="accessible" class="q-pr-md" />
                </template>
              </q-select>
            </div>

            <div class="text-caption q-pa-sm text-weight-bold flex-center">
              <q-avatar size="sm" color="primary" text-color="white" class="q-mr-md" icon="home" />Data Tempat Tinggal
            </div>
            <div class="row items-start">
              <q-select standout="bg-blue-10 text-white" v-model="form.AREA.KECAMATAN" @update:model-value="getDes"
                class="text-white col-4 q-pa-sm text-capitalize" label="Kecamatan" :options="options.area.kecamatan"
                option-label="nama" key="nama" dense use-input @filter="filterKec">
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
                      <q-item-label class="text-capitalize">{{ scope.opt.nama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template></q-select>
              <q-select standout="bg-blue-10 text-white" :disable="form.AREA.KECAMATAN === null" v-model="form.AREA.DESA"
                @update:model-value="getDus" class="text-white col-4 q-pa-sm text-capitalize" label="Desa"
                :options="options.area.desa" option-label="nama" key="nama" dense use-input @filter="filterDes">
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
                </template></q-select>
              <q-select standout="bg-blue-10 text-white" :disable="form.AREA.DESA === null" v-model="form.AREA.DUSUN"
                class="text-white col-4 q-pa-sm text-capitalize" label="Dusun" :options="options.area.dusun"
                option-label="nama" key="nama" dense use-input @filter="filterDus">
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
                      <q-item-label class="text-capitalize">{{ scope.opt.nama }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template></q-select>
              <q-input standout="bg-blue-10 text-white" v-model="form.AREA.RT" class="text-white col-4 q-pa-sm" label="RT"
                mask="####" dense lazy-rules :rules="defaultRules">
                <template v-slot:prepend>
                  <q-icon name="map" class="q-pr-md" /> </template></q-input>
            </div>

          </q-card-section>

          <q-card-actions align="right" class="bg-grey-3 text-indigo-10 q-py-md">
            <q-btn type="submit" label="Tambahkan" v-close-popup dense color="blue-10" />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ListService } from "./../../helper/services/ListService";
let { kecamatan, desa, dusun } = [];
const hp = ["Ya", "Tidak"];
const akte = ["Ya", "Tidak"];
const ektp = ["Ya", "Tidak"];
const jeniskelamin = ["Laki - Laki", "Perempuan"];
const fasilitasbab = ["Leher Angsa", "Plengsengan Dengan Tutup", "Plengsengan Tanpa Tutup", "Cemplung / Cubluk"];
const bahanbakarmasak = ["Listrik", "Gas Elpiji 5.5 Kg / Blue Gas", "Gas Elpiji 12 Kg", "Gas Elpiji 3 Kg", "Gas Kota / Meteran PGN", "Biogas", "Minyak Tanah", "Briket"];
const sumberpenerangan = ["Listrik PLN Dengan Meteran", "Listrik PLN Tanpa Meteran", "Listrik NON-PLN", "Bukan Listrik"];
const sumberairminum = ["Air Kemasan Bermerk", "Air Isi Ulang", "Leding", "Sumur Bor / Pompa", "Sumur Terlindung", "Sumur Tak Terlindung", "Mata Air Lindung", "Mata Air Tak Terlindung", "Air Permukaan (Sungai/Waduk/Danau/Kolam/Irigasi)", "Air Hujan", "Lainnya"];
const statuspernikahan = ["Belum Kawin", "Kawin / Nikah", "Cerai Hidup", "Cerai Mati"];
const hubungankeluarga = ["Kepala Keluarga", "Istri / Suami", "Anak", "Cucu", "Orang Tua / Mertua", "Pembantu / Supir", "Menantu", "Lainnya"];
const penyakit = ["Tidak Ada", "Hypertensi", "Diabetes Melitus", "TBC", "Malaria", "Lainnya"];
const bantuan = [ 'Tidak Ada', 'BPJS', 'PKH', 'BPNT', 'BLT', 'Lainnya'];
const penghasilan = ["< Rp. 350.000", "Rp. 350.000 < Rp. 420.000", "Rp. 420.000 < Rp. 1.000.000", "Rp 1.000.000 < Rp. 2.440.486", "Rp. 2.440.486 < Rp. 5.000.000", "> Rp. 5.000.000", "Tidak Memiliki penghasilan"];

const model = () => {
  return {
    TAHUN: null,
    NOMOR_KK: null,
    NIK: null,
    NAMA_LENGKAP: null,
    JENIS_KELAMIN: null,
    TANGGAL_LAHIR: null,
    STATUS_PERNIKAHAN: null,
    HUBUNGAN_KEPALA_KELUARGA: null,
    PENGHASILAN: null,
    AREA: {
      PROVINSI: { id_prov: "18", nama: "Lampung" },
      KABUPATEN: {
        id_kab: "1809",
        id_prov: "18",
        nama: "KAB. PESAWARAN",
        id_jenis: "1",
      },
      KECAMATAN: null,
      DESA: null,
      DUSUN: null,
      RT: null,
    },
    EKTP: null,
    AKTE: null,
    HP: null,
    SUMBER_AIR_MINUM: null,
    SUMBER_PENERANGAN: null,
    BAHAN_BAKAR_MASAK: null,
    FASILITAS_BAB: null,
    PENYAKIT: [],
    BANTUAN: [],
  };
};

const modelPenyakit = () => {
  return {
    NOMOR_KK: null,
    NIK: null,
    PENYAKIT: [],
  };
};

const modelBantuan = () => {
  return {
    NOMOR_KK: null,
    NIK: null,
    BANTUAN: [],
  };
};

export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      defaultRules: [
        (val) => (val && val.length > 0) || 'Please type something',
      ],
      kkRules: [
        (val) => (val && val.length > 0) || 'Please type something',
        val => val.length >= 0 && val.length >= 16 || 'Digit NOMOR KK Kurang'
      ],
      nikRules: [
        (val) => (val && val.length > 0) || 'Please type something',
        val => val.length >= 0 && val.length >= 16 || 'Digit NIK Kurang'
      ],
      form: model(),
      formPenyakit: modelPenyakit(),
      formBantuan: modelBantuan(),
      options: {
        jeniskelamin,
        fasilitasbab,
        bahanbakarmasak,
        sumberpenerangan,
        sumberairminum,
        hp,
        ektp,
        akte,
        statuspernikahan,
        hubungankeluarga,
        penghasilan,
        penyakit,
        bantuan,
        area: {
          kecamatan: [],
          desa: [],
          dusun: [],
        },
      },
    };
  },
  created() {
    this.getKec();
  },
  methods: {
    filterJenisKelamin(val, update) {
      if (val === "") {
        update(() => {
          this.options.jeniskelamin = jeniskelamin;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.jeniskelamin = jeniskelamin.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterStatusPernikahan(val, update) {
      if (val === "") {
        update(() => {
          this.options.statuspernikahan = statuspernikahan;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.statuspernikahan = statuspernikahan.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterHubunganKeluarga(val, update) {
      if (val === "") {
        update(() => {
          this.options.hubungankeluarga = hubungankeluarga;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.hubungankeluarga = hubungankeluarga.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterPenghasilan(val, update) {
      if (val === "") {
        update(() => {
          this.options.penghasilan = penghasilan;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.penghasilan = penghasilan.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterSumberAirMinum(val, update) {
      if (val === "") {
        update(() => {
          this.options.sumberairminum = sumberairminum;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.sumberairminum = sumberairminum.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterSumberPenerangan(val, update) {
      if (val === "") {
        update(() => {
          this.options.sumberpenerangan = sumberpenerangan;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.sumberpenerangan = sumberpenerangan.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterBahanBakarMasak(val, update) {
      if (val === "") {
        update(() => {
          this.options.bahanbakarmasak = bahanbakarmasak;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.bahanbakarmasak = bahanbakarmasak.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterFasilitasBab(val, update) {
      if (val === "") {
        update(() => {
          this.options.fasilitasbab = fasilitasbab;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.fasilitasbab = fasilitasbab.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    getKec: async function () {
      await ListService.getListKecamatan()
        .then((res) => {
          res.status === 200 ? (kecamatan = res.data.data) : (kecamatan = []);
        })
        .catch(() => {
          this.$commonErrorNotif();
        });
    },
    filterKec(val, update) {
      if (val === "") {
        update(() => {
          this.options.area.kecamatan = kecamatan;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.area.kecamatan = kecamatan.filter(
          (v) => v.nama.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    getDes: async function (params) {
      await ListService.getListDesa(params.id_kec)
        .then((res) => {
          res.status === 200 ? (desa = res.data.data) : (desa = []);
        })
        .catch(() => {
          this.$commonErrorNotif();
        });
    },
    filterDes(val, update) {
      if (val === "") {
        update(() => {
          this.options.area.desa = desa;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.area.desa = desa.filter(
          (v) => v.nama.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    getDus: async function (params) {
      await ListService.getListDusun(params.id_kel)
        .then((res) => {
          res.status === 200 ? (dusun = res.data.data) : (dusun = []);
        })
        .catch(() => {
          this.$commonErrorNotif();
        });
    },
    filterDus(val, update) {
      if (val === "") {
        update(() => {
          this.options.area.dusun = dusun;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options.area.dusun = dusun.filter(
          (v) => v.nama.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    onSubmit() {
      this.onCreate();
    },
    resetField() {
      this.form = model()
      this.defaultRules = null
      this.nikRules = null
      this.kkRules = null
    },
    async onCreate() {
      this.$q.loading.show();
      await this.$axios
        .post(
          "createAllData/create",
          this.form,
          this.formPenyakit,
          this.formBantuan
        )
        .finally(() => this.$q.loading.hide())
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.$successNotif(response.data.message, "positive");
            this.resetField()
          }
        })
        .catch((err) => {
          console.log(err);
          this.$commonErrorNotif();
        });
    },
  },
};
</script>
