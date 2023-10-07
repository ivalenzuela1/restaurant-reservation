type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  locality: Locality;
  price: PRICE;
  slug: string;
  reviews: Review[];
};

type RestaurantType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
};
