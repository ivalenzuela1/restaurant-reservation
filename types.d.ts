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
  open_time: string;
  close_time: string;
};

type AuthInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
};

type State = {
  loading: boolean;
  error: string | null;
  data: User | null;
};
