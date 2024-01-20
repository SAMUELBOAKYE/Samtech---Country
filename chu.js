document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('button');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', searchCountry);
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchCountry();
      searchButton.classList.add('clicked');
    } else if(searchInput.value != '') {
      searchButton.classList.remove('clicked');
    } 
  });
});

function searchCountry() {
  const searchInputValue = document.getElementById('searchInput').value.trim();

  if (!searchInputValue) {
    displayErrorMessage('Please enter a country name');
    return;
  }


  
  fetch(`https://restcountries.com/v3.1/name/${searchInputValue}`)
    .then(response => {
      if (!response.ok) { 
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 404) {
        throw new Error('Country not found');
      } else {
        displayCountryDetails(data[0]);
      }
    })
    .catch(error => {
      displayErrorMessage(error.message);
    });

    searchInput.value = '';
}

function displayCountryDetails(country) {
  let countryDetailsDiv = document.getElementById('country-details');
  const currency = Object.values(country.currencies)[0].name;
  countryDetailsDiv.innerHTML = `
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p class="country__row"> Currency: ${currency}</p>
    <p>Language(s): ${Object.values(country.languages).join(', ')}</p>
    <img src="${country.flags.png}" alt="${country.name.common} flag">

  `;
}

function displayErrorMessage(message) {
  let countryDetailsDiv = document.getElementById('country-details');
  countryDetailsDiv.innerHTML = `<p>${message}</p>`;
}
