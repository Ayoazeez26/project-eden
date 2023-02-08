<template>
  <q-page class="dog row items-start justify-evenly q-px-md q-px-md-xl">
    <div class="col">
      <q-btn flat :ripple="false" color="black" icon="mdi-arrow-left" label="Back" @click="$router.go(-1)" />
      <h1 class="dog-name">{{ breedName }}</h1>
      <!-- <div class="row">
        <q-select class="q-mt-lg col-4" outlined dense v-model="breed" :options="allBreeds" label="Select Breed" />
      </div>
      <div class="row q-mt-md">
        <div class="col-12">
          <div class="row">
            <div v-for="(image, index) in dogList" :key="index" class="dog-image col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
              <q-img
                :src="image"
                no-spinner
                style="height: 250px; width: 100%"
                class="dog-image"
              />
            </div>
            <template v-if="dogList.length === 0">
              <div v-for="(image, index) in 50" :key="index" class="dog-image col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
                <q-skeleton height="250px" width="100%" />
              </div>
            </template>
          </div>
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { fetchDogBreeds, getByBreed } from 'src/services/DogService';
import { useStore } from 'vuex';
import { store } from 'quasar/wrappers';

const store = useStore();


const dogImage = computed(() => store.getters['dogs/getDogImage']);
const breedName = computed(() => store.getters['dogs/getBreedName']);

</script>
<style lang="scss" scoped>
.dog {
  max-width: 1536px;
  margin: 0 auto;
  &-name {
    font-size: 40px;
  }
  &-image {
    border-radius: 20px;
  }
}
</style>
