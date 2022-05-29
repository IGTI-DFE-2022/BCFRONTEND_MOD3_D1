<script lang="ts" setup>
import { onMounted, PropType, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Album } from "../model/album";
import { Photo } from "../model/photo";
import { GetAlbums, GetPhotos } from "../services/backend";

// defineProps({ albums: Array as PropType<Array<Album>> });
const router = useRouter();
const route = useRoute();

let photos = ref<Photo[]>([]);

console.log(router.currentRoute.value);

onMounted(async () => {
  photos.value = (await GetPhotos(+route.params.id)).data;
});

watch(
  () => route.params.id,
  async (newId) => {
    console.log(route.params);
    photos.value = (await GetPhotos(+newId)).data;
  }
);
</script>

<template>
  <div>
    <h2>List of Photos</h2>
    <div class="photos">
      <div class="photo" v-for="(p, i) in photos" :key="p.id">
        <img :src="p.thumbnailUrl" :alt="p.title" />
        <div>{{ i + 1 }} - {{ p.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photos {
  display: flex;
  flex-flow: row wrap;
}
.photo {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 10rem;
  margin-bottom: 1rem;
}
</style>