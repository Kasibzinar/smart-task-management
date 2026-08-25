import { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

function useCategories() {
  const context = useContext(CategoryContext);

  if (!context)
    throw new Error('useCategories must be used inside CategoryProvider');

  return context;
}

export default useCategories;
