function scrollSmoothlyTo(query) {
  document.querySelector(query).scrollIntoView({ behavior: 'smooth' });
}

function scrollSmoothlyToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();

  const shops = await fetchShops();

  await renderShops(shops.slice(0, 7))
    .then(() => {
      console.log('Rendered shop list successfully!');
    })
    .catch((error) => {
      console.error(`Failed rendering shop list: ${error}`);
    });

  const favorites = await fetchFavorites(21545);

  await renderFavorites(favorites)
    .then(() => {
      console.log('Render favorites successfully!');
    })
    .catch((error) => {
      console.error(`Failed rendering favorites: ${error}`);
    });
});

async function fetchFavorites(studentId) {
  try {
    console.log(`Fetching student ${studentId} favorites...`);

    const response = await fetch(
      'http://localhost:4000/api/student/favorites',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      }
    );

    console.log('Fetch successful!');

    const result = await response.json();

    if (response.ok && result.success) {
      return result.data;
    } else {
      console.error(`Failed to fetch student ${studentId} favorites: ${error}`);
    }
  } catch (error) {
    console.error(`Error fetching student ${studentId} favorites: ${error}`);
  }
}

async function renderFavorites(favorites) {
  const container = document.getElementById('favorites-list');
  container.innerHTML = '';

  favorites.forEach((favorite) => {
    const favoriteWrapper = document.createElement('div');
    favoriteWrapper.classList.add('favorite-wrapper');

    favoriteWrapper.innerHTML = `
            <div class="favorite">
              <h1 class="favorite-name">${favorite.shop_name}</h1>
              <p class="favorite-desc">${favorite.description}</p>

              <div class="favorite-btn-wrapper">
                <button class="favorite-btn">View details & reserve</button>
              </div>
            </div>`;

    container.appendChild(favoriteWrapper);
  });
}

async function fetchShops() {
  try {
    console.log('Fetching shop list...');

    const response = await fetch('http://localhost:4000/api/shop/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetch successful!');

    const result = await response.json();

    if (response.ok && result.success) {
      return result.data;
    } else {
      console.error(`Failed to fetch shop list: ${result.message}`);
    }
  } catch (error) {
    console.error(`Error fetching shops: ${error}`);
  }
}

async function renderShops(shops) {
  const container = document.getElementById('popular-picks-list');
  container.innerHTML = '';

  shops.forEach((shop) => {
    const shopWrapper = document.createElement('div');
    shopWrapper.classList.add('popular-pick-wrapper');

    shopWrapper.innerHTML = `
            <div class="popular-pick">
              <h1 class="popular-pick-name">${shop.shop_name}</h1>
              <p class="popular-pick-desc">${shop.description}</p>

              <div class="popular-pick-btn-wrapper">
                <button class="popular-pick-btn">View details & reserve</button>
              </div>
            </div>
            `;

    container.appendChild(shopWrapper);
  });
}
