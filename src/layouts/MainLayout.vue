<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-blue-10" v-if="$q.platform.is.desktop">
      <q-toolbar class="q-pt-sm">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-space />

        <div class="row q-gutter-md">
          <q-btn flat size="md" icon="account_circle" label="Administrator">
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <q-item clickable v-ripple>
                  <q-item-section side>
                    <q-avatar rounded size="48px" icon="account_circle" class="text-white" color="indigo-10" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Administrator</q-item-label>
                    <q-item-label caption>be admin</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ this.timenow }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Setting</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable @click="logout()">
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer v-else>
      <q-toolbar class="q-py-sm flex-center q-gutter-lg">
        <q-btn flat dense round :to="{ name: 'penduduk' }" size="lg" icon="diversity_3" class="column">
          <q-item-label style="font-size: 12px" class="text-caption text-white">Penduduk</q-item-label>
        </q-btn>
        <q-btn dense round color="white text-positive" :to="{ name: 'superadmin' }" size="xl" icon="space_dashboard" />
        <q-btn flat dense round :to="{ name: 'kesehatan' }" size="lg" icon="monitor_heart" class="column" />
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-card class="my-card q-ma-sm flex text-indigo-10 text-subtitle2" style="
          height: 130px;
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.5)
            ),
            url('images/banner/bg_header.jpg');
          background-repeat: no-repeat;
          background-size: cover;
        ">
        <q-item>
          <q-item-section avatar>
            <img src="images/icons/pswr.png" style="width: 35px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-white">PESAWARAN</q-item-label>
            <q-badge color="white" class="q-mt-xs" style="width: 100px">
              <q-item-label caption class="text-blue-10">Administrator</q-item-label>
            </q-badge>
          </q-item-section>
        </q-item>
      </q-card>

      <q-card class="my-card q-mx-sm q-mt-md" style="height: auto">
        <q-list>
          <q-item-label class="navigation-item text-grey-7 text-weight-medium" header>Main Menu</q-item-label>

          <q-item active-class="tab-active" exact class="navigation-item text-grey-6 text-weight-medium" clickable
            :to="{ name: 'superadmin' }" v-ripple>
            <q-item-section avatar>
              <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="space_dashboard" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-expansion-item class="navigation-item text-grey-6 text-weight-medium">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="diversity_3" />
              </q-item-section>

              <q-item-section> Penduduk </q-item-section>
            </template>

            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" clickable
              :to="{ name: 'penduduk' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Penduduk </q-item-section>
            </q-item>
            <q-separator />
            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" clickable
              :to="{ name: 'capil' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Pemilik EKTP dan AKTE </q-item-section>
            </q-item>

            <q-separator />
            <q-item class="navigation-item text-blue-10 text-weight-light bg-grey-3" clickable
              :to="{ name: 'tambah_penduduk' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tambah Penduduk </q-item-section>
            </q-item>
          </q-expansion-item>

          <!-- <q-expansion-item class="navigation-item text-grey-6 text-weight-medium">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="diversity_3" />
              </q-item-section>

              <q-item-section> Kesehatan </q-item-section>
            </template>

            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" clickable
              :to="{ name: 'kesehatan' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Kesehatan </q-item-section>
            </q-item>
            <q-separator /> -->
            <!-- <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" clickable
              :to="{ name: 'ptm' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> PTM </q-item-section>
            </q-item> -->
          <!-- </q-expansion-item> -->

          <q-item active-class="tab-active" exact class="navigation-item text-grey-6 text-weight-medium" clickable
            :to="{ name: 'kesehatan' }" v-ripple>
            <q-item-section avatar>
              <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="monitor_heart" />
            </q-item-section>
            <q-item-section> Kesehatan </q-item-section>
          </q-item>

          <q-item active-class="tab-active" exact class="navigation-item text-grey-6 text-weight-medium" clickable
            :to="{ name: 'sosial' }" v-ripple>
            <q-item-section avatar>
              <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="handshake" />
            </q-item-section>
            <q-item-section> Sosial </q-item-section>
          </q-item>

          <q-item-label class="navigation-item text-grey-7 text-weight-medium" header>Extras</q-item-label>

          <q-expansion-item class="navigation-item text-grey-6 text-weight-medium">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="dns" />
              </q-item-section>

              <q-item-section> Master Data </q-item-section>
            </template>

            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              :to="{ name: 'kecamatan' }" clickable v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Kecamatan </q-item-section>
            </q-item>
            <q-separator />
            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              clickable :to="{ name: 'desa' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Desa </q-item-section>
            </q-item>
            <q-separator />
            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              clickable :to="{ name: 'dusun' }" v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Data Dusun </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item class="navigation-item text-grey-6 text-weight-medium">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="dns" />
              </q-item-section>

              <q-item-section> Import Export </q-item-section>
            </template>
            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              :to="{ name: 'export' }" clickable v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Export Data Penduduk </q-item-section>
            </q-item>
            <q-separator />
            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              :to="{ name: 'import' }" clickable v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Import Data Penduduk </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item class="navigation-item text-grey-6 text-weight-medium">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar rounded size="30px" color="blue-10" text-color="white" icon="settings" />
              </q-item-section>

              <q-item-section> Pengaturan </q-item-section>
            </template>

            <q-item active-class="tab-active" class="navigation-item text-blue-10 text-weight-light bg-grey-3" exact
              :to="{ name: 'tambahPengguna' }" clickable v-ripple>
              <q-item-section avatar> </q-item-section>
              <q-item-section> Tambah Pengguna </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-card>

      <q-card class="my-card q-ma-sm q-mt-md flex text-indigo-10 text-subtitle2" style="
          height: 70px;
          background-repeat: no-repeat;
          background-size: cover;
        ">
        <q-item>
          <q-item-section avatar>
            <img src="images/icons/icons_pswr.png" style="width: 30px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>PESAWARAN</q-item-label>
            <q-item-label caption class="text-indigo-10">© Copyright 2023</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      timenow: null,
    };
  },
  created() {
    const yearnow = new Date();
    const date = this.$parseDate(yearnow).fullDate;
    this.timenow = date;
  },
  methods: {
    logout() {
      this.$q
        .dialog({
          title: "Informasi",
          message: "Apakah Anda Yakin ingin keluar dari aplikasi ini ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.localStorage.clear();
          this.$router.push({ name: "auth" });
        });
    },
  },
};
</script>
