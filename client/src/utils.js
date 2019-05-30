export const isFavorite = (item, favorites) => {
  return favorites.find(i => i.id === item.id) ? true : false;
};
