const API_URL = 'https://api.adviceslip.com/advice';

const adviceID = document.querySelector('#advice-id');
const advice = document.querySelector('#advice');
const btn = document.querySelector('#btn');

// Async function to fetch data from the Advice Slip API
const getAdvice = async(resource) => {

   try {
      const response = await fetch(resource);

      // Check if the response is not OK (status code is not equal 200)
      if(!response.ok) {
         throw new Error('Could not fetch data');
      }

      // Parse the response as JSON
      const data = await response.json();

      // Return the advice object
      return data['slip'];

   } catch (err) { 
      
      console.log('Error:', err);

   }
}

// When the dice button is clicked, show a new advice (Event Listener)
btn.addEventListener('click', async(e) => {

   // Prevents the default behaviour of the button
   e.preventDefault();

   try {

      // Fetch advice from the API using the getAdvice function
      const data = await getAdvice(API_URL);

      if(data) {

         // Update DOM with fetched data
         adviceID.innerHTML = data.id;
         advice.innerHTML = data.advice;

      }

   } catch(err) {

      console.log('Error fetching advice:', err);

   }

});