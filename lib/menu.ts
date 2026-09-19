/**
 * Карта Tairyo Kaiten Sushi Valencia — СГЕНЕРИРОВАНО scripts/build-menu.mjs, руками не править.
 * Источник: их PDF «CARTA-Valencia-vieiras» (создан 09.01.2026) → два независимых прочтения
 * + сверка по картинке (_data/menu-text/menu-final.json); английский — перевод с двумя
 * проверками (_data/menu-text/translate-en-final.json). Правки опечаток — FIXES в генераторе.
 * Цены сверяет scripts/check-menu.mjs.
 */

export type Allergen =
  | "gluten" | "crustaceos" | "huevos" | "pescado" | "cacahuetes" | "soja" | "lacteos"
  | "frutos_cascara" | "apio" | "mostaza" | "sesamo" | "sulfitos" | "altramuces" | "moluscos";

type T = { es: string; en: string };

/** supplement — доплата к буфету («+1 €»); unit — копа/бутылка у вин. */
export type Price = { value: number; supplement?: boolean; unit?: "glass" | "bottle" };

export type Dish = {
  num: string;
  hideNum: boolean;
  name: T;
  desc: T | null;
  pieces: T | null;
  spicy: number;
  allergens: Allergen[];
  prices: Price[];
};

export type MenuGroup = { id: string; title: T; dishes: Dish[] };
export type TabId = "sushi" | "cocina" | "fuera" | "bebidas";

export const TABS: TabId[] = ["sushi", "cocina", "fuera", "bebidas"];

export const carta: Record<TabId, MenuGroup[]> = {
  sushi: [
    {
      id: "nigiris",
      title: {"es":"Nigiris","en":"Nigiri"},
      dishes: [
        {"num":"1","hideNum":false,"name":{"es":"Salmón","en":"Salmon"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"2","hideNum":false,"name":{"es":"Salmón flambeado","en":"Flame-seared salmon"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"3","hideNum":false,"name":{"es":"Atún","en":"Tuna"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"4","hideNum":false,"name":{"es":"Pez mantequilla","en":"Butterfish"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"5","hideNum":false,"name":{"es":"Pez mantequilla flambeado","en":"Flame-seared butterfish"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"6","hideNum":false,"name":{"es":"Langostino","en":"King prawn"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"7","hideNum":false,"name":{"es":"Langostino con queso cheddar","en":"King prawn with cheddar"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["crustaceos","lacteos"],"prices":[]},
        {"num":"8","hideNum":false,"name":{"es":"Huevo codorniz con trufa","en":"Quail egg with truffle"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["huevos"],"prices":[]},
        {"num":"9","hideNum":false,"name":{"es":"Solomillo","en":"Tenderloin"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos","soja"],"prices":[]},
        {"num":"10","hideNum":false,"name":{"es":"Mango","en":"Mango"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":[],"prices":[]},
      ],
    },
    {
      id: "gunkan",
      title: {"es":"Gunkan","en":"Gunkan"},
      dishes: [
        {"num":"101","hideNum":false,"name":{"es":"Gunkan de tartar de salmón","en":"Salmon tartare gunkan"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"102","hideNum":false,"name":{"es":"Gunkan de tartar de atún","en":"Tuna tartare gunkan"},"desc":{"es":"Con salsa de sriracha.","en":"With sriracha sauce."},"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":1,"allergens":["pescado"],"prices":[]},
        {"num":"103","hideNum":false,"name":{"es":"Gunkan de wakame","en":"Wakame gunkan"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sesamo"],"prices":[]},
        {"num":"104","hideNum":false,"name":{"es":"Gunkan de tobiko","en":"Tobiko gunkan"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["soja","sesamo"],"prices":[]},
        {"num":"105","hideNum":false,"name":{"es":"Gunkan de fruta","en":"Fruit gunkan"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":[],"prices":[]},
      ],
    },
    {
      id: "hosomaki",
      title: {"es":"Hosomaki","en":"Hosomaki"},
      dishes: [
        {"num":"201","hideNum":false,"name":{"es":"Salmón","en":"Salmon"},"desc":{"es":"Roll de alga, arroz y salmón.","en":"Seaweed, rice and salmon roll."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"202","hideNum":false,"name":{"es":"Atún","en":"Tuna"},"desc":{"es":"Roll de alga, arroz y atún.","en":"Seaweed, rice and tuna roll."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"203","hideNum":false,"name":{"es":"Aguacate","en":"Avocado"},"desc":{"es":"Roll de alga, arroz y aguacate.","en":"Seaweed, rice and avocado roll."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":[],"prices":[]},
        {"num":"204","hideNum":false,"name":{"es":"Pepino","en":"Cucumber"},"desc":{"es":"Roll de alga, arroz y pepino.","en":"Seaweed, rice and cucumber roll."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":[],"prices":[]},
        {"num":"205","hideNum":false,"name":{"es":"Mango","en":"Mango"},"desc":{"es":"Roll de alga, arroz y mango.","en":"Seaweed, rice and mango roll."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":[],"prices":[]},
      ],
    },
    {
      id: "uramakis",
      title: {"es":"Uramakis","en":"Uramaki"},
      dishes: [
        {"num":"301","hideNum":false,"name":{"es":"California","en":"California"},"desc":{"es":"Roll de alga y arroz, relleno de langostino cocido, aguacate, pepino y mango, envuelto de tobiko.","en":"Seaweed and rice roll filled with cooked king prawn, avocado, cucumber and mango, coated in tobiko."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["sesamo","sulfitos","crustaceos"],"prices":[]},
        {"num":"302","hideNum":false,"name":{"es":"Salmón Philadelphia","en":"Salmon Philadelphia"},"desc":{"es":"Roll de alga y arroz, relleno de aguacate y queso philadelphia, envuelto de salmón.","en":"Seaweed and rice roll filled with avocado and Philadelphia cheese, wrapped in salmon."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","lacteos"],"prices":[]},
        {"num":"303","hideNum":false,"name":{"es":"Gari","en":"Gari"},"desc":{"es":"Roll de alga y arroz, rellenos de salmón y mango, envuelto de salmón flambeado.","en":"Seaweed and rice roll filled with salmon and mango, wrapped in flame-seared salmon."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","sesamo"],"prices":[]},
        {"num":"304","hideNum":false,"name":{"es":"Mango y atún","en":"Mango and tuna"},"desc":{"es":"Roll de alga y arroz, relleno de atún y mango, con salsa de mango y sésamo por fuera.","en":"Seaweed and rice roll filled with tuna and mango, with mango sauce and sesame on the outside."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"305","hideNum":false,"name":{"es":"Maki queso cheddar","en":"Cheddar maki"},"desc":{"es":"Roll de alga y arroz, relleno de salmón, aguacate y pepino. Envuelto de cheddar flambeado con salsa teriyaki.","en":"Seaweed and rice roll filled with salmon, avocado and cucumber. Wrapped in flame-seared cheddar with teriyaki sauce."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","lacteos"],"prices":[]},
        {"num":"306","hideNum":false,"name":{"es":"Yasai","en":"Yasai"},"desc":{"es":"Roll de lámina de arroz, lechuga y arroz, rellenos de nabo coreano y wakame.","en":"Rice paper, lettuce and rice roll filled with Korean radish and wakame."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["sesamo"],"prices":[]},
        {"num":"307","hideNum":false,"name":{"es":"Tori catsu","en":"Tori katsu"},"desc":{"es":"Roll de alga y arroz, rellenos de pollo y pepino. Decorado con cebolla frita.","en":"Seaweed and rice roll filled with chicken and cucumber. Topped with fried onion."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":[],"prices":[]},
        {"num":"308","hideNum":false,"name":{"es":"Pato","en":"Duck"},"desc":{"es":"Roll de alga y arroz, rellenos de pato y pepino. Con salsa de pato y sésamo.","en":"Seaweed and rice roll filled with duck and cucumber. With duck sauce and sesame."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["soja","sesamo"],"prices":[]},
        {"num":"309","hideNum":false,"name":{"es":"Dragon roll","en":"Dragon roll"},"desc":{"es":"Roll de alga y arroz, rellenos de tempura de langostino y aguacate. Envuelto de aguacate. Decorado con salsa mayo japo y sriracha, e hilo de carne.","en":"Seaweed and rice roll filled with king prawn tempura and avocado. Wrapped in avocado. Topped with Japanese mayo, sriracha and meat floss."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["gluten","crustaceos"],"prices":[]},
        {"num":"310","hideNum":false,"name":{"es":"Piña crash","en":"Pineapple crash"},"desc":{"es":"Roll de alga y arroz, relleno de pepino y piña, envuelto de salmón, decorado con queso.","en":"Seaweed and rice roll filled with cucumber and pineapple, wrapped in salmon, topped with cheese."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","lacteos"],"prices":[]},
        {"num":"311","hideNum":false,"name":{"es":"Tuna top","en":"Tuna top"},"desc":{"es":"Roll de alga y arroz, rellenos de pepino, queso philadelphia y tobiko, envuelto de atún.","en":"Seaweed and rice roll filled with cucumber, Philadelphia cheese and tobiko, wrapped in tuna."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","lacteos","soja","sesamo"],"prices":[]},
      ],
    },
    {
      id: "temaki",
      title: {"es":"Temaki","en":"Temaki"},
      dishes: [
        {"num":"401","hideNum":false,"name":{"es":"Temaki de salmón","en":"Salmon temaki"},"desc":{"es":"Cono de alga y arroz, relleno de salmón, aguacate y tobiko.","en":"Seaweed and rice cone filled with salmon, avocado and tobiko."},"pieces":null,"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"402","hideNum":false,"name":{"es":"Temaki de atún","en":"Tuna temaki"},"desc":{"es":"Cono de alga y arroz, relleno de atún, aguacate, y kimchi. Con salsa sriracha.","en":"Seaweed and rice cone filled with tuna, avocado and kimchi. With sriracha sauce."},"pieces":null,"spicy":1,"allergens":["pescado"],"prices":[]},
        {"num":"403","hideNum":false,"name":{"es":"Temaki de gamba","en":"Prawn temaki"},"desc":{"es":"Cono de alga y arroz, rellenos de langostino cocido, surimi y pepino.","en":"Seaweed and rice cone filled with cooked king prawn, surimi and cucumber."},"pieces":null,"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"404","hideNum":false,"name":{"es":"Temaki vegano","en":"Vegan temaki"},"desc":{"es":"Cono de alga y arroz, relleno de pepino, aguacate y mango. Con sésamo.","en":"Seaweed and rice cone filled with cucumber, avocado and mango. With sesame."},"pieces":null,"spicy":0,"allergens":[],"prices":[]},
      ],
    },
    {
      id: "futomaki",
      title: {"es":"Futomaki","en":"Futomaki"},
      dishes: [
        {"num":"501","hideNum":false,"name":{"es":"Futomaki roll original","en":"Original futomaki roll"},"desc":{"es":"Roll gigante de alga y arroz, envuelto de salmón, atún, pez mantequilla y surimi.","en":"Giant seaweed and rice roll filled with salmon, tuna, butterfish and surimi."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","crustaceos"],"prices":[]},
        {"num":"502","hideNum":false,"name":{"es":"Futomaki roll rebozado","en":"Deep-fried futomaki roll"},"desc":{"es":"Roll gigante rebozado de alga y arroz, envuelto de salmón, atún, pez mantequilla y surimi.","en":"Giant deep-fried seaweed and rice roll filled with salmon, tuna, butterfish and surimi."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","crustaceos"],"prices":[]},
      ],
    },
  ],
  cocina: [
    {
      id: "entrantes",
      title: {"es":"Entrantes","en":"Starters"},
      dishes: [
        {"num":"601","hideNum":false,"name":{"es":"Wakame","en":"Wakame"},"desc":null,"pieces":null,"spicy":0,"allergens":["sesamo"],"prices":[]},
        {"num":"602","hideNum":false,"name":{"es":"Edamame","en":"Edamame"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[]},
        {"num":"603","hideNum":false,"name":{"es":"Ensalada de alga fresca","en":"Fresh seaweed salad"},"desc":null,"pieces":null,"spicy":0,"allergens":["sesamo"],"prices":[]},
        {"num":"604","hideNum":false,"name":{"es":"Ensalada de marisco","en":"Seafood salad"},"desc":null,"pieces":null,"spicy":0,"allergens":["pescado","crustaceos"],"prices":[]},
        {"num":"605","hideNum":false,"name":{"es":"Carpaccio shake","en":"Salmon carpaccio"},"desc":null,"pieces":null,"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"606","hideNum":false,"name":{"es":"Mejillones","en":"Mussels"},"desc":null,"pieces":null,"spicy":0,"allergens":["moluscos"],"prices":[]},
        {"num":"607","hideNum":false,"name":{"es":"Púlpitos al estilo tailandés","en":"Thai-style baby octopus"},"desc":null,"pieces":null,"spicy":0,"allergens":["pescado"],"prices":[]},
      ],
    },
    {
      id: "sopa",
      title: {"es":"Sopa","en":"Soup"},
      dishes: [
        {"num":"701","hideNum":false,"name":{"es":"Miso","en":"Miso soup"},"desc":{"es":"Base de miso, con doufu, alga, champiñón, setas shiitake.","en":"Miso base with tofu, seaweed, button mushrooms and shiitake mushrooms."},"pieces":null,"spicy":0,"allergens":[],"prices":[]},
        {"num":"702","hideNum":false,"name":{"es":"Tom yum","en":"Tom yum"},"desc":{"es":"Almeja, hierba de limón, cebolla, jengibre, pimiento, limón.","en":"Clams, lemongrass, onion, ginger, pepper, lemon."},"pieces":null,"spicy":0,"allergens":["moluscos"],"prices":[]},
      ],
    },
    {
      id: "arroces",
      title: {"es":"Arroces y tallarines","en":"Rice and noodles"},
      dishes: [
        {"num":"801","hideNum":false,"name":{"es":"Arroz frito con soja","en":"Soy fried rice"},"desc":{"es":"Zanahoria, maíz, guisantes, huevo, bacon.","en":"Carrot, sweetcorn, peas, egg, bacon."},"pieces":null,"spicy":0,"allergens":["soja","huevos"],"prices":[]},
        {"num":"802","hideNum":false,"name":{"es":"Arroz tailandés","en":"Thai-style rice"},"desc":{"es":"Piña, guisante, gamba, zanahoria.","en":"Pineapple, peas, prawns, carrot."},"pieces":null,"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"803","hideNum":false,"name":{"es":"Tallarines con verdura y huevo","en":"Noodles with vegetables and egg"},"desc":null,"pieces":null,"spicy":0,"allergens":["huevos"],"prices":[]},
        {"num":"804","hideNum":false,"name":{"es":"Udon con verdura y huevo","en":"Udon with vegetables and egg"},"desc":null,"pieces":null,"spicy":0,"allergens":["huevos"],"prices":[]},
        {"num":"805","hideNum":false,"name":{"es":"Fideos de trigo sarraceno","en":"Buckwheat noodles"},"desc":{"es":"Verdura y salsa de sésamo.","en":"Vegetables and sesame sauce."},"pieces":null,"spicy":0,"allergens":["sesamo"],"prices":[]},
      ],
    },
    {
      id: "fritos",
      title: {"es":"Fritos","en":"Fried dishes"},
      dishes: [
        {"num":"901","hideNum":false,"name":{"es":"Rollitos vegetal","en":"Vegetable spring rolls"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten"],"prices":[]},
        {"num":"902","hideNum":false,"name":{"es":"Rollitos de marisco","en":"Seafood spring rolls"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten","pescado","crustaceos"],"prices":[]},
        {"num":"903","hideNum":false,"name":{"es":"Rollitos vietnam","en":"Vietnamese spring rolls"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten"],"prices":[]},
        {"num":"904","hideNum":false,"name":{"es":"Wantun de queso","en":"Cheese wontons"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten","lacteos"],"prices":[]},
        {"num":"905","hideNum":false,"name":{"es":"Empanadillas de pollo curry","en":"Chicken curry puffs"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
        {"num":"906","hideNum":false,"name":{"es":"Pan frito","en":"Fried buns"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten"],"prices":[]},
        {"num":"907","hideNum":false,"name":{"es":"Alitas de pollo","en":"Chicken wings"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten"],"prices":[]},
        {"num":"908","hideNum":false,"name":{"es":"Tempura de langostino","en":"King prawn tempura"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten","crustaceos"],"prices":[]},
        {"num":"909","hideNum":false,"name":{"es":"Tempura de langostino envuelto de fideo","en":"King prawn tempura wrapped in noodles"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten","crustaceos"],"prices":[]},
        {"num":"910","hideNum":false,"name":{"es":"Takoyakis","en":"Takoyaki"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["gluten","pescado"],"prices":[]},
        {"num":"911","hideNum":false,"name":{"es":"Costillas","en":"Ribs"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos"],"prices":[]},
      ],
    },
    {
      id: "brochetas",
      title: {"es":"Brochetas","en":"Skewers"},
      dishes: [
        {"num":"1001","hideNum":false,"name":{"es":"De gamba","en":"Prawn"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"1002","hideNum":false,"name":{"es":"De pollo","en":"Chicken"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos"],"prices":[]},
        {"num":"1003","hideNum":false,"name":{"es":"De cerdo estilo mongol","en":"Mongolian-style pork"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos"],"prices":[]},
        {"num":"1004","hideNum":false,"name":{"es":"De calamar","en":"Squid"},"desc":null,"pieces":null,"spicy":0,"allergens":["moluscos"],"prices":[]},
        {"num":"1005","hideNum":false,"name":{"es":"De sepia","en":"Cuttlefish"},"desc":null,"pieces":null,"spicy":0,"allergens":["moluscos"],"prices":[]},
      ],
    },
    {
      id: "calientes",
      title: {"es":"Platos calientes","en":"Hot dishes"},
      dishes: [
        {"num":"2001","hideNum":false,"name":{"es":"Gyozas","en":"Gyoza"},"desc":null,"pieces":{"es":"6 piezas","en":"6 pcs"},"spicy":0,"allergens":[],"prices":[]},
        {"num":"2002","hideNum":false,"name":{"es":"Gambas con salsa de ajo","en":"Prawns in garlic sauce"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"2003","hideNum":false,"name":{"es":"Gambas con salsa de Sambal","en":"Prawns in sambal sauce"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":["crustaceos"],"prices":[]},
        {"num":"2004","hideNum":false,"name":{"es":"Ternera, seta y bambú","en":"Beef with mushroom and bamboo shoots"},"desc":null,"pieces":null,"spicy":0,"allergens":["sulfitos"],"prices":[]},
        {"num":"2005","hideNum":false,"name":{"es":"Ternera Sichuan","en":"Sichuan beef"},"desc":null,"pieces":null,"spicy":2,"allergens":["sulfitos"],"prices":[]},
        {"num":"2006","hideNum":false,"name":{"es":"Ternera Hong Kong","en":"Hong Kong beef"},"desc":null,"pieces":null,"spicy":1,"allergens":["sulfitos"],"prices":[]},
        {"num":"2007","hideNum":false,"name":{"es":"Pollo estilo Taiwán","en":"Taiwanese-style chicken"},"desc":null,"pieces":null,"spicy":0,"allergens":["sulfitos"],"prices":[]},
        {"num":"2008","hideNum":false,"name":{"es":"Pollo curry","en":"Chicken curry"},"desc":null,"pieces":null,"spicy":1,"allergens":["sulfitos"],"prices":[]},
        {"num":"2009","hideNum":false,"name":{"es":"Pollo Hong Kong","en":"Hong Kong chicken"},"desc":null,"pieces":null,"spicy":1,"allergens":["sulfitos"],"prices":[]},
        {"num":"2010","hideNum":false,"name":{"es":"Pollo Sichuan","en":"Sichuan chicken"},"desc":null,"pieces":null,"spicy":2,"allergens":["sulfitos"],"prices":[]},
        {"num":"2011","hideNum":false,"name":{"es":"Almejas","en":"Clams"},"desc":null,"pieces":null,"spicy":0,"allergens":["moluscos"],"prices":[]},
        {"num":"2012","hideNum":false,"name":{"es":"Rollito Pato Pekín","en":"Peking duck roll"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
        {"num":"2013","hideNum":false,"name":{"es":"Pollo al limón","en":"Lemon chicken"},"desc":null,"pieces":null,"spicy":0,"allergens":["sulfitos"],"prices":[]},
        {"num":"2014","hideNum":false,"name":{"es":"Gambas con fideo de patata","en":"Prawns with potato noodles"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":["crustaceos"],"prices":[]},
      ],
    },
    {
      id: "vapor",
      title: {"es":"Platos al vapor","en":"Steamed dishes"},
      dishes: [
        {"num":"3001","hideNum":false,"name":{"es":"Arroz integral rojo","en":"Red wholegrain rice"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[]},
        {"num":"3002","hideNum":false,"name":{"es":"Xiaolongbao","en":"Xiaolongbao"},"desc":null,"pieces":null,"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
        {"num":"3003","hideNum":false,"name":{"es":"Siumai","en":"Siu mai"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
        {"num":"3004","hideNum":false,"name":{"es":"Jakao","en":"Har gow"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[]},
        {"num":"3005","hideNum":false,"name":{"es":"Vieira","en":"Scallop"},"desc":null,"pieces":{"es":"1 pieza · máx. 2 por persona","en":"1 pc · max. 2 per person"},"spicy":0,"allergens":["moluscos"],"prices":[]},
        {"num":"3006","hideNum":false,"name":{"es":"Bao de pato","en":"Duck bao"},"desc":null,"pieces":{"es":"1 pieza","en":"1 pc"},"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
        {"num":"3007","hideNum":false,"name":{"es":"Bao de pollo","en":"Chicken bao"},"desc":null,"pieces":{"es":"1 pieza","en":"1 pc"},"spicy":0,"allergens":["sulfitos","gluten"],"prices":[]},
      ],
    },
  ],
  fuera: [
    {
      id: "sashimi",
      title: {"es":"Sashimi","en":"Sashimi"},
      dishes: [
        {"num":"4001","hideNum":false,"name":{"es":"Salmón","en":"Salmon"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":["pescado"],"prices":[{"value":1,"supplement":true}]},
        {"num":"4002","hideNum":false,"name":{"es":"Atún","en":"Tuna"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":[],"prices":[{"value":1,"supplement":true}]},
        {"num":"4003","hideNum":false,"name":{"es":"Pez mantequilla","en":"Butterfish"},"desc":null,"pieces":{"es":"4 piezas","en":"4 pcs"},"spicy":0,"allergens":["pescado"],"prices":[{"value":1,"supplement":true}]},
      ],
    },
    {
      id: "nigiri-extra",
      title: {"es":"Sushi / Nigiri","en":"Sushi / Nigiri"},
      dishes: [
        {"num":"5001","hideNum":false,"name":{"es":"Anguila","en":"Eel"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":["pescado"],"prices":[{"value":1,"supplement":true}]},
        {"num":"5002","hideNum":false,"name":{"es":"Aguacate","en":"Avocado"},"desc":null,"pieces":{"es":"2 piezas","en":"2 pcs"},"spicy":0,"allergens":[],"prices":[{"value":1,"supplement":true}]},
      ],
    },
    {
      id: "uramaki-extra",
      title: {"es":"Uramaki","en":"Uramaki"},
      dishes: [
        {"num":"6001","hideNum":false,"name":{"es":"Anguila","en":"Eel"},"desc":{"es":"Anguila, aguacate, envuelto de anguila y sésamo.","en":"Eel and avocado, wrapped in eel and sesame."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado","sesamo"],"prices":[{"value":12.95}]},
        {"num":"6002","hideNum":false,"name":{"es":"Anguila e inari","en":"Eel and inari"},"desc":{"es":"Anguila, aguacate, envuelto de inari.","en":"Eel and avocado, wrapped in inari."},"pieces":{"es":"8 piezas","en":"8 pcs"},"spicy":0,"allergens":["pescado"],"prices":[{"value":12.95}]},
      ],
    },
    {
      id: "tartar",
      title: {"es":"Tartar","en":"Tartare"},
      dishes: [
        {"num":"7001","hideNum":false,"name":{"es":"Salmón","en":"Salmon"},"desc":null,"pieces":null,"spicy":0,"allergens":["pescado","soja","sesamo"],"prices":[{"value":5.5}]},
        {"num":"7002","hideNum":false,"name":{"es":"Atún","en":"Tuna"},"desc":null,"pieces":null,"spicy":0,"allergens":["pescado","soja","sesamo"],"prices":[{"value":5.5}]},
      ],
    },
    {
      id: "postres",
      title: {"es":"Postres","en":"Desserts"},
      dishes: [
        {"num":"8001","hideNum":false,"name":{"es":"Mochis Cream","en":"Cream mochi"},"desc":{"es":"Sabores a consultar.","en":"Ask about flavours."},"pieces":null,"spicy":0,"allergens":["lacteos","gluten","huevos","sesamo"],"prices":[{"value":4.5}]},
        {"num":"8002","hideNum":false,"name":{"es":"Tarta de Queso","en":"Cheesecake"},"desc":null,"pieces":null,"spicy":0,"allergens":["lacteos","huevos"],"prices":[{"value":4.95}]},
        {"num":"8003","hideNum":false,"name":{"es":"Tarta de queso vasca de Matcha","en":"Matcha Basque cheesecake"},"desc":null,"pieces":null,"spicy":0,"allergens":["lacteos","huevos"],"prices":[{"value":4.95}]},
        {"num":"8004","hideNum":false,"name":{"es":"Helados","en":"Ice cream"},"desc":{"es":"Sabores: té matcha, judía roja y sésamo.","en":"Flavours: matcha tea, red bean and sesame."},"pieces":null,"spicy":0,"allergens":["lacteos","huevos"],"prices":[{"value":2.5}]},
        {"num":"8003","hideNum":true,"name":{"es":"Dorayaki","en":"Dorayaki"},"desc":{"es":"Relleno de judía roja.","en":"Filled with red bean paste."},"pieces":null,"spicy":0,"allergens":["lacteos","huevos"],"prices":[{"value":3.5}]},
      ],
    },
  ],
  bebidas: [
    {
      id: "refrescos",
      title: {"es":"Bebidas sin alcohol","en":"Soft drinks"},
      dishes: [
        {"num":"9001","hideNum":false,"name":{"es":"Agua 50 cl","en":"Water 50 cl"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":2.5}]},
        {"num":"9002","hideNum":false,"name":{"es":"Agua Vichy","en":"Vichy sparkling water"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.3}]},
        {"num":"9003","hideNum":false,"name":{"es":"Coca-Cola original","en":"Coca-Cola Original"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.2}]},
        {"num":"9004","hideNum":false,"name":{"es":"Coca-Cola Zero","en":"Coca-Cola Zero"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.2}]},
        {"num":"9005","hideNum":false,"name":{"es":"Fanta naranja","en":"Fanta Orange"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.2}]},
        {"num":"9006","hideNum":false,"name":{"es":"Fanta limón","en":"Fanta Lemon"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.2}]},
        {"num":"9007","hideNum":false,"name":{"es":"Aquarius naranja","en":"Aquarius Orange"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
        {"num":"9008","hideNum":false,"name":{"es":"Aquarius limón","en":"Aquarius Lemon"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
        {"num":"9009","hideNum":false,"name":{"es":"Nestea","en":"Nestea"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
        {"num":"9010","hideNum":false,"name":{"es":"Sprite","en":"Sprite"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
        {"num":"9011","hideNum":false,"name":{"es":"Tónica","en":"Tonic water"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
        {"num":"9012","hideNum":false,"name":{"es":"Ramune","en":"Ramune"},"desc":{"es":"Sabores a consultar.","en":"Ask about flavours."},"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.6}]},
        {"num":"9013","hideNum":false,"name":{"es":"Mogu mogu","en":"Mogu Mogu"},"desc":{"es":"Sabores a consultar.","en":"Ask about flavours."},"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5}]},
      ],
    },
    {
      id: "alcohol",
      title: {"es":"Bebidas con alcohol","en":"Alcoholic drinks"},
      dishes: [
        {"num":"9014","hideNum":false,"name":{"es":"Cerveza Mahou 5 Estrellas","en":"Mahou 5 Estrellas beer"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3}]},
        {"num":"9015","hideNum":false,"name":{"es":"Cerveza Mahou 0,0 Tostada","en":"Mahou 0,0 Tostada alcohol-free beer"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3}]},
        {"num":"9016","hideNum":false,"name":{"es":"Estrella Galicia","en":"Estrella Galicia"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.1}]},
        {"num":"9017","hideNum":false,"name":{"es":"Cerveza japonesa Sapporo","en":"Sapporo Japanese beer"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.3}]},
        {"num":"9018","hideNum":false,"name":{"es":"Sake 150 ml","en":"Sake 150 ml"},"desc":{"es":"Para 1-2 personas.","en":"Serves 1–2."},"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":5.5}]},
        {"num":"9019","hideNum":false,"name":{"es":"Sake 300 ml","en":"Sake 300 ml"},"desc":{"es":"Para 2-4 personas.","en":"Serves 2–4."},"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":7.5}]},
        {"num":"9020","hideNum":false,"name":{"es":"Sake koji 300 ml","en":"Koji sake 300 ml"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":12.95}]},
        {"num":"9021","hideNum":false,"name":{"es":"Soju","en":"Soju"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":12.95}]},
      ],
    },
    {
      id: "tinto",
      title: {"es":"Vino tinto","en":"Red wine"},
      dishes: [
        {"num":"9022","hideNum":false,"name":{"es":"Pata Negra Roble Toro","en":"Pata Negra Roble Toro"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5,"unit":"glass"},{"value":10.9,"unit":"bottle"}]},
        {"num":"9023","hideNum":false,"name":{"es":"Protos Roble Ribera del Duero","en":"Protos Roble Ribera del Duero"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":18.8,"unit":"bottle"}]},
        {"num":"9024","hideNum":false,"name":{"es":"Marqués de Cáceres Crianza","en":"Marqués de Cáceres Crianza"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":18.5,"unit":"bottle"}]},
        {"num":"9025","hideNum":false,"name":{"es":"Lambrusco Valmarone","en":"Lambrusco Valmarone"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
        {"num":"9026","hideNum":false,"name":{"es":"El Coto Rioja Crianza","en":"El Coto Rioja Crianza"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":13.5,"unit":"bottle"}]},
      ],
    },
    {
      id: "blanco",
      title: {"es":"Vino blanco","en":"White wine"},
      dishes: [
        {"num":"9027","hideNum":false,"name":{"es":"Viore Verdejo","en":"Viore Verdejo"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5,"unit":"glass"},{"value":10.9,"unit":"bottle"}]},
        {"num":"9028","hideNum":false,"name":{"es":"Marqués de Vizhoja","en":"Marqués de Vizhoja"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":13.8,"unit":"bottle"}]},
        {"num":"9029","hideNum":false,"name":{"es":"Oroya, Especial Sushi","en":"Oroya “Especial Sushi”"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":12.95,"unit":"bottle"}]},
        {"num":"9030","hideNum":false,"name":{"es":"Marqués de Cáceres blanco","en":"Marqués de Cáceres white"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":12.5,"unit":"bottle"}]},
        {"num":"9031","hideNum":false,"name":{"es":"Barbadillo","en":"Barbadillo"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
      ],
    },
    {
      id: "rosado",
      title: {"es":"Vino rosado","en":"Rosé wine"},
      dishes: [
        {"num":"9032","hideNum":false,"name":{"es":"Pata Negra D.O. Ribera del Duero","en":"Pata Negra D.O. Ribera del Duero"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.5,"unit":"glass"},{"value":10.9,"unit":"bottle"}]},
        {"num":"9033","hideNum":false,"name":{"es":"Lambrusco Valmarone","en":"Lambrusco Valmarone"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
      ],
    },
    {
      id: "cava",
      title: {"es":"Cava","en":"Cava"},
      dishes: [
        {"num":"9034","hideNum":false,"name":{"es":"Visiega Cava Brut","en":"Visiega Cava Brut"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
        {"num":"9035","hideNum":false,"name":{"es":"Visiega Cava Semi","en":"Visiega Cava Semi"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
        {"num":"9036","hideNum":false,"name":{"es":"Visiega Cava Brut Rosado","en":"Visiega Cava Brut Rosé"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":10.95,"unit":"bottle"}]},
      ],
    },
    {
      id: "cafe",
      title: {"es":"Café e infusiones","en":"Coffee and tea"},
      dishes: [
        {"num":"9037","hideNum":false,"name":{"es":"Café","en":"Coffee"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":1.9}]},
        {"num":"9038","hideNum":false,"name":{"es":"Té o infusión","en":"Tea or herbal tea"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":1.6}]},
        {"num":"9039","hideNum":false,"name":{"es":"Té Jazmín","en":"Jasmine tea"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":2.8}]},
        {"num":"9040","hideNum":false,"name":{"es":"Té Japonés","en":"Japanese tea"},"desc":{"es":"Té verde con arroz tostado.","en":"Genmaicha (green tea with toasted rice)."},"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3}]},
        {"num":"9041","hideNum":false,"name":{"es":"Café con Baileys","en":"Coffee with Baileys"},"desc":null,"pieces":null,"spicy":0,"allergens":[],"prices":[{"value":3.1}]},
      ],
    },
  ],
};

/** Буфет (стр. 2 карты): обед пн–пт, ужин пн–чт, пятница вечером/выходные/праздники; дети < 1,20 м; до 3 лет — бесплатно. */
export const buffet = {
  "adult": [
    {
      "id": "lunch",
      "price": 20.95
    },
    {
      "id": "dinner",
      "price": 23.95
    },
    {
      "id": "weekend",
      "price": 26.95
    }
  ],
  "kids": 9.95,
  "babies": 0
} as const;

export type TierId = (typeof buffet.adult)[number]["id"];

/** Оригинал карты на их сайте (PDF, 9 стр.). */
export const cartaPdf = "https://tairyokaitensushi.com/wp-content/uploads/2026/01/CARTA-Valencia-vieiras.pdf";

/** Всего позиций карты (для заголовков). */
export const dishCount = 143;
