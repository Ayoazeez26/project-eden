<template>
  <q-page class="row items-start justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <q-select class="q-mt-lg col-4" outlined dense v-model="breed" :options="allBreeds" label="Select Breed" />
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref, computed, watch } from 'vue';
import { fetchDogBreeds, getByBreed } from 'src/services/DogService';
import { useStore } from 'vuex';
import { store } from 'quasar/wrappers';

const store = useStore();

const breed = ref<string>('');
const allBreeds = ref<string[]>([]);

watch(breed, (val) => {
  if (val !== '') {
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
  console.log(store.getters['dogs/getDogBreeds']);
};



const dogBreeds = computed(() => store.getters['dogs/getDogBreeds']);
console.log(dogBreeds);
if (dogBreeds.value.length === 0) {
  console.log('dogbreeds', dogBreeds.value.length);
  fetchDogBreeds()
    .then((res) => {
      console.log(res);
      getAllDogBreeds(res.message);
    })
    .catch((err) => {
      console.log(err);
    })
}

const getDogsByBreed = (breedName: string) => {
  getByBreed(breedName.toLowerCase())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
};

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
