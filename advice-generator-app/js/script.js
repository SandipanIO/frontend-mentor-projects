const API_URL = 'https://api.adviceslip.com/advice';

const adviceID = document.querySelector('#advice-id');
const advice = document.querySelector('#advice');
const btn = document.querySelector('#btn');

const getAdvice = async(resource) => {
   const response = await fetch(resource);

   if(response.status !== 200) {
      throw new Error('Could not fetch data');
   }

   const data = await response.json();
   return data['slip'];
}

// Function to update data in DOM
const updateCard = data => {

   adviceID.innerHTML = data.id;
   advice.innerHTML = data.advice;
}

// When the page loads, show an advice
getAdvice(API_URL)
   .then(data => updateCard(data))
   .catch(err => console.log(err));

   
// When the dice button is clicked, show a new advice
btn.addEventListener('click', e => {
   
   e.preventDefault();

   getAdvice(API_URL)
      .then(data => updateCard(data))
      .catch(err => console.log(err));

});