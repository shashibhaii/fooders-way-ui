import React, { useState, useContext, useEffect } from 'react';
import { Auth } from '../../../App';
import { authorizedaxios } from '../../../axiosinit';

function AddItem({ setNew_items, categorieslist, setToastSuccess, setToastDanger, setAllertmsg, close }) {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [isveg, setIsveg] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedCategoryid, setSelectedCategoryid] = useState('');

  const context = useContext(Auth);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  useEffect(() => {
    if (categorieslist.length) { setSelectedCategoryid(categorieslist[0].id) }
  }, [categorieslist])

  const submitItem = () => {
    if (context) {
      authorizedaxios(context.token, context.businessId).post('/business/add-menu-item', {
        "categoryId": selectedCategoryid,
        "itemName": item,
        "itemPrice": parseInt(price),
        "isVeg": isveg,
        "itemDescription": itemDescription
      })
        .then((res) => {
          if (res.status === 200) {
            setNew_items({
              "categoryId": res.data['response'][0].categoryId,
              "id": res.data['response'][0].id,
              "isEnabled": res.data['response'][0].isEnabled,
              "isVeg": res.data['response'][0].isVeg,
              "itemDescription": res.data['response'][0].itemDescription,
              "itemName": res.data['response'][0].itemName,
              "itemPrice": res.data['response'][0].itemPrice
            })
            setItem('');
            setPrice('');
            setIsveg('');
            setItemDescription('');
            setChecked1(false);
            setChecked2(false);
            setAllertmsg('')
            setToastDanger(false)
            setToastSuccess(true)
            setAllertmsg("New Item Added!")
            close();
          } else if (res.status !== 200) {
            setToastSuccess(false)
            setAllertmsg('')
            setToastDanger(true)
            setAllertmsg("Something went wrong!")
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const onClose = () => {
    setItem('');
    setPrice('');
    setIsveg('');
    setItemDescription('');
    setChecked1(false);
    setChecked2(false);
    close();
  }

  return (
    <>
      <div id="add-item-modal" data-aos="fade-down" tabIndex={-1} className="hidden form-font fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full justify-center bg-opacity-50 bg-gray-900">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div id="add-item-modal" className="form-font relative rounded shadow-2xl shadow-slate-500 bg-white">
            <div className="px-4 py-5 flex justify-between items-center">
              {/* <div className="font-sans text-xl font-semibold text-gray-800">{`Welcome ${jwtDecode(context.token).sub}`}</div> */}
              <div className="font-sans text-xl font-semibold text-gray-800">Add Item</div>
              <button className="px-2 py-2" onClick={onClose}>
                <i className="items-center fa-solid fa-xmark text-2xl text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <hr />
            <div className="px-4 py-5">
              <div className="mb-4">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select Your Category</label>
                {categorieslist.length > 0 &&
                  <select onChange={(e) => setSelectedCategoryid(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-600 focus:outline-blue-600 block w-full p-2.5">
                    {
                      categorieslist.map((i, k) =>
                        <option key={k} value={i.id}>{i.category}</option>
                      )
                    }
                  </select>
                }
              </div>
              <div className="mb-6">
                <div className="relative z-0 w-full group">
                  <input type="text" onChange={(e) => setItem(e.target.value)} value={item} name="floating_first_name" id="floating_first_name" className="text-gray-500 font-medium text-lg block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item
                    Name</label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap justify-between mb-6">
                <fieldset className="mb-4 sm:mb-0">
                  <div className="flex items-center mb-4">
                    <input id="veg-item" type="radio" checked={checked1} onChange={() => {
                      setChecked1(true)
                      setChecked2(false)
                      setIsveg("veg")
                    }} className="w-4 h-4" />
                    <label htmlFor="veg-item" className="block ml-2 text-sm font-medium text-gray-900">Veg</label>
                  </div>
                  <div className="flex items-center">
                    <input id="nonveg-item" type="radio" checked={checked2} defaultValue="false" onChange={() => {
                      setChecked1(false)
                      setChecked2(true)
                      setIsveg("non-veg")
                    }} className="w-4 h-4" />
                    <label htmlFor="nonveg-item" className="block ml-2 text-sm font-medium text-gray-900">Non-Veg</label>
                  </div>
                </fieldset>
                <div className>
                  <div className="relative z-0 w-full group">
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" className="text-gray-500 font-medium text-lg block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=' ' required />
                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item
                      Price <span className="text-sm">(in rupees: ₹)</span></label>
                  </div>
                </div>
              </div>
              <div className>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Item Description</label>
                <textarea id="message" rows={4} className="text-gray-500 font-medium text-[16px] placeholder:text-[16px] block p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-600" placeholder="Give a description about your item..." onChange={(e) => setItemDescription(e.target.value)} value={itemDescription} />
              </div>
            </div>
            <hr />
            <div className="px-4 py-5 flex justify-end space-x-2">
              <button className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700" onClick={onClose}>Close</button>
              <button className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700" onClick={submitItem}>Save Item</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem
