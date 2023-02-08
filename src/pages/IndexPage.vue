<template>
  <q-page class="dog row items-start justify-evenly">
    <div class="col">
      <div class="row">
        <search-dogs @getDogs="getDogsByBreed" class="col-12 col-md-4" />
        <!-- <q-select class="q-mt-lg col-4" outlined dense v-model="breed" :options="allBreeds" label="Select Breed" /> -->
      </div>
      <p class="dog-breed text-center text-h5 q-mb-md">{{ breedName }}</p>
      <div class="row q-mt-md">
        <div class="col-12">
          <div class="row">
            <div v-for="(image, index) in dogList" :key="index" class="dog-image col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm">
              <dog-image
                :image="image"
                styleName="height: 250px; width: 100%"
                class="dog-image"
                @click="goToDog(image)"
              />
            </div>
            <template v-if="dogList.length === 0">
              <skeleton-loader :showCount="50" heightVal="250px" class="dog-image col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getByBreed } from 'src/services/DogService';
import SearchDogs from 'src/components/SearchDogs.vue';
import DogImage from 'src/components/DogImage.vue';
import SkeletonLoader from 'src/components/SkeletonLoader.vue';
import { useStore } from 'vuex';
import { store } from 'quasar/wrappers';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();


const dogList = computed(() => store.getters['dogs/getDogList']);
const breedName = computed(() => store.getters['dogs/getBreedName']);

const getDogsByBreed = (breedName: string) => {
  let payload;
  const breedArr = breedName.split(' ');
  if (breedArr.length > 1) {
    payload = `${breedArr[1]}/${breedArr[0]}`;
  } else {
    payload = breedArr[0];
  }
  getByBreed(payload.toLowerCase())
    .then((res) => {
      // console.log(res);
      store.dispatch('dogs/setDogList', res.message);
    })
    .catch((err) => {
      console.log(err);
    })
};

// getDogsByBreed('African');

const goToDog = (image: string) => {
  store.dispatch('dogs/setDogImage', image);
  router.push({ name: 'Dog' });
};
</script>
<style lang="scss">
.dog {
  max-width: 1536px;
  margin: 0 auto;
  &-breed {
    font-weight: 600;
  }
  &-image {
    border-radius: 20px;
    cursor: pointer;
  }
}
</style>
