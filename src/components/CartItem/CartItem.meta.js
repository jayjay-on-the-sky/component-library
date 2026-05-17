export default {
  name: 'CartItem',
  category: 'E-commerce',
  description: 'Shopping cart line item with quantity control and remove button.',
  variants: [
    {
      label: 'With image',
      props: {
        name: 'Premium Wireless Headphones',
        variant: 'Midnight Black',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
      },
    },
    {
      label: 'No image',
      props: {
        name: 'Mechanical Keyboard',
        variant: 'US Layout · Cherry MX Blue',
        price: 149,
        quantity: 2,
      },
    },
  ],
}
