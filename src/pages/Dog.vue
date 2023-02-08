<template>
  <q-page class="row items-start justify-evenly">
    <div class="col">
      <div class="row">
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { fetchDogBreeds, getByBreed } from 'src/services/DogService';
import { useStore } from 'vuex';
import { store } from 'quasar/wrappers';

const store = useStore();

const breed = ref<string>('');
const allBreeds = ref<string[]>([]);

const dogList = computed(() => store.getters['dogs/getDogList']);

watch(breed, (val) => {
  if (val !== '') {
    store.dispatch('dogs/clearDogList');
    getDogsByBreed(val);
  }
});

function capitalizeFirstLetter(letter: string): string {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
}

const getAllDogBreeds = (breeds: object) => {
  for (const [key, value] of Object.entries(breeds)) {
    if (value.length === 0) {
      allBreeds.value.push(capitalizeFirstLetter(key));
    } else {
      value.forEach((item) => {
        allBreeds.value.push(`${capitalizeFirstLetter(item)} ${capitalizeFirstLetter(key)}`);
      });
    }
  };
  store.dispatch('dogs/setDogBreeds', allBreeds.value);
  // console.log(store.getters['dogs/getDogBreeds']);
};



const dogBreeds = computed(() => store.getters['dogs/getDogBreeds']);
// console.log(dogBreeds);
if (dogBreeds.value.length === 0) {
  // console.log('dogbreeds', dogBreeds.value.length);
  fetchDogBreeds()
    .then((res) => {
      // console.log(res);
      getAllDogBreeds(res.message);
    })
    .catch((err) => {
      console.log(err);
    })
}

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

getDogsByBreed('African');

// const todos = ref<Todo[]>([
//   {
//     id: 1,
//     content: 'ct1'
//   },
//   {
//     id: 2,
//     content: 'ct2'
//   },
//   {
//     id: 3,
//     content: 'ct3'
//   },
//   {
//     id: 4,
//     content: 'ct4'
//   },
//   {
//     id: 5,
//     content: 'ct5'
//   }
// ]);
// const meta = ref<Meta>({
//   totalCount: 1200
// });
</script>
<style>
.dog-image {
  border-radius: 20px;
}
</style>
