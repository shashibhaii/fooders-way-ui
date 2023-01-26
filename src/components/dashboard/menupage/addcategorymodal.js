import React, { useState, useContext } from 'react';
import { Auth } from '../../../App';
import { authorizedaxios } from '../../../axiosinit';
import { CategoryConvention } from '../../../stringManupulate';

function AddCategory({ close, setCategories, setNew_category, setToastSuccess, setToastDanger, setAllertmsg }) {
  const context = useContext(Auth);
  const [category, setCategory] = useState('');

  const submitCategory = () => {
    if (category && context) {
      authorizedaxios(context.token, context.businessId).post('/business/add-menu-category', {
        "businessId": context.businessId,
        "category": CategoryConvention(category)
      })
        .then((res) => {
          if (res.status === 200) {
            if (res.data['message'] !== 'Menu Category Exists') {
              setNew_category(
                { "category": res.data['response'][0].category, "id": res.data['response'][0].id }
              )
              setCategories(s => [res.data['response'][0], ...s])
              setCategory('');
              setAllertmsg('')
              setToastDanger(false)
              setToastSuccess(true)
              setAllertmsg("New Category Added!")
              close();
            }
            else {
              setCategory('');
              setAllertmsg('')
              setToastDanger(true)
              setToastSuccess(false)
              setAllertmsg("Menu Category Exists!")
            }
          }
          else if (res.status !== 200) {
            setToastSuccess(false)
            setAllertmsg('')
            setToastDanger(true)
            setAllertmsg("Something went wrong!")
          }
        })
        .catch((res) => {
          console.log(res)
        })
    }
  }

  const onClose = () => {
    setCategory('');
    close();
  }

  return (
    <>
      <div data-aos="fade-down" id="popup-add-category-modal" tabIndex={-1} className="hidden form-font fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full justify-center bg-opacity-50 items-center bg-gray-900">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div id="add-category-modal" className="relative bg-white rounded-lg shadow">
            <div className="px-4 py-5 flex justify-between items-center">
              <div className="font-sans text-xl font-semibold text-gray-800">Add Category</div>
              <button className="px-2 py-2" onClick={() => onClose()}>
                <i className="items-center fa-solid fa-xmark text-2xl text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <hr />
            <div className="px-4 py-5">
              <div className="relative z-0 w-full group">
                <input placeholder=' ' type="text" name="floating_first_name" id="floating_first_name" className="text-gray-500 font-medium text-lg block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={category} onChange={(e) => setCategory(e.target.value)} />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category
                  Name</label>
              </div>
            </div>
            <hr />
            <div className="px-4 py-5 flex justify-end space-x-2">
              <button className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700 text-[13px] sm:text-base" onClick={() => onClose()}>Close</button>
              <button className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 text-[13px] sm:text-base" onClick={() => submitCategory()}>Save
                Category</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategory
