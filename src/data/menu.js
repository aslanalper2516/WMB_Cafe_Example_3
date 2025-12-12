// Menu data structure
export const menuCategories = [
  { id: 'borek', nameTR: 'Börek', nameEN: 'Börek', order: 1 },
  { id: 'pastry', nameTR: 'Pastane & Tatlılar', nameEN: 'Pastry & Desserts', order: 2 },
  { id: 'staples', nameTR: 'Temel Ürünler', nameEN: 'Bakery Staples', order: 3 },
  { id: 'beverages', nameTR: 'İçecekler', nameEN: 'Beverages', order: 4 }
]

export const menuItems = [
  // Börek Category
  {
    id: 'kiymali',
    categoryId: 'borek',
    nameTR: 'Kıymalı Börek',
    nameEN: 'Minced Meat Börek',
    descTR: 'Geleneksel yöntemlerle hazırlanan, çıtır katmanları ve bol iç harcıyla.',
    descEN: 'Prepared with traditional methods, crispy layers and rich filling.',
    price: 45,
    currency: 'TL',
    imageUrl: 'https://www.ardaninmutfagi.com/wp-content/uploads/2019/05/kiymali-borek-d.jpg',
    tags: ['signature'],
    allergens: ['gluten', 'milk', 'eggs'],
    available: true
  },
  {
    id: 'ispanakli',
    categoryId: 'borek',
    nameTR: 'Ispanaklı & Peynirli Börek',
    nameEN: 'Spinach & Cheese Börek',
    descTR: 'Taze ıspanak ve beyaz peynir ile hazırlanan, günlük taze üretim.',
    descEN: 'Prepared with fresh spinach and white cheese, daily fresh production.',
    price: 42,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
    tags: ['vegetarian'],
    allergens: ['gluten', 'milk'],
    available: true
  },
  {
    id: 'su_boregi',
    categoryId: 'borek',
    nameTR: 'Su Böreği',
    nameEN: 'Su Böreği',
    descTR: 'El açması yufkalar ve kaliteli peynir ile klasik su böreği.',
    descEN: 'Classic water pastry with hand-rolled dough and quality cheese.',
    price: 48,
    currency: 'TL',
    imageUrl: 'https://www.lepleziz.com/images/content/kolay-su-boregi_nsez.webp',
    tags: ['vegetarian'],
    allergens: ['gluten', 'milk'],
    available: true
  },
  {
    id: 'sigara',
    categoryId: 'borek',
    nameTR: 'Sigara Böreği',
    nameEN: 'Sigara Böreği',
    descTR: 'Çıtır doku ve yumuşak peynir dolgusu ile hızlı servis için ideal.',
    descEN: 'Crispy texture and soft cheese filling, ideal for quick service.',
    price: 35,
    currency: 'TL',
    imageUrl: 'https://i.elele.com.tr/2/1280/720/storage/files/images/2021/09/17/sigara-boregi-PXYE_cover.jpg',
    tags: ['vegetarian', 'bestseller'],
    allergens: ['gluten', 'milk'],
    available: true
  },
  // Pastry Category
  {
    id: 'baklava',
    categoryId: 'pastry',
    nameTR: 'Baklava',
    nameEN: 'Baklava',
    descTR: 'Katmanlı yufka, ceviz ve şerbet ile geleneksel lezzet.',
    descEN: 'Traditional flavor with layered dough, walnuts and syrup.',
    price: 85,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=900&q=80',
    tags: ['signature'],
    allergens: ['gluten', 'nuts'],
    available: true
  },
  {
    id: 'kunefe',
    categoryId: 'pastry',
    nameTR: 'Künefe',
    nameEN: 'Künefe',
    descTR: 'Tel kadayıf ve peynir ile hazırlanan, taze servis edilen.',
    descEN: 'Prepared with shredded dough and cheese, served fresh.',
    price: 95,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    tags: ['bestseller'],
    allergens: ['gluten', 'milk'],
    available: true
  },
  {
    id: 'revani',
    categoryId: 'pastry',
    nameTR: 'Revani',
    nameEN: 'Revani',
    descTR: 'Şerbetli tatlı, merkezi üretim ve raf ömrü uzun.',
    descEN: 'Syrupy dessert, central production and long shelf life.',
    price: 65,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=900&q=80',
    tags: [],
    allergens: ['gluten', 'eggs'],
    available: true
  },
  // Staples Category
  {
    id: 'simit',
    categoryId: 'staples',
    nameTR: 'Simit',
    nameEN: 'Simit',
    descTR: 'Günlük taze üretim, hızlı hazırlık süresi.',
    descEN: 'Daily fresh production, quick preparation time.',
    price: 8,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    tags: ['bestseller'],
    allergens: ['gluten', 'sesame'],
    available: true
  },
  {
    id: 'pide',
    categoryId: 'staples',
    nameTR: 'Pide',
    nameEN: 'Pide',
    descTR: 'Günlük taze pişirme, standart boyut ve kalite kontrolü.',
    descEN: 'Daily fresh baking, standard size and quality control.',
    price: 25,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
    tags: [],
    allergens: ['gluten'],
    available: true
  },
  {
    id: 'ekmek',
    categoryId: 'staples',
    nameTR: 'Ekmek',
    nameEN: 'Bread',
    descTR: 'Parti üretimi ile günlük taze ekmek, tutarlı kalite.',
    descEN: 'Daily fresh bread with batch production, consistent quality.',
    price: 12,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
    tags: [],
    allergens: ['gluten'],
    available: true
  },
  // Beverages Category
  {
    id: 'turkish_tea',
    categoryId: 'beverages',
    nameTR: 'Türk Çayı',
    nameEN: 'Turkish Tea',
    descTR: 'Anında hazırlanır, standart servis.',
    descEN: 'Instant preparation, standard service.',
    price: 15,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80',
    tags: ['bestseller'],
    allergens: [],
    available: true
  },
  {
    id: 'coffee',
    categoryId: 'beverages',
    nameTR: 'Türk Kahvesi',
    nameEN: 'Turkish Coffee',
    descTR: 'Geleneksel yöntemle hazırlanan, premium lezzet.',
    descEN: 'Prepared with traditional method, premium flavor.',
    price: 35,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    tags: [],
    allergens: [],
    available: true
  },
  {
    id: 'ayran',
    categoryId: 'beverages',
    nameTR: 'Ayran',
    nameEN: 'Ayran',
    descTR: 'Günlük taze hazırlanan, serinletici içecek.',
    descEN: 'Daily fresh preparation, refreshing drink.',
    price: 12,
    currency: 'TL',
    imageUrl: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=900&q=80',
    tags: ['vegetarian'],
    allergens: ['milk'],
    available: true
  }
]

