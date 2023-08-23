<template>
  <q-page class="q-pa-md row justify-center flex-center" style="height: 100%">
    <div class="row fit">
      <div class="col-5"></div>
      <div class="col">
        <q-card class="q-pa-sm row">
          <q-card class="col-5 q-pa-sm bg-blue-10 text-white">
            <q-card-section class="row items-start">
              <img
                src="images/icons/pswr.png"
                class="q-mr-md"
                style="width: 20px"
              />
              <div class="text-subtitle2">PESAWARAN</div>
            </q-card-section>

            <q-card-section class="q-pt-xl">
              <div class="text-h6 text-weight-bold">
                Kemudahan pengambilan kebijakan berdasarkan data.
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption">
                Akses berbagai macam data yang tersedia untuk menentukan langkah
                terbaik.
              </div>
            </q-card-section>
            <q-card-section class="q-pt-md">
              <div
                class="text-caption rounded-borders q-pa-sm"
                style="background: rgba(0, 0, 0, 0.2)"
              >
                Layanan satu data Kabupaten <strong>PESAWARAN</strong> merupakan
                langkah strategis dalam pengembangan sistem kebijakan
                berlandaskan data yang bersifat real.
              </div>
            </q-card-section>
            <q-card-section class="q-pt-md">
              <div class="text-caption rounded-borders q-pa-sm">
                Untuk pengguna umum yang berpartisipasi dalam proses penginputan
                data, silhkan buka form dengan menekan tombol berikut.
              </div>
              <q-btn
                class="text-blue-10 q-mt-sm q-ml-sm bg-white"
                size="sm"
                type="submit"
                icon="emoji_people"
                label="Partisipan"
                :to="{ name: 'formDataPenduduk' }"
              />
            </q-card-section>
          </q-card>
          <q-card class="col q-pa-sm">
            <q-card-section>
              <div class="text-h6 text-weight-bold">Sign In</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption">
                Gunakan data yang sudah di dapatkan sebelumnya untuk dapat masuk
                ke dalam sistem <strong>PESAWARAN.</strong>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-sm">
              <q-tabs
                v-model="tab"
                align="left"
                narrow-indicator
                inline-label
                dense
                indicator-color="transparent"
                class="q-mb-lg rounded-borders"
              >
                <q-tab class="text-white bg-blue-10 q-mr-xs" name="mails"
                  ><q-btn
                    class="btn-fixed-width"
                    color="white"
                    dense
                    size="sm"
                    flat
                    label="OPD Pesawaran"
                    icon="account_circle"
                /></q-tab>
                <q-tab class="text-white bg-blue-10 q-ml-xs" name="alarms">
                  <q-btn
                    class="btn-fixed-width"
                    color="white"
                    dense
                    size="sm"
                    flat
                    label="Administrator"
                    icon="admin_panel_settings"
                /></q-tab>
              </q-tabs>

              <div class="q-gutter-sm">
                <q-card>
                  <q-tab-panels
                    v-model="tab"
                    animated
                    transition-prev="fade"
                    transition-next="fade"
                    class="text-caption"
                  >
                    <q-tab-panel name="mails">
                      <q-form @submit="onSubmitPengguna()">
                        <div class="q-gutter-sm">
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Email</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.email"
                            placeholder="ex. pesawaran@pesawaran.go.id"
                            type="email"
                            dense
                          />
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Password</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.password"
                            placeholder="Password"
                            :type="isPwd ? 'password' : 'text'"
                            dense
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              /> </template
                          ></q-input>
                          <q-btn
                            class="text-white q-mt-lg bg-blue-10 q-px-xl q-py-sm"
                            size="sm"
                            type="submit"
                            >Sign In</q-btn
                          >
                        </div>
                      </q-form>
                    </q-tab-panel>

                    <q-tab-panel name="alarms">
                      <q-form @submit="onSubmitAdmin()">
                        <div class="q-gutter-sm">
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Email</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.email"
                            placeholder="ex. pesawaran@pesawaran.go.id"
                            type="email"
                            dense
                          />
                          <q-item-label class="text-weight-bold text-grey-6"
                            >Password</q-item-label
                          >
                          <q-input
                            outlined
                            v-model="form.password"
                            placeholder="Password"
                            :type="isPwd ? 'password' : 'text'"
                            dense
                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                              /> </template
                          ></q-input>
                          <q-btn
                            class="text-white q-mt-lg bg-blue-10 q-px-xl q-py-sm"
                            size="sm"
                            type="submit"
                            >Sign In</q-btn
                          >
                        </div>
                      </q-form>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-sm">
              <div
                class="text-caption rounded-borders q-pa-sm"
                style="background: rgba(0, 0, 0, 0.2)"
              >
                <q-badge color="blue-10">
                  <q-icon name="campaign" color="white" />
                </q-badge>
                Silahkan hubungi developer layanan terhadap data yang digunakan
                untuk mengkases layanan jika terjadi kesalahan.
              </div>
            </q-card-section>
          </q-card>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      tab: "mails",
      visible: false,
      form: {
        email: null,
        password: null
      },
      isPwd: true,
      dense: false
    };
  },
  methods: {
    onReset() {
      this.form.email = null;
      this.form.password = null;
    },
    onSubmitAdmin() {
      this.$q.loading.show();
      this.$axios
        .post("users/login", {
          email: this.form.email,
          password: this.form.password
        })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            const data = res.data.data;
            const role = res.data.data.user.role;
            console.log(role);
            this.$q.localStorage.set("data", data);
            if (role === "0") {
              this.$router.push({ name: "superadmin" });
            } else {
              this.$q.localStorage.clear();
              this.$errorNotif("Mohon Maaf Halaman Belum Tersedia");
            }
          }
        })
        .catch((err) => this.$errorServer(err));
    }
  }
};
</script>
