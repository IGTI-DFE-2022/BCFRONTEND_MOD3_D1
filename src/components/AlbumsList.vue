<script lang="ts" setup>
import { onMounted, PropType, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Album } from "../model/album";
import { GetAlbums } from "../services/backend";

// defineProps({ albums: Array as PropType<Array<Album>> });
const router = useRouter();
const route = useRoute();

let albums = ref<Album[]>([]);

console.log(router.currentRoute.value);

onMounted(async () => {
  albums.value = (await GetAlbums(+route.params.userId)).data;
});

watch(
  () => route.params.userId,
  async (newId) => {
    console.log(route.params);
    albums.value = (await GetAlbums(+newId)).data;
  }
);
</script>

<template>
  <div>
    <h2>List of Albums</h2>
    <div class="album" v-for="a in albums" :key="a.id">
      <router-link :to="'/users/1/albums/' + a.id"
        >{{ a.id }} - {{ a.title }}</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.album {
  cursor: pointer;
  padding: 1rem;
}
</style>