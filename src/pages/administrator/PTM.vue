<template>
  <q-page class="row q-pa-md q-gutter-sm">
    <div class="col">
      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <!-- <q-btn-toggle v-model="model" spread no-caps toggle-color="purple" color="white" text-color="black" :options="[
            { label: 'Diagnosa', value: 'diagnosa' },
            { label: 'Faktor Risiko', value: 'faktor' },
            { label: 'Monev PTM', value: 'monev' }
          ]" /> -->
          <q-tabs v-model="tab" align="left" narrow-indicator inline-label dense indicator-color="transparent"
            class="q-mb-lg rounded-borders">
            <q-tab class="text-white bg-blue-10 q-mr-xs" name="mails"><q-btn class="btn-fixed-width" color="white" dense
                size="sm" flat label="Diagnosa" icon="account_circle" /></q-tab>
            <q-tab class="text-white bg-blue-10 q-ml-xs" name="alarms">
              <q-btn class="btn-fixed-width" color="white" dense size="sm" flat label="Faktor Risiko"
                icon="admin_panel_settings" /></q-tab>
            <q-tab class="text-white bg-blue-10 q-ml-xs" name="ss">
              <q-btn class="btn-fixed-width" color="white" dense size="sm" flat label="Monev PTM"
                icon="admin_panel_settings" /></q-tab>
          </q-tabs>

          <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade" class="text-caption">
            <q-tab-panel name="mails">
              <iframe style="height:100vh; width: 100%;"
                src="https://lookerstudio.google.com/embed/reporting/f76141f3-723e-4dc0-9ee9-ed788485a92b/page/eBrsC?params=%7B%22dto.kode_kabko%22:%221809%22,%22dto.kode_kabko2%22:%221809%22,%22dto.kode_kabko3%22:%221809%22%7D"
                frameborder="0"></iframe>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <iframe style="height:100vh; width: 100%;"
                src="https://lookerstudio.google.com/embed/reporting/9adcfcd8-0ee3-4c43-899d-815ca84cdf6e/page/eBrsC?params=%7B%22dto.kode_kabko%22:%221809%22,%22dto.kode_kabko2%22:%221809%22,%22dto.kode_kabko3%22:%221809%22%7D"
                frameborder="0"></iframe>
            </q-tab-panel>

            <q-tab-panel name="ss">
              <iframe style="height:100vh; width: 100%;"
                src="https://lookerstudio.google.com/embed/reporting/00ee98a0-c2de-4ace-af94-565519859655/page/Zd6vC?params=%7B%22dto.kode_kabko%22:%221809%22,%22dto.kode_kabko2%22:%221809%22,%22dto.kode_kabko3%22:%221809%22%7D"
                frameborder="0"></iframe>
            </q-tab-panel>
          </q-tab-panels>
          <!-- <q-btn-toggle v-model="secondModel" spread class="my-custom-toggle" no-caps rounded unelevated
            toggle-color="primary" color="white" text-color="primary" :options="[
              { label: 'Option 1', value: 'one' },
              { label: 'Option 1', value: 'one' },
              { label: 'Option 2', value: 'two' }
            ]" /> -->
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      tab: "mails",
      // model: null
      model: ref(null)
    }
  },
  // setup() {
  //   console.log(this.model)
  //   return {

  //   }

  // },

  created() {
    console.log(this.model)
  },

}
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

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
