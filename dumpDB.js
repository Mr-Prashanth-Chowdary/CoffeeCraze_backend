const data = {
    Featured: [
      {
        id: 1,
        img: 'https://dummyimage.com/600x400/000/fff&text=Arabica+Delight',
        name: 'Arabica Delight',
        size: '120g Pack',
        about: 'A classic blend with a smooth, rich flavor profile.',
        price: 12,
        keyword: ['black-coffee', 'dark', 'low sugar'],
        origin: 'Colombia',
        roast: 'Medium',
        rating: 4.5,
        stock: 150,
        sku: 'AD-120',
        category: 'Premium',
        packaging: 'Resealable pouch',
        brand: 'Café Premium',
        discount: 0, // percentage discount (0 means no discount)
        delivery: '2-3 days'
      },
      {
        id: 2,
        img: 'https://dummyimage.com/600x400/000/fff&text=Bold+Roast',
        name: 'Bold Roast',
        size: '500g Pack',
        about: 'Experience the intense and robust taste with every sip.',
        price: 14,
        keyword: ['intense', 'bold', 'rich'],
        origin: 'Brazil',
        roast: 'Dark',
        rating: 4.7,
        stock: 80,
        sku: 'BR-500',
        category: 'Intense',
        packaging: 'Eco-friendly bag',
        brand: 'Roast Masters',
        discount: 10,
        delivery: '3-5 days'
      },
      {
        id: 3,
        img: 'https://dummyimage.com/600x400/000/fff&text=Eco+Brew',
        name: 'Eco Brew',
        size: '250g Pack',
        about: 'Ethically sourced and perfectly balanced for the eco-conscious coffee lover.',
        price: 15,
        keyword: ['organic', 'sustainable', 'eco-friendly'],
        origin: 'Ethiopia',
        roast: 'Light',
        rating: 4.2,
        stock: 200,
        sku: 'EB-250',
        category: 'Organic',
        packaging: 'Biodegradable pouch',
        brand: 'Green Beans Co.',
        discount: 5,
        delivery: '2-4 days'
      },
      {
        id: 4,
        img: 'https://dummyimage.com/600x400/000/fff&text=Velvet+Roast',
        name: 'Velvet Roast',
        size: '120g Pack',
        about: 'A smooth, velvety texture that awakens the senses.',
        price: 18,
        keyword: ['smooth', 'rich', 'velvety'],
        origin: 'Guatemala',
        roast: 'Medium-Dark',
        rating: 4.6,
        stock: 90,
        sku: 'VR-120',
        category: 'Specialty',
        packaging: 'Resealable pouch',
        brand: 'Artisan Roasts',
        discount: 0,
        delivery: '2-3 days'
      },
      {
        id: 5,
        img: 'https://dummyimage.com/600x400/000/fff&text=Morning+Bliss',
        name: 'Morning Bliss',
        size: '200g Pack',
        about: 'Start your day with a burst of energy and flavor.',
        price: 12,
        keyword: ['morning', 'energetic', 'bright'],
        origin: 'Costa Rica',
        roast: 'Light-Medium',
        rating: 4.4,
        stock: 120,
        sku: 'MB-200',
        category: 'Breakfast',
        packaging: 'Resealable pouch',
        brand: 'Sunrise Coffee',
        discount: 0,
        delivery: '1-2 days'
      },
      {
        id: 6,
        img: 'https://dummyimage.com/600x400/000/fff&text=Sunrise+Espresso',
        name: 'Sunrise Espresso',
        size: '500g Pack',
        about: 'A bold espresso blend to kick start your morning.',
        price: 16,
        keyword: ['espresso', 'bold', 'intense'],
        origin: 'Italy',
        roast: 'Dark',
        rating: 4.8,
        stock: 60,
        sku: 'SE-500',
        category: 'Espresso',
        packaging: 'Airtight bag',
        brand: 'Caffè Italiano',
        discount: 15,
        delivery: '3-4 days'
      },
      {
        id: 7,
        img: 'https://dummyimage.com/600x400/000/fff&text=Heritage+Blend',
        name: 'Heritage Blend',
        size: '300g Pack',
        about: 'A blend that honors traditional roasting methods with a modern twist.',
        price: 17,
        keyword: ['heritage', 'traditional', 'modern'],
        origin: 'Sumatra',
        roast: 'Medium',
        rating: 4.3,
        stock: 70,
        sku: 'HB-300',
        category: 'Signature',
        packaging: 'Resealable pouch',
        brand: 'Legacy Roasts',
        discount: 10,
        delivery: '2-3 days'
      },
      {
        id: 8,
        img: 'https://dummyimage.com/600x400/000/fff&text=Mystic+Aroma',
        name: 'Mystic Aroma',
        size: '150g Pack',
        about: 'Experience the enchanting aroma and flavor with every sip.',
        price: 13,
        keyword: ['aromatic', 'mystic', 'floral'],
        origin: 'Yemen',
        roast: 'Light',
        rating: 4.0,
        stock: 110,
        sku: 'MA-150',
        category: 'Exotic',
        packaging: 'Resealable pouch',
        brand: 'Mystic Beans',
        discount: 5,
        delivery: '2-3 days'
      },
      {
        id: 9,
        img: 'https://dummyimage.com/600x400/000/fff&text=Night+Owl+Decaf',
        name: 'Night Owl Decaf',
        size: '250g Pack',
        about: 'Enjoy the full flavor without the caffeine kick.',
        price: 11,
        keyword: ['decaf', 'night', 'soothing'],
        origin: 'Brazil',
        roast: 'Medium',
        rating: 4.1,
        stock: 140,
        sku: 'ND-250',
        category: 'Decaf',
        packaging: 'Eco-friendly bag',
        brand: 'Nighttime Roasts',
        discount: 0,
        delivery: '1-2 days'
      },
      {
        id: 10,
        img: 'https://dummyimage.com/600x400/000/fff&text=Urban+Grind',
        name: 'Urban Grind',
        size: '400g Pack',
        about: 'A bold and contemporary blend for the modern coffee enthusiast.',
        price: 15,
        keyword: ['urban', 'contemporary', 'bold'],
        origin: 'Colombia',
        roast: 'Dark',
        rating: 4.5,
        stock: 95,
        sku: 'UG-400',
        category: 'Modern',
        packaging: 'Resealable pouch',
        brand: 'City Beans',
        discount: 8,
        delivery: '2-4 days'
      },
      {
        id: 11,
        img: 'https://dummyimage.com/600x400/000/fff&text=Café+Nirvana',
        name: 'Café Nirvana',
        size: '350g Pack',
        about: 'Achieve coffee enlightenment with this perfectly balanced brew.',
        price: 19,
        keyword: ['nirvana', 'balanced', 'zen'],
        origin: 'Kenya',
        roast: 'Medium',
        rating: 4.7,
        stock: 85,
        sku: 'CN-350',
        category: 'Artisan',
        packaging: 'Resealable pouch',
        brand: 'Zen Roasts',
        discount: 12,
        delivery: '2-3 days'
      },
      {
        id: 12,
        img: 'https://dummyimage.com/600x400/000/fff&text=Rustic+Charm',
        name: 'Rustic Charm',
        size: '150g Pack',
        about: 'A rustic and earthy blend that brings the charm of countryside brewing.',
        price: 10,
        keyword: ['rustic', 'earthy', 'countryside'],
        origin: 'Ethiopia',
        roast: 'Light',
        rating: 4.2,
        stock: 130,
        sku: 'RC-150',
        category: 'Rustic',
        packaging: 'Eco-friendly bag',
        brand: 'Countryside Coffee',
        discount: 5,
        delivery: '1-2 days'
      }
    ]
  };
  
  module.exports = data;
  