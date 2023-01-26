import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Auth } from '../../../App';
import { authorizedaxios } from '../../../axiosinit';
import AlertDanger from '../../AlertDanger';
import AlertSucess from '../../AlertSucess';
import Buttons from './buttons';
import CategoryList from './category-list/CategoryList';
import Table from './itemtable/table';

function Menu() {
  const [new_items, setNew_items] = useState(null);
  const [new_category, setNew_category] = useState(null);
  const [categorieswithitems, setCategorieswithitems] = useState([]);

  const context = useContext(Auth);
  const [is_deleted, setIs_deleted] = useState(false);
  const [selectedbtn, setSelectedbtn] = useState(null);
  const [is_modified, setIs_modified] = useState(false);
  const [categorieslist, setCategorieslist] = useState([]); //only categories and id

  const [choosedcategory, setChoosedcategory] = useState(null);
  const [filteredcategory, setFilteredcategory] = useState(null);

  const [allertmsg, setAllertmsg] = useState('');
  const [isToastDanger, setToastDanger] = useState(false);
  const [isToastSuccess, setToastSuccess] = useState(false);

  let detectduplicate = [];

  const fetchCategoriesWithItems = () => {
    if ((context) && !choosedcategory && !new_items && !new_category) {
      authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-details?businessId=${context.businessId}`)
        .then((res) => {
          setCategorieswithitems([]);
          detectduplicate = [];
          setSelectedbtn(res.data['response'][0].categoryId);

          for (let i = 0; i < res.data['response'].length; ++i) {
            if (!detectduplicate.includes(res.data['response'][i].category)) {
              detectduplicate.push(res.data['response'][i].category)
              setCategorieswithitems(s => [...s, res.data['response'][i]])
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const filterAccordingChoosedCategory = () => {
    if (choosedcategory) {
      for (let i = 0; i < categorieswithitems.length; ++i) {
        if (categorieswithitems[i].categoryId === choosedcategory.id) {
          setFilteredcategory(categorieswithitems[i]);
          break;
        }
      }
    }
  }

  useEffect(() => {
    fetchCategoriesWithItems();
    filterAccordingChoosedCategory();
  }, [choosedcategory])

  useLayoutEffect(() => {
    if (new_items) {
      authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-details?businessId=${context.businessId}`)
        .then((res) => {
          setCategorieswithitems([])
          detectduplicate = []
          for (let i = 0; i < res.data['response'].length; ++i) {
            if (!detectduplicate.includes(res.data['response'][i].category)) {
              detectduplicate.push(res.data['response'][i].category)
              setCategorieswithitems(s => [...s, res.data['response'][i]])
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })

      setNew_items(null);
    }

    if (is_modified) {
      authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-details?businessId=${context.businessId}`)
        .then((res) => {
          setCategorieswithitems([]);
          detectduplicate = [];

          for (let i = 0; i < res.data['response'].length; ++i) {
            if (!detectduplicate.includes(res.data['response'][i].category)) {
              detectduplicate.push(res.data['response'][i].category)
              setCategorieswithitems(s => [...s, res.data['response'][i]])
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })

      setIs_modified(false);
    }

    if (is_deleted) {
      authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-details?businessId=${context.businessId}`)
        .then((res) => {
          setCategorieswithitems([]);
          detectduplicate = [];

          for (let i = 0; i < res.data['response'].length; ++i) {
            if (!detectduplicate.includes(res.data['response'][i].category)) {
              detectduplicate.push(res.data['response'][i].category)
              setCategorieswithitems(s => [...s, res.data['response'][i]])
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })

      setIs_deleted(false);
    }

    if (new_category) {
      if (new_category) {
        authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-details?businessId=${context.businessId}`)
          .then((res) => {
            setCategorieswithitems([]);
            detectduplicate = [];

            for (let i = 0; i < res.data['response'].length; ++i) {
              if (!detectduplicate.includes(res.data['response'][i].category)) {
                detectduplicate.push(res.data['response'][i].category)
                setCategorieswithitems(s => [...s, res.data['response'][i]])
              }
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

    filterAccordingChoosedCategory();
  }, [new_items, is_modified, categorieswithitems, is_deleted, new_category])

  return (
    <>
      {/* Success & Danger Alert */}
      <AlertSucess message={allertmsg} isToastSuccess={isToastSuccess} setToastSuccess={setToastSuccess} setAllertmsg={setAllertmsg} />
      {isToastDanger && <AlertDanger message={allertmsg} isToastDanger={isToastDanger} setToastDanger={setToastDanger} setAllertmsg={setAllertmsg} />}

      <CategoryList selectedbtn={selectedbtn} setSelectedbtn={setSelectedbtn} setNew_category={setNew_category} new_category={new_category} setChoosedcategory={setChoosedcategory} setCategorieslists={setCategorieslist} />
      <Buttons setAllertmsg={setAllertmsg} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setCategorieswithitems={setCategorieswithitems} setNew_category={setNew_category} setCategories={setCategorieswithitems} setNew_items={setNew_items} categorieslist={categorieslist} />
      <div className="px-1 md:px-2 py-2 flex flex-col items-center border rounded-md bg-white duration-200 hover:shadow-md hover:shadow-slate-400">
        {categorieswithitems.length > 0 ?
          <>
            <Table setAllertmsg={setAllertmsg} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setIs_deleted={setIs_deleted} setIs_modified={setIs_modified} setNew_items={setNew_items} new_item={new_items} items={filteredcategory ? filteredcategory.menuItems : categorieswithitems[0].menuItems} categoryid={filteredcategory ? filteredcategory.categoryId : categorieswithitems[0].categoryId} title={filteredcategory ? filteredcategory.category : categorieswithitems[0].category} />
          </>
          : <h5 className="form-font text-center text-slate-700">No Categories</h5>
        }
      </div>
    </>
  );
}

export default Menu
