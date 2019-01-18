<template>
  <v-app dark>
    <v-content>
      <v-container fluid>
        <v-alert :value="true" type="success">Hello world</v-alert>
        <v-btn color="success" @click="ping">ping</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { ipcRenderer, IpcMessageEvent } from 'electron'
import Vue from 'vue'

ipcRenderer.on('msg', (event: IpcMessageEvent, msg: string) => {
  alert(msg)
})

export default Vue.extend({
  data(): { msg: string } {
    return {
      msg: 'hello world',
    }
  },
  methods: {
    ping(): void {
      ipcRenderer.send('msg', 'ping')
    },
  },
})
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
