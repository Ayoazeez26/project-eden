<template>
  <q-page class="dog row items-start justify-evenly q-px-md q-px-md-xl">
    <div class="col q-mt-md">
      <q-btn flat :ripple="false" color="black" icon="mdi-arrow-left" label="Back" @click="$router.go(-1)" />
      <h1 class="dog-name q-my-md">{{ breedName }}</h1>
      <div class="row">
        <div class="col-12 col-md-8 col-lg-6">
          <img :src="dogImage" :alt="breedName" class="dog-image" />
        </div>
      </div>
      <p class="q-my-md dog-text">More images from {{ breedName }}</p>
      <div class="row q-mt-md">
        <div class="col-12">
          <div class="row">
            <div v-for="(image, index) in moreDogs" :key="index" class="col-6 col-md-3 col-lg-2 q-pa-sm">
              <dog-image
                :image="image"
                styleName="height: 200px; width: 100%"
                class="dog-image"
                @click="goToDog(image)"
              />
            </div>
            <template v-if="moreDogs.length === 0">
              <skeleton-loader :showCount="6" heightVal="250px" class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getRandomByBreed } from 'src/services/DogService';
import DogImage from 'src/components/DogImage.vue';
import SkeletonLoader from 'src/components/SkeletonLoader.vue';
import { useStore } from 'vuex';
import { store } from 'quasar/wrappers';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const moreDogs = ref<string[]>([]);

const get6RandomDogBreedImages = (breedName: string) => {
  let payload;
  const breedArr = breedName.split(' ');
  if (breedArr.length > 1) {
    payload = `${breedArr[1]}/${breedArr[0]}`;
  } else {
    payload = breedArr[0];
  }
  getRandomByBreed(payload.toLowerCase())
    .then((res) => {
      moreDogs.value = res.message;
    })
    .catch((err) => {
      console.log(err);
    })
};

const dogImage = computed(() => store.getters['dogs/getDogImage']);
const breedName = computed(() => store.getters['dogs/getBreedName']);
const firstTime = computed(() => store.getters['dogs/getFirstTime']);

watch(dogImage, (val) => {
  moreDogs.value = [];
  get6RandomDogBreedImages(breedName.value);
});

if (breedName.value && !firstTime.value) {
  moreDogs.value = [];
  get6RandomDogBreedImages(breedName.value);
} else {
  router.push('/');
}

const goToDog = (image: string) => {
  store.dispatch('dogs/setDogImage', image);
  router.push({ name: 'Dog' });
};

</script>
<style lang="scss" scoped>
.dog {
  max-width: 1536px;
  margin: 0 auto;
  &-name {
    font-size: 60px;
    line-height: initial;
    font-weight: 500;
    color: $primary;
  }
  &-image {
    border-radius: 20px;
    width: 100%;
    height: auto;
  }
  &-text {
    font-size: 24px;
    color: $secondary;
  }
}
</style>
