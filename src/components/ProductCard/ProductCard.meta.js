export default {
  name: 'ProductCard',
  category: 'E-commerce',
  description: 'Product card with image, price, rating, wishlist and quick-add.',
  variants: [
    {
      label: 'Default',
      props: {
        name: 'Premium Wireless Headphones',
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.7,
        reviewCount: 238,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      },
    },
    {
      label: 'With badge',
      props: {
        name: 'Mechanical Keyboard',
        price: 149,
        rating: 4.5,
        reviewCount: 89,
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
      },
    },
    {
      label: 'No image',
      props: {
        name: 'Mystery Product',
        price: 29.99,
        originalPrice: 49.99,
        rating: 4.1,
        reviewCount: 12,
      },
    },
  ],
}
