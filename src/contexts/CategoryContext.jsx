import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useLocalStorage('categories', []);

  function addCategory(categoryName) {
    const newCategory = {
      id: crypto.randomUUID(),
      name: categoryName,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setCategories((currentCategories) => [...currentCategories, newCategory]);
  }

  function updateCategory(categoryId, updatedName) {
    setCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === categoryId
          ? { ...category, name: updatedName }
          : category,
      ),
    );
  }

  function deleteCategory(categoryId) {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId),
    );
  }

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext, CategoryProvider };
