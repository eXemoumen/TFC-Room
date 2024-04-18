'use client'
import { SearchInput } from '../components/SearchInput'
import { ProductsWindow } from '../components/ProductsWindow'

export const ItemsWindow = () => {
  const categories = [
    { id: 1, name: 'Cameras' },
    { id: 2, name: 'Lenses' }
  ];

  const products = [
    { id: 1, title: 'Vintage Camera', imageUrl: 'https://example.com/vintage-camera.jpg', category: 'Cameras' },
    { id: 2, title: 'Modern Lens', imageUrl: 'https://example.com/modern-lens.jpg', category: 'Lenses' },
    { id: 3, title: 'Modern Lens', imageUrl: 'https://example.com/modern-lens.jpg', category: 'Lenses' },
    { id: 4, title: 'Modern Lens', imageUrl: 'https://example.com/modern-lens.jpg', category: 'Lenses' },
    { id: 5, title: 'Modern Lens', imageUrl: 'https://example.com/modern-lens.jpg', category: 'Lenses' },
    { id: 6, title: 'Modern Lens', imageUrl: 'https://example.com/modern-lens.jpg', category: 'Lenses' }
  ];

  return (
    <>
      <SearchInput />
      <ProductsWindow categories={categories} products={products} />
    </>
  )
}