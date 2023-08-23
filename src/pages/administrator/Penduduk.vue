<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Penduduk</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
      >
        Halaman data penduduk Kabupaten Pesawaran yang dikelola langsung di
        bawah Dinas Kependudukan dan Catatan Sipil.
      </q-item-label>

      <q-card class="my-card q-pa-md">
        <div class="row q-col-gutter-xs">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-weight-medium q-mb-xs text-capitalize"
                    >Penduduk</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.PENDUDUK"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-weight-medium q-mb-xs text-capitalize"
                    >Laki - Laki</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.PRIA"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-weight-medium q-mb-xs text-capitalize"
                    >Perempuan</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.WANITA"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10 q-mt-md"
        >
          Table data penduduk
        </q-item-label>
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data penduduk yang tersebar di area Kabupaten Pesawaran
        </q-item-label>

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
                {{ props.row.NAMA_LENGKAP }}
                <q-tooltip>{{ props.row.NAMA_LENGKAP }}</q-tooltip>
              </q-td>
              <q-td key="KECAMATAN" :props="props" class="text-uppercase">
                {{ props.row.AREA.KECAMATAN.nama }}
                <q-tooltip>{{ props.row.AREA.KECAMATAN.nama }}</q-tooltip>
              </q-td>
              <q-td key="DESA" :props="props" class="text-uppercase">
                {{ props.row.AREA.DESA.nama }}
              </q-td>
              <q-td key="JENIS_KELAMIN" :props="props" class="text-uppercase">
                {{ props.row.JENIS_KELAMIN }}
              </q-td>
              <q-td key="ACTION" :props="props">
                <div class="justify-center q-gutter-x-xs">
                  <q-btn
                    dense
                    icon="visibility"
                    flat
                    size="sm"
                    color="indigo-10"
                    @click="this.confirm(props.row)"
                  >
                    <q-tooltip>DETAIL</q-tooltip>
                  </q-btn>
                </div>
              </q-td>
            </q-tr>
          </template>
          <!-- <template v-slot:pagination="scope">
            <q-btn
              v-if="scope.pagesNumber > 2"
              icon="first_page"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isFirstPage"
              @click="scope.firstPage"
            />

            <q-btn
              icon="chevron_left"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isFirstPage"
              @click="scope.prevPage"
            />

            <q-btn
              icon="chevron_right"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.nextPage"
            />

            <q-btn
              v-if="scope.pagesNumber > 2"
              icon="last_page"
              color="grey-8"
              round
              dense
              flat
              :disable="scope.isLastPage"
              @click="scope.lastPage"
            />
          </template> -->
        </q-table>
      </q-card>

      <div class="row q-gutter-sm">
        <q-card class="col my-card q-pa-md q-mt-md">
          <q-item-label
            style="font-size: 16px"
            class="text-weight-medium text-indigo-10 q-mt-md"
          >
            Table data NIK penduduk tidak valid
          </q-item-label>
          <q-item-label
            style="font-size: 12px"
            class="text-caption text-grey-6 q-mb-md"
            >Seluruh data penduduk yang tersebar di area Kabupaten Pesawaran tidak valid
          </q-item-label>
  
          <q-table
            :rows="rowsNikFailed"
            :columns="columnsNikFailed"
            :loading="loadingNikFailed"
            @request="onRequestNikFailed"
            v-model:pagination="paginationNikFailed"
            flat
            binary-state-sort
            row-key="name"
            no-data-label="Belum ada data yang terdaftar"
          >
            <template v-slot:top>
              <q-space />

              <q-btn size="sm" color="blue-10">
                <download-excel
                  class="btn btn-default"
                  :data="json_data"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  :name="filename"
                >
                  Download Excel
                </download-excel>
              </q-btn>
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
                  <q-badge color="positive" >{{ props.row.NOMOR_KK }}</q-badge>
                </q-td>
                <q-td key="NIK" :props="props">
                  <q-badge color="primary">{{ props.row.NIK }}</q-badge>
                  <q-badge color="primary" class="q-ml-sm">{{ props.row.NIK.length }}</q-badge>
                </q-td>
                <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                  {{ props.row.NAMA_LENGKAP }}
                  <q-tooltip>{{ props.row.NAMA_LENGKAP }}</q-tooltip>
                </q-td>
                <q-td key="ACTION" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn
                      dense
                      icon="visibility"
                      flat
                      size="sm"
                      color="indigo-10"
                      @click="this.confirm(props.row)"
                    >
                      <q-tooltip>DETAIL</q-tooltip>
                    </q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>

        <q-card class="col my-card q-pa-md q-mt-md">
          <q-item-label
            style="font-size: 16px"
            class="text-weight-medium text-indigo-10 q-mt-md"
          >
            Table data KK penduduk tidak valid
          </q-item-label>
          <q-item-label
            style="font-size: 12px"
            class="text-caption text-grey-6 q-mb-md"
            >Seluruh data penduduk yang tersebar di area Kabupaten Pesawaran tidak valid
          </q-item-label>
  
          <q-table
            :rows="rowsKKFailed"
            :columns="columnsKKFailed"
            :loading="loadingKKFailed"
            @request="onRequestKKFailed"
            v-model:pagination="paginationKKFailed"
            flat
            binary-state-sort
            row-key="name"
            no-data-label="Belum ada data yang terdaftar"
          >
            <template v-slot:top>
              <q-space />

              <q-btn size="sm" color="blue-10">
                <download-excel
                  class="btn btn-default"
                  :data="json_data_kk"
                  :fields="json_fields_kk"
                  worksheet="My Worksheet"
                  :name="filename_kk"
                >
                  Download Excel
                </download-excel>
              </q-btn>
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
                  <q-badge color="positive" >{{ props.row.NOMOR_KK }}</q-badge>
                  <q-badge color="positive" class="q-ml-sm">{{ props.row.NOMOR_KK.length }}</q-badge>
                </q-td>
                <q-td key="NIK" :props="props">
                  <q-badge color="primary">{{ props.row.NIK }}</q-badge>
                </q-td>
                <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                  {{ props.row.NAMA_LENGKAP }}
                  <q-tooltip>{{ props.row.NAMA_LENGKAP }}</q-tooltip>
                </q-td>
                <q-td key="ACTION" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn
                      dense
                      icon="visibility"
                      flat
                      size="sm"
                      color="indigo-10"
                      @click="this.confirm(props.row)"
                    >
                      <q-tooltip>DETAIL</q-tooltip>
                    </q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </div>

      <q-dialog v-model="confirmDialog" position="bottom">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section class="bg-blue-10 text-white">
            <div class="text-h6">DETAIL DATA PENDUDUK</div>
            <div class="text-subtitle2">
              NOMOR KARTU KELUARGA
              <q-badge
                color="white"
                class="q-ml-sm q-pl-md q-pr-md text-indigo-14 text-subtitle2"
                >{{ this.KK }}</q-badge
              >
            </div>
          </q-card-section>
          <q-card-section>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey-6"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
            >
              <q-tab name="penduduk" label="PENDUDUK" />
              <q-tab name="keluarga" label="KELUARGA" />
              <q-tab name="informasi" label="INFORMASI PRIBADI" />
              <q-tab name="lokasi" label="LOKASI RUMAH" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="penduduk">
                <div class="row q-pa-sm">
                  <q-item-section class="col-3">
                    <q-item-label caption>Nama Lengkap</q-item-label>
                    <q-item-label class="text-weight-bold">{{
                      this.NAMA
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section class="col-3">
                    <q-item-label caption>NIK</q-item-label>
                    <q-item-label class="text-weight-bold">{{
                      this.NIK
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section class="col-3">
                    <q-item-label caption>Usia</q-item-label>
                    <q-item-label class="text-weight-bold"
                      >{{ this.USIA }} Tahun</q-item-label
                    >
                  </q-item-section>
                </div>

                <q-card class="q-pa-sm bg-grey-3 q-mt-md" flat>
                  <div class="row q-col-gutter-sm">
                    <q-item-section>
                      <q-item-label caption>Kecamatan</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.KECAMATAN
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Dusun</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.DUSUN
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Desa</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.DESA
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>RT</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.RT
                      }}</q-item-label>
                    </q-item-section>
                  </div>

                  <div class="row q-col-gutter-sm q-mt-md">
                    <q-item-section>
                      <q-item-label caption>Jenis Kelamin</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.JENIS_KELAMIN
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Tanggal Lahir</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        $parseDate(this.TANGGAL_LAHIR).fullDate
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Hubungan Keluarga</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.HUBUNGAN_KEPALA_KELUARGA
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Status Pernikahan</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.STATUS_PERNIKAHAN
                      }}</q-item-label>
                    </q-item-section>
                  </div>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="keluarga" class="col">
                <div v-for="(d, i) in dataKeluarga" :key="i">
                  <div class="row q-pa-sm">
                    <q-item-section class="col-3">
                      <q-item-label caption>Nama Lengkap</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        d.NAMA_LENGKAP
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section class="col-3">
                      <q-item-label caption>NIK</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        d.NIK
                      }}</q-item-label>
                    </q-item-section>
                  </div>

                  <q-card class="q-pa-sm bg-grey-3 q-mt-md q-mb-md" flat>
                    <div class="row q-col-gutter-sm">
                      <q-item-section>
                        <q-item-label caption>Jenis Kelamin</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.JENIS_KELAMIN
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Tanggal Lahir</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          $parseDate(d.TANGGAL_LAHIR).fullDate
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Hubungan Keluarga</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.HUBUNGAN_KEPALA_KELUARGA
                        }}</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Status Pernikahan</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.STATUS_PERNIKAHAN
                        }}</q-item-label>
                      </q-item-section>
                    </div>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="informasi" class="col">
                <div class="row q-pa-sm">
                  <q-item-section class="col-3">
                    <q-item-label caption>Pengguna HP</q-item-label>
                    <q-item-label
                      class="text-weight-bold"
                      v-if="this.HP === 'Ya'"
                    >
                      <q-badge color="primary" class="text-subtitle2"
                        ><q-icon
                          name="verified"
                          color="white"
                          class="q-mr-sm"
                        />
                        Menggunakan</q-badge
                      >
                    </q-item-label>
                    <q-item-label class="text-weight-bold" v-else>
                      <q-badge color="negative" class="text-subtitle2"
                        ><q-icon
                          name="highlight_off"
                          color="white"
                          class="q-mr-sm"
                        />
                        Tidak</q-badge
                      >
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-3">
                    <q-item-label caption>Memiliki E-KTP</q-item-label>
                    <q-item-label
                      class="text-weight-bold"
                      v-if="this.EKTP === 'Ya'"
                    >
                      <q-badge color="primary" class="text-subtitle2"
                        ><q-icon
                          name="verified"
                          color="white"
                          class="q-mr-sm"
                        />
                        Memiliki</q-badge
                      >
                    </q-item-label>
                    <q-item-label class="text-weight-bold" v-else>
                      <q-badge color="negative" class="text-subtitle2"
                        ><q-icon
                          name="highlight_off"
                          color="white"
                          class="q-mr-sm"
                        />
                        Tidak</q-badge
                      >
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-3">
                    <q-item-label caption>Memiliki AKTE</q-item-label>
                    <q-item-label
                      class="text-weight-bold"
                      v-if="this.AKTE === 'Ya'"
                    >
                      <q-badge color="primary" class="text-subtitle2"
                        ><q-icon
                          name="verified"
                          color="white"
                          class="q-mr-sm"
                        />
                        Memiliki</q-badge
                      >
                    </q-item-label>
                    <q-item-label class="text-weight-bold" v-else>
                      <q-badge color="negative" class="text-subtitle2"
                        ><q-icon
                          name="highlight_off"
                          color="white"
                          class="q-mr-sm"
                        />
                        Tidak</q-badge
                      >
                    </q-item-label>
                  </q-item-section>
                </div>

                <div class="row q-pa-sm">
                  <q-item-section class="col-3">
                    <q-item-label caption>Mendapatkan Bantuan</q-item-label>
                    <q-item-label class="text-weight-bold">
                      <q-badge
                        color="primary"
                        class="text-subtitle2"
                        clickable
                        ><q-icon
                          name="handshake"
                          color="white"
                          class="q-mr-sm"
                        />
                        <div class="text-capitalize" v-if="this.BANTUAN === null">
                          Tidak
                        </div>
                        <div v-else class="text-capitalize">
                          <div v-if="this.BANTUAN.length > 0" @click="cetak = true">Memiliki</div>
                        </div>

                        <q-menu
                          transition-show="jump-down"
                          transition-hide="jump-up"
                          :offset="[0, 10]"
                          class="q-mt-md"
                        >
                          <q-list style="min-width: 100%; width: 400px">
                            <q-item>
                              <q-item-section>
                                <q-item-label caption
                                  >Bantuan yang diterima</q-item-label
                                >
                                <div class="row">
                                  <q-item-section
                                    v-for="(d, i) in this.BANTUAN"
                                    :key="i"
                                  >
                                    <q-badge
                                      color="primary"
                                      class="text-subtitle2 q-mt-sm"
                                      clickable
                                      >{{ d }}</q-badge
                                    >
                                  </q-item-section>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-badge>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-3">
                    <q-item-label caption>Menderita Penyakit</q-item-label>
                    <q-item-label class="text-weight-bold">
                      <q-badge color="primary" class="text-subtitle2"
                        ><q-icon
                          name="coronavirus"
                          color="white"
                          class="q-mr-sm"
                        />
                        <div class="text-capitalize" v-if="this.PENYAKIT === null">
                          Tidak
                        </div>
                        <div v-else class="text-capitalize">
                          <div v-if="this.PENYAKIT.length > 0" @click="cetak = true">Memiliki</div>
                        </div>

                        <q-menu
                          transition-show="jump-down"
                          transition-hide="jump-up"
                          :offset="[0, 10]"
                          class="q-mt-md"
                        >
                          <q-list style="min-width: 100%; width: 400px">
                            <q-item>
                              <q-item-section>
                                <q-item-label caption
                                  >Penyakit yang diderita</q-item-label
                                >
                                <div class="row">
                                  <q-item-section
                                    v-for="(d, i) in this.PENYAKIT"
                                    :key="i"
                                  >
                                    <q-badge
                                      color="primary"
                                      class="text-subtitle2 q-mt-sm"
                                      clickable
                                      >{{ d }}</q-badge
                                    >
                                  </q-item-section>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-badge>
                    </q-item-label>
                  </q-item-section>
                </div>

                <q-card class="q-pa-sm bg-grey-3 q-mt-md" flat>
                  <div class="row q-col-gutter-sm">
                    <q-item-section>
                      <q-item-label caption>Penghasilan</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.PENGHASILAN
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Sumber Penerangan</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.SUMBER_PENERANGAN
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Sumber Air Minum</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.SUMBER_AIR_MINUM
                      }}</q-item-label>
                    </q-item-section>
                  </div>

                  <div class="row q-col-gutter-sm q-mt-md">
                    <q-item-section>
                      <q-item-label caption>Bahan Bakar Masak</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.BAHAN_BAKAR_MASAK
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label caption>Fasilitas BAB</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.FASILITAS_BAB
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section> </q-item-section>
                  </div>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="lokasi" class="col">
                <q-card class="my-card" flat bordered>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="scatter_plot" color="grey-9" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-weight-bold"
                        >Geospatial data penduduk</q-item-label
                      >
                      <q-item-label caption>
                        Data sebaran penduduk Kabupaten Pesawaran.
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- <q-card class="my-card" flat bordered>
                    <MyMap style="height: 250px; width: 100%" />
                  </q-card> -->
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-dialog>

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

      <!-- <div class="row q-col-gutter-sm">
        <div class="col-md-8 col-xs-12">
          <ChartsBarUsia
            v-if="!loading"
            :label="bantuan"
            :jumlahBantuan="jumlahBantuan"
          />
        </div>
        <div class="col-md-4 col-xs-12">
          <ChartsDonatJenisKel
            v-if="!loadingLaki"
            :label="laki"
            :jumlahLaki="jumlahLaki"
            :colorLaki="colorLaki"
          />
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script>
// import ChartsBarUsia from "./../../components/MyCharts/ChartBarUsia.vue";
// import ChartsDonatJenisKel from "../../components/MyCharts/ChartdDonatJenisKel.vue";
import CountUp from "vue-countup-v3";
import JsonExcel from "vue-json-excel3";

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
    // ChartsBarUsia,
    // ChartsDonatJenisKel,
    CountUp,
    downloadExcel:JsonExcel
  },
  data() {
    return {
      filename: null,
      filename_kk: null,
      confirmDialog: false,
      tab: "penduduk",
      bantuan: [],
      jumlahBantuan: [],
      laki: [],
      jumlahLaki: [],
      colorLaki: [],
      chartBarUsia: [],
      chartDonatJenisKel: [],
      loadingLaki: true,
      keluarga: [],
      dataKeluarga: [],
      PENDUDUK: 0,
      PRIA: 0,
      WANITA: 0,
      datagender: [],
      BANTUAN: null,
      PENYAKIT: null,
      columnsNikFailed: [
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
        { name: "ACTION", align: "center", label: "", field: "ACTION" },
      ],
      columnsKKFailed: [
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
        { name: "ACTION", align: "center", label: "", field: "ACTION" },
      ],
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
          name: "KECAMATAN",
          align: "left",
          label: "KECAMATAN",
          field: "KECAMATAN",
        },
        { name: "DESA", align: "left", label: "DESA", field: "DESA" },
        {
          name: "JENIS_KELAMIN",
          align: "left",
          label: "JENIS KELAMIN",
          field: "JENIS_KELAMIN",
        },
        { name: "ACTION", align: "center", label: "", field: "ACTION" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5,
      },
      paginationNikFailed: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5,
      },
      paginationDNikFailed: {
        page: 1,
        rowsPerPage: 4000,
        rowsNumber: 4000,
      },
      paginationDKKFailed: {
        page: 1,
        rowsPerPage: 4000,
        rowsNumber: 4000,
      },
      paginationKKFailed: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5,
      },
      filter: null,
      rows: [],
      rowsNikFailed: [],
      rowsKKFailed: [],
      visibles: false,
      datatahun: [],
      datacategory: [],
      dataFaileded: [],
      json_fields: {
        "TAHUN": "TAHUN",
        "NOMOR_KK": "NOMOR_KK",
        "NIK": "NIK",
        "NAMA_LENGKAP": "NAMA_LENGKAP",
        "KECAMATAN": "AREA.KECAMATAN.nama",
        "DESA": "AREA.DESA.nama",
        "DUSUN": "AREA.DUSUN.nama",
        "RT": "AREA.RT",
        "AKTE": "AKTE",
        "EKTP": "EKTP",
        "HP": "HP",
        "TANGGAL_LAHIR": "TANGGAL_LAHIR",
        "JENIS_KELAMIN": "JENIS_KELAMIN",
        "HUBUNGAN_KEPALA_KELUARGA": "HUBUNGAN_KEPALA_KELUARGA",
        "PENGHASILAN": "PENGHASILAN",
        "KATEGORY_PENGHASILAN": "KATEGORY_PENGHASILAN",
        "STATUS_PERNIKAHAN": "STATUS_PERNIKAHAN",
        "SUMBER_AIR_MINUM": "SUMBER_AIR_MINUM",
        "SUMBER_PENERANGAN": "SUMBER_PENERANGAN",
        "BAHAN_BAKAR_MASAK": "BAHAN_BAKAR_MASAK",
        "FASILITAS_BAB": "FASILITAS_BAB",
      },
      json_data: [],
      json_fields_kk: {
        "TAHUN": "TAHUN",
        "NOMOR_KK": "NOMOR_KK",
        "NIK": "NIK",
        "NAMA_LENGKAP": "NAMA_LENGKAP",
        "KECAMATAN": "AREA.KECAMATAN.nama",
        "DESA": "AREA.DESA.nama",
        "DUSUN": "AREA.DUSUN.nama",
        "RT": "AREA.RT",
        "AKTE": "AKTE",
        "EKTP": "EKTP",
        "HP": "HP",
        "TANGGAL_LAHIR": "TANGGAL_LAHIR",
        "JENIS_KELAMIN": "JENIS_KELAMIN",
        "HUBUNGAN_KEPALA_KELUARGA": "HUBUNGAN_KEPALA_KELUARGA",
        "PENGHASILAN": "PENGHASILAN",
        "KATEGORY_PENGHASILAN": "KATEGORY_PENGHASILAN",
        "STATUS_PERNIKAHAN": "STATUS_PERNIKAHAN",
        "SUMBER_AIR_MINUM": "SUMBER_AIR_MINUM",
        "SUMBER_PENERANGAN": "SUMBER_PENERANGAN",
        "BAHAN_BAKAR_MASAK": "BAHAN_BAKAR_MASAK",
        "FASILITAS_BAB": "FASILITAS_BAB",
      },
      json_data_kk: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  mounted() {
    this.getCountPenduduk();
    // this.renderChartUsia();
  },
  created() {
    this.getData();
    this.getDataNikFailed();
    this.getDataKKFailed();
    this.filename = "data_penduduk_nik_" + this.generateRandomId(5) + ".xls";
    this.filename_kk = "data_penduduk_kk_" + this.generateRandomId(5) + ".xls";
  },
  methods: {
    generateRandomId(length) {
      const randomStr = Math.random().toString(36).substr(2, length);
      return randomStr;
    },
    async getData() {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter,
      });
    },
    async getDataNikFailed() {
      this.onRequestNikFailed({
        pagination: this.paginationNikFailed,
      });
      this.downloadNikFailed({
        pagination: this.paginationDNikFailed,
      });
      this.downloadKKFailed({
        pagination: this.paginationDKKFailed,
      });
    },
    async getDataKKFailed() {
      this.onRequestKKFailed({
        pagination: this.paginationKKFailed,
      });
    },
    // async renderChartUsia() {
    //   await this.$axios
    //     .get(`penduduk/getCountPendudukByYear`)
    //     .then((res) => {
    //       if (!this.$parseResponse(res.data)) {
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // },
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
    onRequestNikFailed(propsx) {
      this.loadingNikFailed = true;
      this.$axios
        .get(
          `penduduk/findNikInvalid`,
          this.$createPaginate(propsx)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rowsNikFailed = response.data.data;
            this.paginationNikFailed.rowsPerPage = Number(response.data.resPerPage);
            this.paginationNikFailed.page = Number(response.data.page);
            this.paginationNikFailed.rowsNumber = Number(response.data.countData); 
            this.loadingNikFailed = false;
          }
        })
        .catch((err) => console.log(err));
    },
    downloadNikFailed(propsx) {
      this.loadingNikFailed = true;
      this.$axios
        .get(
          `penduduk/findNikInvalid`,
          this.$createPaginate(propsx)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.json_data = response.data.data;
            this.paginationDNikFailed.rowsPerPage = Number(response.data.resPerPage);
            this.paginationDNikFailed.page = Number(response.data.page);
            this.paginationDNikFailed.rowsNumber = Number(response.data.countData); 
            this.loadingNikFailed = false;
          }
        })
        .catch((err) => console.log(err));
    },
    onRequestKKFailed(propsx) {
      this.loadingKKFailed = true;
      this.$axios
        .get(
          `penduduk/findKKInvalid`,
          this.$createPaginate(propsx)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.rowsKKFailed = response.data.data;
            this.paginationKKFailed.rowsPerPage = Number(response.data.resPerPage);
            this.paginationKKFailed.page = Number(response.data.page);
            this.paginationKKFailed.rowsNumber = Number(response.data.countData); 
            this.loadingKKFailed = false;
          }
        })
        .catch((err) => console.log(err));
    },
    downloadKKFailed(propsx) {
      this.loadingNikFailed = true;
      this.$axios
        .get(
          `penduduk/findKKInvalid`,
          this.$createPaginate(propsx)
        )
        .finally(() => {
          this.$q.loading.hide();
        })
        .then((response) => {
          if (!this.$parseResponse(response.data)) {
            this.json_data_kk = response.data.data;
            this.paginationDKKFailed.rowsPerPage = Number(response.data.resPerPage);
            this.paginationDKKFailed.page = Number(response.data.page);
            this.paginationDKKFailed.rowsNumber = Number(response.data.countData); 
            this.loadingNikFailed = false;
          }
        })
        .catch((err) => console.log(err));
    },
    getCountPenduduk() {
      this.$axios
        .get("penduduk/getCountPenduduk")
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            var pria = 0;
            var wanita = 0;
            var label = [];
            var count = [];
            var color = [];

            data.map(function (datas) {
              if (datas._id.toLowerCase() === "laki-laki") {
                pria = datas.myCount;
                label.push(datas._id);
                count.push(datas.myCount);
                color.push("#70e000");
              } else if (datas._id.toLowerCase() === "perempuan") {
                wanita = datas.myCount;
                label.push(datas._id);
                count.push(datas.myCount);
                color.push("#ef233c");
              }
            });
            
            this.laki = label;
            this.jumlahLaki = count;
            this.colorLaki = color;
            this.PRIA = pria;
            this.WANITA = wanita;
            const x = pria + wanita;
            this.PENDUDUK = x;

          }
          this.loadingLaki = false;
        })
        .catch((err) => console.log(err));
    },
    confirm(data) {
      this.confirmDialog = true;
      const yearnow = new Date().getFullYear();
      const date = this.$parseDate(data.TANGGAL_LAHIR).years;
      this.USIA = yearnow - date;
      this.KK = data.NOMOR_KK;
      this.NAMA = data.NAMA_LENGKAP;
      this.NIK = data.NIK;
      this.KECAMATAN = data.AREA.KECAMATAN.nama;
      this.DESA = data.AREA.DESA.nama;
      this.DUSUN = data.AREA.DUSUN.nama;
      this.RT = data.AREA.RT;
      this.JENIS_KELAMIN = data.JENIS_KELAMIN;
      this.TANGGAL_LAHIR = data.TANGGAL_LAHIR;
      this.HUBUNGAN_KEPALA_KELUARGA = data.HUBUNGAN_KEPALA_KELUARGA;
      this.STATUS_PERNIKAHAN = data.STATUS_PERNIKAHAN;

      this.HP = data.HP;
      this.EKTP = data.EKTP;
      this.AKTE = data.AKTE;
      this.PENGHASILAN = data.PENGHASILAN;
      this.SUMBER_PENERANGAN = data.SUMBER_PENERANGAN;
      this.SUMBER_AIR_MINUM = data.SUMBER_AIR_MINUM;
      this.BAHAN_BAKAR_MASAK = data.BAHAN_BAKAR_MASAK;
      this.FASILITAS_BAB = data.FASILITAS_BAB;

      this.$axios.get(`penduduk/getById/${this.KK}`).then((res) => {
        this.dataKeluarga = res.data.data;
      });
      this.$axios.get(`penyakit/getById/${this.NIK}`).then((res) => {
        this.dataPenyakit = res.data.data;
        console.log(this.dataPenyakit)
        this.PENYAKIT = this.dataPenyakit[0].PENYAKIT;
      });
      this.$axios.get(`bantuan/getById/${this.NIK}`).then((res) => {
        this.dataBantuan = res.data.data;
        this.BANTUAN = this.dataBantuan[0].BANTUAN;
      });
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
