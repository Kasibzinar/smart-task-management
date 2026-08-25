import { useState } from 'react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

import { Pencil, Plus, Trash2 } from 'lucide-react';

import useCategories from '../hooks/useCategories';

function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useCategories();

  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  function handleChange(e) {
    setCategoryName(e.target.value);
  }

  function handleAddCategory(e) {
    e.preventDefault();

    const name = categoryName.trim();

    if (!name) return;

    addCategory(name);
    setCategoryName('');
  }

  function handleEdit(category) {
    setEditingId(category.id);
    setEditingName(category.name);
  }

  function handleUpdateCategory(e) {
    e.preventDefault();

    const name = editingName.trim();

    if (!name) return;

    updateCategory(editingId, name);

    setEditingId(null);
    setEditingName('');
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditingName('');
  }

  function handleDeleteCategory(category) {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  }

  function handleCancelDelete() {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }

  function handleConfirmDelete() {
    if (!categoryToDelete) return;

    deleteCategory(categoryToDelete.id);

    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          Categories
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Organize your tasks into categories.
        </p>
      </div>

      <form
        onSubmit={handleAddCategory}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex-1">
          <Input
            value={categoryName}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>

        <Button type="submit">
          <Plus size={18} />
          Add Category
        </Button>
      </form>

      {categories.length === 0 ? (
        <p className="mt-8 text-slate-500 dark:text-slate-400">
          No categories yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              {editingId === category.id ? (
                <form onSubmit={handleUpdateCategory} className="space-y-3">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <Button type="submit">Save</Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-medium text-slate-800 dark:text-slate-100">
                    {category.name}
                  </h2>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil size={16} />
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Delete Category
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete this category?
          </p>

          {categoryToDelete && (
            <p className="mt-3 font-medium text-slate-800 dark:text-slate-200">
              "{categoryToDelete.name}"
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>

            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Categories;
