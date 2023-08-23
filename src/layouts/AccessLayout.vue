<template>
  <q-layout
    view="lHh Lpr lFf"
    style="
      background: linear-gradient(
          200deg,
          rgba(178, 222, 39, 0.3),
          rgba(0, 0, 0, 0.3)
        ),
        url('images/banner/bg_auth.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    "
  >
    <q-header
      reveal
      class="text-positive q-pl-lg"
      style="background: rgba(0, 0, 0, 0)"
    >
      <q-toolbar>
        <div class="text-h5 text-weight-bolder text-white flex flex-center">
          PESAWARAN
        </div>
        <q-space />
        <div>
          <q-item align="right">
            <q-item-section>
              <q-item-label class="text-white"
                >Copyright © PSTI UBL</q-item-label
              >
              <q-item-label
                ><q-badge color="white" class="q-mt-xs">
                  <q-item-label caption class="text-indigo-10"
                    >V.0.1</q-item-label
                  >
                </q-badge></q-item-label
              >
            </q-item-section>
          </q-item>
        </div>
      </q-toolbar>
    </q-header>

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
      drawerRight: false,
    };
  },
};
</script>
