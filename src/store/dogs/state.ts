export interface DogStateInterface {
  dogBreeds: string[];
  dogList: string[];
  breedName: string;
  dogImage: string;
  firstTime: boolean;
}

function state(): DogStateInterface {
  return {
    dogBreeds: [],
    dogList: [],
    breedName: 'Affenpinscher',
    dogImage: '',
    firstTime: true
  }
}

export default state;
