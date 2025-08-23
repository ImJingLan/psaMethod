<template>
  <v-footer>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <span v-html="$t('copyright')"></span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>

<style scoped></style>
