import React, { useState, useContext, useEffect } from 'react';
import { Auth } from '../../../../App';
import { authorizedaxios } from '../../../../axiosinit';

function Modify({ close, setToastDanger, setToastSuccess, setAllertmsg, row, setIs_modified, setRow }) {
  const context = useContext(Auth);
  const [item, setItem] = useState('');
  const [isveg, setIsveg] = useState('');
  const [price, setPrice] = useState(null);
  const [isEnabled, setIsEnabled] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [offerpercentage, setOfferpercentage] = useState(null);
  const [checkofvegornon1, setCheckofvegornon1] = useState(false);
  const [checkofvegornon2, setCheckofvegornon2] = useState(false);

  const onClose = () => {
    setItem('');
    setPrice(null);
    setIsveg('');
    setIsEnabled('');
    setItemDescription('');
    setOfferpercentage(null);
    setRow(null);
    close();
  }

  const submitItem = () => {
    if (row && context) {
      const data = {
        "menuItemId": row.id,
        "itemName": item,
        "itemPrice": price,
        "isVeg": isveg,
        "itemDescription": itemDescription,
        "isEnabled": isEnabled,
        "discount": offerpercentage
      };

      authorizedaxios(context.token, context.businessId).put('/business/update-menu-item', data)
        .then(res => {
          if (res.status === 200) {
            setAllertmsg('')
            setToastSuccess(false)
            setToastDanger(false)
            setIs_modified(true)
            setToastSuccess(true)
            setAllertmsg("Successfully Modified!")
          }
          else if (res.status !== 200) {
            setAllertmsg('')
            setToastSuccess(false)
            setToastDanger(false)
            setToastDanger(true)
            setAllertmsg("Something went wrong!")
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (row) {
      setItem(row.itemName);
      setPrice(row.itemPrice);
      setIsveg(row.isVeg);
      setIsEnabled(row.isEnabled);
      setItemDescription(row.itemDescription);
      setOfferpercentage(row.discount);

      if (row.isVeg === "veg") {
        setCheckofvegornon1(true)
        setCheckofvegornon2(false)
      }
      else if (row.isVeg === "non-veg") {
        setCheckofvegornon2(true)
        setCheckofvegornon1(false)
      }
    }
  }, [row])

  return (
    <>
      <div id="popup-update-item-modal" tabIndex={-1} className="hidden form-font fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal h-full justify-center bg-opacity-50 bg-gray-900">
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div id="update-item-modal" className="form-font relative rounded shadow-2xl shadow-slate-500 bg-white">
            <div className="px-4 py-5 flex justify-between items-center">
              <div className="font-sans text-xl font-semibold text-gray-800">Update Item</div>
              <button className="px-2 py-2" onClick={onClose}>
                <i className="items-center fa-solid fa-xmark text-2xl text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <hr />
            <div className="px-4 py-5">
              <label className="relative inline-flex items-center mb-4 cursor-pointer">
                {isEnabled === 'YES' ? <input type="checkbox" onClick={() => setIsEnabled('NO')} className="sr-only peer" defaultChecked /> : <input type="checkbox" onClick={() => setIsEnabled('YES')} className="sr-only peer" />}
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900">Item Available</span>
              </label>
              <div className="mb-6">
                <div className="relative z-0 w-full group">
                  <input onChange={(e) => setItem(e.target.value)} placeholder=' ' value={item} type="text" name="floating_first_name" id="floating_first_name" className="text-gray-500 font-medium text-lg block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Item
                    Name</label>
                </div>
              </div>
              <fieldset className="mb-6">
                <div className="flex items-center mb-4">
                  <input id="veg-food" type="radio" name="food-type" checked={checkofvegornon1} defaultValue={isveg} onChange={() => {
                    setCheckofvegornon1(true)
                    setCheckofvegornon2(false)
                    setIsveg("veg")
                  }} className="w-4 h-4" />
                  <label htmlFor="veg-food" className="block ml-2 text-sm font-medium text-gray-900">Veg</label>
                </div>
                <div className="flex items-center">
                  <input id="nonveg-food" type="radio" name="food-type" checked={checkofvegornon2} defaultValue={isveg} onChange={() => {
                    setCheckofvegornon1(false)
                    setCheckofvegornon2(true)
                    setIsveg("non-veg")
                  }} className="w-4 h-4" />
                  <label htmlFor="nonveg-food" className="block ml-2 text-sm font-medium text-gray-900">Non-Veg</label>
                </div>
              </fieldset>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between mb-6">
                <div className="mb-2 sm:mb-0">
                  <label htmlFor="small-input" className="block text-sm mb-2 font-medium text-gray-900">Item Price<span className="text-sm">(in rupees: ₹)</span></label>
                  <input type="number" id="small-input" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-600" onChange={(e) => setPrice(e.target.value)} value={price} />
                </div>
                <div className>
                  <label htmlFor="small-input" className="block text-sm mb-2 font-medium text-gray-900">Item Discount<span className="text-sm">(in rupees: %)</span></label>
                  <input type="text" id="small-input" className="block text-sm w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-600" onChange={(e) => setOfferpercentage(e.target.value)} value={offerpercentage} />
                </div>
              </div>
              <div className>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Item Description</label>
                <textarea id="message" rows={4} className="text-gray-500 font-medium text-[16px] placeholder:text-[16px] block p-2.5 w-full bg-gray-50 rounded-lg border border-gray-300 focus:outline-blue-600" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>
            </div>
            <hr />
            <div className="px-4 py-5 flex justify-end space-x-2">
              <button className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700" onClick={onClose}>Close</button>
              <button className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700" onClick={submitItem}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modify
