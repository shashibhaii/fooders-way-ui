import React from 'react';
import AddCategory from './addcategorymodal';
import AddItem from './additemmodal';

function Buttons({ setToastSuccess, setToastDanger, setAllertmsg, setCategories, setNew_items, categorieslist, setNew_category }) {
  function hideAddItemModal() {
    window.document.getElementById("add-item-modal").classList.add("hidden");
    window.document.getElementById("add-item-modal").classList.remove("flex");
  }

  function showAddItemModal() {
    window.document.getElementById("add-item-modal").classList.add("flex");
    window.document.getElementById("add-item-modal").classList.remove("hidden");
  }

  function hideAddCategoryModal() {
    window.document.getElementById("popup-add-category-modal").classList.add("hidden");
    window.document.getElementById("popup-add-category-modal").classList.remove("flex");
  }

  function showAddCategoryModal() {
    window.AOS.init({
      delay: 200,
    });
    window.document.getElementById("popup-add-category-modal").classList.add("flex");
    window.document.getElementById("popup-add-category-modal").classList.remove("hidden");
  }

  return (
    <>
      <div className="py-2 my-6 flex flex-col space-y-4 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2">
        <button className="btn-add" onClick={showAddItemModal}>Add Item</button>
        <button className="btn-add" onClick={showAddCategoryModal}>Add Category</button>
      </div>

      {/* Modal - Add Category */}
      <AddCategory close={hideAddCategoryModal} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setAllertmsg={setAllertmsg} setCategories={setCategories} setNew_category={setNew_category} />

      {/* Modal - Add Item */}
      <AddItem data-aos="fade-down" close={hideAddItemModal} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setAllertmsg={setAllertmsg} setNew_items={setNew_items} categorieslist={categorieslist} />
    </>
  );
}

export default Buttons
