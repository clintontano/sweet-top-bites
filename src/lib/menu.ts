export interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
}

export const menuItems: MenuItem[] = [
  {
    name: "Chicken Burger",
    price: 55,
    image: "/6.png",
    description: "Juicy grilled chicken patty with fresh lettuce, tomato & our signature sauce",
  },
  {
    name: "Chicken Noodles",
    price: 45,
    image: "/3.png",
    description: "Stir-fried noodles tossed with seasoned chicken & fresh vegetables",
  },
  {
    name: "Fully Loaded Fries",
    price: 40,
    image: "/1.png",
    description: "Crispy fries loaded with melted cheese, bacon bits & spring onions",
  },
  {
    name: "Chicken Shawarma",
    price: 50,
    image: "/2.png",
    description: "Tender spiced chicken wrapped in warm pita with garlic sauce",
  },
  {
    name: "Hot Dog",
    price: 35,
    image: "/3.png",
    description: "Classic grilled hot dog with mustard, ketchup & caramelized onions",
  },
  {
    name: "Chicken Quesadillas",
    price: 60,
    image: "/4.png",
    description: "Crispy tortilla stuffed with chicken, peppers & melted cheese",
  },
];

export const branches = [
  {
    slug: "legon-shell",
    name: "Legon Shell",
    address: "Shell Filling Station, Legon",
    image: "/5.png",
    description: "Our flagship location near the University of Ghana campus",
  },
  {
    slug: "a-and-c",
    name: "A&C Corner",
    address: "A&C Shopping Mall, East Legon",
    image: "/4.png",
    description: "Conveniently located at the popular A&C Mall junction",
  },
  {
    slug: "adabraka",
    name: "Adabraka",
    address: "Adabraka, Near Roxy Cinema",
    image: "/3.png",
    description: "Serving bold flavours in the heart of Accra",
  },
];
