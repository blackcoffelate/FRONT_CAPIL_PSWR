<template>
  <q-page class="q-pa-md">
    <div class="col">
      <q-item-label
        style="font-size: 16px"
        class="text-weight-medium text-indigo-10"
        >Main Dashboard</q-item-label
      >
      <q-item-label
        style="font-size: 12px"
        class="text-caption text-grey-6 q-mb-md"
        >Halaman utama data analitik Kabupaten Pesawaran.</q-item-label
      >
    </div>
    <div class="row q-gutter-md">
      <div class="col">
        <q-card class="q-pa-md">
          <q-item-label
            style="font-size: 13px"
            class="text-weight-medium text-indigo-10"
            >Penduduk Kabupaten Pesawaran</q-item-label
          >
          <q-item-label
            style="font-size: 11px"
            class="text-caption text-grey-6 q-mb-md"
            >Jumlah penduduk Kabupaten Pesawaran berdasarkan jenis
            kelamin.</q-item-label
          >
          <div class="row q-gutter-sm">
            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Penduduk</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.PENDUDUK"
                  ></count-up>
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-white"
                >
                  <q-item-section>
                    <q-avatar
                      rounded
                      size="3em"
                      color="green"
                      text-color="white"
                      icon="diversity_3"
                    />
                  </q-item-section>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-blue-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Laki - Laki</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.PRIA"
                  ></count-up>
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-white"
                >
                  <q-item-section>
                    <q-avatar
                      rounded
                      size="3em"
                      color="blue"
                      text-color="white"
                      icon="male"
                    />
                  </q-item-section>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-purple-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Perempuan</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.WANITA"
                  ></count-up>
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-white"
                >
                  <q-item-section>
                    <q-avatar
                      rounded
                      size="3em"
                      color="purple"
                      text-color="white"
                      icon="female"
                    />
                  </q-item-section>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-card>

        <q-card class="q-pa-md q-mt-md">
          <q-item-label
            style="font-size: 13px"
            class="text-weight-medium text-indigo-10"
            >Data Geospatial</q-item-label
          >
          <q-item-label
            style="font-size: 11px"
            class="text-caption text-grey-6 q-mb-md"
            >Sebaran data penduduk dalam bentuk peta digital.</q-item-label
          >
          <div class="row q-gutter-sm">
            <l-map
              :zoom="map.zoom"
              :center="map.center"
              :max-zoom="map.maxZoom"
              :min-zoom="map.minZoom"
              style="height: 238px; width: 100%"
            >
              <l-tile-layer
                :url="map.tileLayer"
                :attribution="map.attribution"
              />
              <l-marker lat-lng="[-5.3936128, 105.2639232">
                <l-popup>
                  <q-card
                    class="my-card"
                    flat
                    style="margin: -14px -25px -14px -25px"
                  >
                    <q-card-section horizontal>
                      <q-card-section class="q-pt-md">
                        <div class="text-caption">
                          <q-badge color="positive" class="text-uppercase"
                            >a</q-badge
                          ><q-badge color="positive" class="text-uppercase"
                            >a</q-badge
                          >
                        </div>
                        <div class="text-subtitle1 q-mt-sm q-mb-xs">a</div>
                        <div class="text-caption text-grey">a</div>
                      </q-card-section>

                      <q-card-section class="col-5 flex flex-center">
                        <q-img
                          class="rounded-borders clickable-image"
                          @click="openFullscreen"
                          src="images/banner/sample_kegiatan_1.jpg"
                        />
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                      <q-item-label
                        ><q-badge color="blue-10" class="q-mr-sm text-uppercase"
                          >a</q-badge
                        >a</q-item-label
                      >
                    </q-card-actions>
                  </q-card>
                </l-popup>
                <l-icon
                  :icon-size="[48, 48]"
                  :icon-anchor="[16, 32]"
                  :popup-anchor="[0, -32]"
                  icon-url="images/icons/location-pin.png"
                />
              </l-marker>
            </l-map>
          </div>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="q-pa-md">
          <q-item-label
            style="font-size: 13px"
            class="text-weight-medium text-indigo-10"
            >Data Kependudukan</q-item-label
          >
          <q-item-label
            style="font-size: 11px"
            class="text-caption text-grey-6 q-mb-md"
            >Penduduk yang memiliki EKTP dan AKTE kelahiran.</q-item-label
          >
          <div class="row q-gutter-sm">
            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Memiliki EKTP</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MEMILIKI_EKTP"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-blue-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Tidak Memiliki EKTP</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.TIDAK_MEMILIKI_EKTP"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Memiliki AKTE</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MEMILIKI_AKTE"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-blue-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Tidak Memiliki AKTE</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.TIDAK_MEMILIKI_AKTE"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-card>

        <q-card class="q-pa-md q-mt-md">
          <q-item-label
            style="font-size: 13px"
            class="text-weight-medium text-indigo-10"
            >Angka Status Kemiskinan</q-item-label
          >
          <q-item-label
            style="font-size: 11px"
            class="text-caption text-grey-6 q-mb-md"
            >Sebaran kemiskinan berdasarkan tingkat penghasilan penduduk
            Kabupaten Pesawaran.</q-item-label
          >
          <div class="row q-gutter-sm">
            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Kebawah</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.KEBAWAH"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Menengah Kebawah</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MENENGAH_KEBAWAH"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="row q-gutter-sm q-mt-xs">
            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Menengah Keatas</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.MENENGAH_KEATAS"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>

            <q-card class="my-card bg-green-2 col" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    caption
                    class="text-indigo-10 text-weight-medium q-mb-xs text-capitalize"
                    >Keatas</q-item-label
                  >
                  <count-up
                    class="text-h6 text-weight-bold text-indigo-10 counter-animation"
                    :end-val="this.KEATAS"
                  ></count-up>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row q-gutter-md q-mt-xs">
      <q-card class="q-pa-md col">
        <q-item-label
          style="font-size: 13px"
          class="text-weight-medium text-indigo-10"
          >Data Penderita Penyakit</q-item-label
        >
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Sebaran data penderita penyakit Kabupaten Pesawaran.</q-item-label
        >
        <div id="chart" class="col">
          <ChartsBarPenyakit
            v-if="!loading"
            :label="arrayPenyakit"
            :arrayJumlah="arrayJumlah"
          />
        </div>
      </q-card>

      <q-card class="q-pa-md q-mt-md col">
        <q-item-label
          style="font-size: 13px"
          class="text-weight-medium text-indigo-10"
          >Data Bantuan</q-item-label
        >
        <q-item-label
          style="font-size: 11px"
          class="text-caption text-grey-6 q-mb-md"
          >Sebaran data bantuan yang diterima penduduk Kabupaten
          Pesawaran.</q-item-label
        >
        <div id="chart" class="col">
          <ChartsBarBantuan
            v-if="!loadingBantuan"
            :label="bantuan"
            :jumlahBantuan="jumlahBantuan"
          />
        </div>
      </q-card>
    </div>
    <!-- <div class="col">
      <div class="q-pa-md">
        <q-item-label style="font-size: 16px" class="text-weight-medium text-indigo-10">
          Main Dashboard
        </q-item-label>
        <q-item-label style="font-size: 12px" class="text-caption text-grey-6">Halaman data statistik KABUPATEN PESAWARAN.
        </q-item-label>
      </div>

      <div class="row q-gutter-md items-start q-pa-md">
        <q-card class="col-md-2" flat bordered>
          <q-item>
            <q-item-section>
              <q-item-label style="font-size: 13px" class="text-weight-medium text-indigo-10">Data Penduduk</q-item-label>
              <q-item-label style="font-size: 11px" class="text-grey-6">Total data penduduk</q-item-label>
            </q-item-section>
          </q-item>
          <div class="col q-ma-sm">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs text-capitalize">Penduduk</q-item-label>
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10 counter-animation">{{ this.countPenduduk
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side style="font-size: 12px" class="text-weight-bold text-grey-5">
                  <q-icon name="diversity_3" size="3em" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col q-ma-sm">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs text-capitalize">Laki - Laki</q-item-label>
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10 counter-animation">{{ this.countPria
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side style="font-size: 12px" class="text-weight-bold text-grey-5">
                  <q-icon name="male" size="3em" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col q-ma-sm">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs text-capitalize">Perempuan</q-item-label>
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10 counter-animation">{{ this.countWanita
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side style="font-size: 12px" class="text-weight-bold text-grey-5">
                  <q-icon name="female" size="3em" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-card>
        <q-card class="col-md-9" flat bordered>
          <q-item>
            <q-item-section>
              <q-item-label style="font-size: 13px" class="text-weight-medium text-indigo-10">Data Spatial</q-item-label>
              <q-item-label style="font-size: 12px" class="text-caption text-grey-6">Data sebaran penduduk dalam visual
                peta digital
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-card class="my-card" flat bordered>
            <MyMap style="height: 300px; width: 100%" />
          </q-card>
        </q-card>
        <q-card class="col-md-3" flat bordered>
          <ChartsDonatJenisKel v-if="!loadingLaki" :label="laki" :jumlahLaki="jumlahLaki" :colorLaki="colorLaki" />
        </q-card>
        <q-card class="col-md-8" flat bordered>
          <ChartsBarPenyakit v-if="!loading" :label="arrayPenyakit" :arrayJumlah="arrayJumlah" />
        </q-card>
        <q-card class="col-md-5" flat bordered>
          <ChartsBarBantuan v-if="!loadingBantuan" :label="bantuan" :jumlahBantuan="jumlahBantuan" />
        </q-card>
        <q-card class="col-md-3" flat bordered>
          <ChartsBarKtp v-if="!loadingKtp" :label="ktp" :jumlahKtp="jumlahKtp" />
        </q-card>
        <q-card class="col-md-3" flat bordered>
          <ChartsBarAkte v-if="!loadingAkte" :label="akte" :jumlahAkte="jumlahAkte" :colorAkte="colorAkte" />
        </q-card>
      </div> -->

    <!-- <q-card class="my-card q-pa-md">
        <div class="row q-gutter-sm">
          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Total Masyarakat</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-positive"
                >
                  +23
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Pria</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-positive"
                >
                  +23
                </q-item-section>
              </q-item>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card bg-grey-3" flat>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label caption class="text-weight-medium q-mb-xs"
                    >Wanita</q-item-label
                  >
                  <q-item-label class="text-h6 text-weight-bold text-indigo-10"
                    >1,000</q-item-label
                  >
                </q-item-section>
                <q-item-section
                  side
                  style="font-size: 12px"
                  class="text-weight-bold text-positive"
                >
                  +23
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <q-item-label
          style="font-size: 16px"
          class="text-weight-medium text-indigo-10 q-mt-md"
          >Table data masyarakat</q-item-label
        >
        <q-item-label
          style="font-size: 12px"
          class="text-caption text-grey-6 q-mb-md"
          >Seluruh data masyarakat yang tersebar di area Kabupaten
          Pesawaran</q-item-label
        >

        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
          :filter="filter"
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
                {{ props.row.KECAMATAN }}
                <q-tooltip>{{ props.row.KECAMATAN }}</q-tooltip>
              </q-td>
              <q-td key="DESA" :props="props" class="text-uppercase">
                {{ props.row.DESA }}
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
        </q-table>
      </q-card> -->

    <!-- <q-dialog v-model="confirmDialog" position="bottom">
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
                  <div class="row">
                    <q-item class="col-1">
                      <q-item-section>
                        <q-img
                          src="images/icons/family.png"
                          style="width: 30px"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Nama Lengkap</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.NAMA_LENGKAP
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>NIK</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.NIK
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator />
                  <div class="row">
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Jenis Kelamin</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.JENIS_KELAMIN
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Tgl Lahir</q-item-label>
                        <q-item-label caption class="text-weight-bold">
                          {{ $parseDate(d.TANGGAL_LAHIR).fullDate }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Hubungan</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.HUBUNGAN_KEPALA_KELUARGA
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Kecamatan</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.KECAMATAN
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator />
                </div>
              </q-tab-panel>

              <q-tab-panel name="informasi" class="col">
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pengguna HP</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.hp_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pemilik E-KTP</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.ektp_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pimilik Akte</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.akte_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Jenis Bantuan</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip>
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="handshake" />
                          </q-avatar>
                          {{ this.bantuan_penduduk }}
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Penyakit</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="coronavirus" />
                          </q-avatar>
                          {{ this.penyakit_penduduk }}
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Penghasilan</q-item-label>
                      <q-item-label caption class="text-weight-bold"
                        >{{ this.penghasilan }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Sumber Penerangan</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.sumber_penerangan }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Sumber Air Minum</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.sumber_air_minum
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Bahan Bakar Masak</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.bahan_bakar_masak
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Fasilitas BAB</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.fasilitas_bab }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                </div>
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
                  <q-card class="my-card" flat bordered>
                    <MyMap style="height: 350px; width: 100%" />
                  </q-card>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-dialog> -->
    <!-- </div> -->
    <!-- <div class="q-pa-md">
      <q-card class="my-card">
        <q-item>
          <q-item-section avatar>
            <lottie style="width: 70px" :options="defaultOptions" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">Dashboard</q-item-label>
            <q-item-label caption
              >Halaman statistik data penduduk Kabupaten Pesawaran</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card>

      <div class="row items-center q-col-gutter-sm q-mt-sm">
        <div class="col-md-4 col-xs-12">
          <q-card class="bg-indigo-14 flex flex-center text-indigo-10">
            <q-card-section>
              <q-avatar rounded size="40px">
                <img src="images/icons/authenticity.png" />
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <q-item-label class="text-white text-weight-bold">
                {{ penduduk }}
                <vue3-autocounter
                  ref="counter"
                  :startAmount="0"
                  :endAmount="Number(penduduk)"
                  :duration="1"
                  separator="."
                  :autoinit="true"
                />
              </q-item-label>
              <q-item-label caption class="text-white"
                >Total Penduduk Pesawaran</q-item-label
              >
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-xs-12">
          <q-card class="bg-indigo-14 flex flex-center text-indigo-10">
            <q-card-section>
              <q-avatar rounded size="40px">
                <img src="images/icons/male.png" />
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <q-item-label class="text-white text-weight-bold">
                {{ penduduk_pria }}
                <vue3-autocounter
                  ref="counter"
                  :startAmount="0"
                  :endAmount="Number(penduduk_pria)"
                  :duration="1"
                  separator="."
                  :autoinit="true"
                />
              </q-item-label>
              <q-item-label caption class="text-white"
                >Total Penduduk Pria</q-item-label
              >
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-4 col-xs-12">
          <q-card class="bg-indigo-14 flex flex-center text-indigo-10">
            <q-card-section>
              <q-avatar rounded size="40px">
                <img src="images/icons/female.png" />
              </q-avatar>
            </q-card-section>
            <q-card-section>
              <q-item-label class="text-white text-weight-bold">
                {{ penduduk_wanita }}
                <vue3-autocounter
                  ref="counter"
                  :startAmount="0"
                  :endAmount="Number(penduduk_wanita)"
                  :duration="1"
                  separator="."
                  :autoinit="true"
                />
              </q-item-label>
              <q-item-label caption class="text-white"
                >Total Penduduk Wanita</q-item-label
              >
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card class="my-card q-mt-md">
        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
          :filter="filter"
        >
          <template v-slot:top>
            <div class="col">
              <q-item-section>
                <q-item-label class="text-weight-bold">Dashboard</q-item-label>
                <q-item-label caption
                  >Halaman statistik data penduduk Kabupaten
                  Pesawaran</q-item-label
                >
              </q-item-section>
            </div>

            <q-space />

            <q-btn
              flat
              color="indigo-10"
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
                  debounce="300"
                  placeholder="Pencarian"
                  style="width: 300px"
                  color="indigo-10"
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
                class="text-indigo-10"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="NOMOR_KK" :props="props">
                {{ props.row.NOMOR_KK }}
              </q-td>
              <q-td key="NIK" :props="props">
                {{ props.row.NIK }}
              </q-td>
              <q-td key="NAMA_LENGKAP" :props="props" class="text-uppercase">
                {{ props.row.NAMA_LENGKAP.substring(0, 20).concat("...") }}
                {{ props.row.NAMA_LENGKAP }}
                <q-tooltip>{{ props.row.NAMA_LENGKAP }}</q-tooltip>
              </q-td>
              <q-td key="KECAMATAN" :props="props" class="text-uppercase">
                {{ props.row.KECAMATAN }}
                <q-tooltip>{{ props.row.KECAMATAN }}</q-tooltip>
              </q-td>
              <q-td key="DESA" :props="props" class="text-uppercase">
                {{ props.row.DESA }}
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
        </q-table>
      </q-card>

      <q-dialog v-model="confirmDialog" position="bottom">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section class="bg-indigo-14 text-white">
            <div class="text-h6">DETAIL DATA PENDUDUK</div>
            <div class="text-subtitle2">
              NOMOR KARTU KELUARGA
              <q-badge
                color="white"
                class="q-ml-sm q-pl-md q-pr-md text-indigo-14 text-subtitle2"
                >{{ this.kk_penduduk }}</q-badge
              >
            </div>
          </q-card-section>
          <q-card-section>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
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
              <q-tab-panel name="penduduk" class="col">
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Nama Lengkap</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.namaLengkap_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>NIK</q-item-label>
                      <q-item-label class="text-weight-bold">{{
                        this.NIK_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Kecamatan</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.kecamatan_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Desa</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.desa_penduduk }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Dusun</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.dusun_penduduk }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>RT</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.rt_penduduk }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Jenis Kelamin</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.jenis_kelamin_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Tgl Lahir</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ $parseDate(this.tgl_lahir_penduduk).fullDate }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Hubungan Keluarga</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.hubungan_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Status Pernikahan</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.status_pernikahan_penduduk
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-tab-panel>

              <q-tab-panel name="keluarga" class="col">
                <div v-for="(d, i) in dataKeluarga" :key="i">
                  <div class="row">
                    <q-item class="col-1">
                      <q-item-section>
                        <q-img
                          src="images/icons/family.png"
                          style="width: 30px"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Nama Lengkap</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.NAMA_LENGKAP
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>NIK</q-item-label>
                        <q-item-label class="text-weight-bold">{{
                          d.NIK
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator />
                  <div class="row">
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Jenis Kelamin</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.JENIS_KELAMIN
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Tgl Lahir</q-item-label>
                        <q-item-label caption class="text-weight-bold">
                          {{ $parseDate(d.TANGGAL_LAHIR).fullDate }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Hubungan</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.HUBUNGAN_KEPALA_KELUARGA
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item class="col">
                      <q-item-section>
                        <q-item-label caption>Kecamatan</q-item-label>
                        <q-item-label caption class="text-weight-bold">{{
                          d.KECAMATAN
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator />
                </div>
              </q-tab-panel>

              <q-tab-panel name="informasi" class="col">
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pengguna HP</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.hp_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pemilik E-KTP</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.ektp_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Pimilik Akte</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip v-if="this.akte_penduduk === 'Ya'">
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="verified" />
                          </q-avatar>
                          YA
                        </q-chip>
                        <q-chip v-else>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="do_disturb" />
                          </q-avatar>
                          TIDAK
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Jenis Bantuan</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip>
                          <q-avatar>
                            <q-icon size="xs" color="blue" name="handshake" />
                          </q-avatar>
                          {{ this.bantuan_penduduk }}
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Penyakit</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        <q-chip>
                          <q-avatar>
                            <q-icon size="xs" color="red" name="coronavirus" />
                          </q-avatar>
                          {{ this.penyakit_penduduk }}
                        </q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                  <q-item class="col"> </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Penghasilan</q-item-label>
                      <q-item-label caption class="text-weight-bold"
                        >{{ this.penghasilan }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Sumber Penerangan</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.sumber_penerangan }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Sumber Air Minum</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.sumber_air_minum
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Bahan Bakar Masak</q-item-label>
                      <q-item-label caption class="text-weight-bold">{{
                        this.bahan_bakar_masak
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator />
                <div class="row">
                  <q-item class="col">
                    <q-item-section>
                      <q-item-label caption>Fasilitas BAB</q-item-label>
                      <q-item-label caption class="text-weight-bold">
                        {{ this.fasilitas_bab }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item class="col"> </q-item>
                </div>
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
                  <q-card class="my-card" flat bordered>
                    <MyMap style="height: 350px; width: 100%" />
                  </q-card>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </q-dialog>

      <div class="row items-center q-col-gutter-md q-mt-xs">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <ChartsDoughnat
            v-if="!loading"
            :label="penyakit"
            :jumlah="jumlah"
            :color="color"
          ></ChartsDoughnat>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <ChartsBantuan
            v-if="!loading"
            :label="bantuan"
            :jumlahBantuan="jumlahBantuan"
            :color="color"
          ></ChartsBantuan>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <ChartsAkte
            v-if="!loading"
            :label="akte"
            :jumlahAkte="jumlahAkte"
            :color="color"
          ></ChartsAkte>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <ChartsEktp
            v-if="!loading"
            :label="ktp"
            :jumlahKtp="jumlahKtp"
            :color="color"
          ></ChartsEktp>
        </div>
        <div class="col-md-8 col-xs-12">
          <ChartsLine v-if="!loading"></ChartsLine>
        </div>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import CountUp from "vue-countup-v3";

import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LPopup
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import ChartsBarPenyakit from "./../../components/MyCharts/ChartBarPenyakit.vue";
import ChartsBarBantuan from "./../../components/MyCharts/ChartBarBantuan.vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "IndexPage",
  components: {
    ChartsBarBantuan,
    ChartsBarPenyakit,
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LPopup,
    CountUp
  },
  data() {
    return {
      confirmDialog: false,
      tab: "penduduk",
      loadingLaki: true,
      laki: [],
      jumlahLaki: [],
      colorLaki: [],
      loading: true,
      loadingBantuan: true,
      bantuan: [],
      jumlahBantuan: [],
      arrayPenyakit: [],
      arrayJumlah: [],
      ktp: [],
      jumlahKtp: [],
      colorAkte: [],
      akte: [],
      jumlahAkte: [],
      loadingAkte: true,
      loadingKtp: true,
      loadingPenghasilan: true,
      MEMILIKI_AKTE: 0,
      TIDAK_MEMILIKI_AKTE: 0,
      MEMILIKI_EKTP: 0,
      TIDAK_MEMILIKI_EKTP: 0,
      KEBAWAH: 0,
      MENENGAH_KEBAWAH: 0,
      MENENGAH_KEATAS: 0,
      KEATAS: 0,
      PENDUDUK: 0,
      PRIA: 0,
      WANITA: 0,
      columns: [
        {
          name: "NOMOR_KK",
          label: "NOMOR KK",
          align: "left",
          field: "NOMOR_KK"
        },
        { name: "NIK", align: "left", label: "NIK", field: "NIK" },
        {
          name: "NAMA_LENGKAP",
          align: "left",
          label: "NAMA LENGKAP",
          field: "NAMA_LENGKAP"
        },
        {
          name: "KECAMATAN",
          align: "left",
          label: "KECAMATAN",
          field: "KECAMATAN"
        },
        { name: "DESA", align: "left", label: "DESA", field: "DESA" },
        {
          name: "JENIS_KELAMIN",
          align: "left",
          label: "JENIS KELAMIN",
          field: "JENIS_KELAMIN"
        },
        { name: "ACTION", align: "center", label: "", field: "ACTION" }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5
      },
      ilter: null,
      rows: [],
      visibles: false,
      countPenduduk: 0,
      countPria: 0,
      countWanita: 0,
      countMemeilikiAkte: 0,
      countTidakMemilikiAkte: 0,
      countMemilikiEktp: 0,
      countTidakMemilikiEktp: 0,
      countKebawah: 0,
      countMenengahKebawah: 0,
      countMenengahKeatas: 0,
      countKeatas: 0,
      duration: 2000,
      interval: null,
      map: {
        loaded: false,
        tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: 'contributors <a href="">PSTI UBL</a>',
        zoom: 12,
        minZoom: 7,
        maxZoom: 18,
        icons: "images/icons/location-pin.png",
        center: [-5.3936128, 105.2639232],
        markerLatLng: [-5.3936128, 105.2639232]
      },
      maps: [],
      zoom: 2,
      km: 0
    };
  },
  mounted() {
    this.getCountPenduduk();
    this.getCountKtp();
    this.getCountAkte();
    this.renderChartPenyakit();
    this.getCountBantuan();
    this.getCountPenghasilan();
  },
  created() {},
  methods: {
    async getCountPenghasilan() {
      await this.$axios
        .get(`penduduk/getCountPenghasilan`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;

            var kebawah = 0;
            var menengahKebawah = 0;
            var menengahKeatas = 0;
            var keatas = 0;

            data.map(function (datas) {
              if (datas._id != null) {
                if (datas._id.toLowerCase() === "menengah kebawah") {
                  kebawah = datas.count;
                } else if (datas._id.toLowerCase() === "kebawah") {
                  menengahKebawah = datas.count;
                } else if (datas._id.toLowerCase() === "menengah keatas") {
                  menengahKeatas = datas.count;
                } else if (datas._id.toLowerCase() === "keatas") {
                  keatas = datas.count;
                }
              }
            });

            this.KEBAWAH = kebawah;
            this.MENENGAH_KEBAWAH = menengahKebawah;
            this.MENENGAH_KEATAS = menengahKeatas;
            this.KEATAS = keatas;
          }
          this.loadingPenghasilan = false;
        })
        .catch((err) => console.log(err));
    },
    async getCountAkte() {
      await this.$axios
        .get(`penduduk/getCount_akteKtp/akte`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            var memilikiAkte = 0;
            var tidakmemilikiAkte = 0;
            var label = [];
            var count = [];
            var color = [];

            data.map(function (datas) {
              if (datas._id != null) {
                if (datas._id.toLowerCase() === "ya") {
                  memilikiAkte = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                  color.push("#70e000");
                } else if (datas._id.toLowerCase() === "tidak") {
                  tidakmemilikiAkte = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                  color.push("#ef233c");
                }
              }
            });

            this.akte = label;
            this.jumlahAkte = count;
            this.colorAkte = color;

            this.MEMILIKI_AKTE = memilikiAkte;
            this.TIDAK_MEMILIKI_AKTE = tidakmemilikiAkte;
          }
          this.loadingAkte = false;
        })
        .catch((err) => console.log(err));
    },
    async getCountKtp() {
      await this.$axios
        .get(`penduduk/getCount_akteKtp/ektp`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            var memilikiEktp = 0;
            var tidakmemilikiEktp = 0;
            var label = [];
            var count = [];

            data.map(function (datas) {
              if (datas._id != null) {
                if (datas._id.toLowerCase() === "ya") {
                  memilikiEktp = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                } else if (datas._id.toLowerCase() === "tidak") {
                  tidakmemilikiEktp = datas.count;
                  label.push(datas._id);
                  count.push(datas.count);
                }
              }
            });

            this.ktp = label;
            this.jumlahKtp = count;
            this.MEMILIKI_EKTP = memilikiEktp;
            this.TIDAK_MEMILIKI_EKTP = tidakmemilikiEktp;
          }
          this.loadingKtp = false;
        })
        .catch((err) => console.log(err));
    },
    async renderChartPenyakit() {
      await this.$axios
        .get(`penyakit/getCountPenyakit`)
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            res.data.data.forEach((datax) => {
              this.arrayPenyakit.push(datax._id);
              this.arrayJumlah.push(datax.count);
            });
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
            res.data.data.forEach((datax) => {
              this.bantuan.push(datax._id);
              this.jumlahBantuan.push(datax.count);
            });
            this.loadingBantuan = false;
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

            this.loadingLaki = false;
          }
        })
        .catch((err) => console.log(err));
    }
  }
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
