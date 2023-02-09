<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <div class="col">
        <p class="search-label q-mb-none">Search Breeds</p>
        <q-select
          ref="selectDropdown"
          filled
          v-model="breed"
          label=""
          use-input
          behavior="menu"
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          style="width: 250px; padding-bottom: 20px"
          v-bind="$attrs"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits } from 'vue'
import { fetchDogBreeds } from 'src/services/DogService';
import { useStore } from 'vuex';

const store = useStore();

const emit = defineEmits(['getDogs']);

const breed = ref<string>('');
const allBreeds = ref<string[]>([]);
const selectDropdown = ref<HTMLDivElement>();

watch(breed, (val) => {
  if (val !== '' && val !== breedName.value) {
    selectDropdown.value?.blur();
    store.dispatch('dogs/setBreedName', val);
    store.dispatch('dogs/clearDogList');
    emit('getDogs', val);
  }
});


const breedName = computed(() => store.getters['dogs/getBreedName']);
if (breedName.value) {
  breed.value = breedName.value;
  const firstTime = computed(() => store.getters['dogs/getFirstTime']);
  if (firstTime.value) {
    emit('getDogs', breed.value);
    store.dispatch('dogs/changeFirstTime');
  }
}


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
};



const dogBreeds = computed(() => store.getters['dogs/getDogBreeds']);

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

const options = ref(dogBreeds.value);


const filterFn = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase();
    options.value = dogBreeds.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
};

</script>
<style lang="scss" scoped>
.search-label {
  font-size: 18px;
}
</style>
