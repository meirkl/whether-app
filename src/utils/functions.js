export const dayNumberToString = day => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
};

export const toggleSavedFavoriteCity = city => {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  if (favorites) {
    const i = favorites.findIndex(
      x => JSON.stringify(x) === JSON.stringify(city)
    );
    if (i !== -1) {
      favorites.splice(i, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, city]));
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([city]));
  }
};

export const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
