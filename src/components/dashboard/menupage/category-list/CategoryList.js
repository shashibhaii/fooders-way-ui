import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Auth } from '../../../../App';
import { authorizedaxios } from '../../../../axiosinit';

function CategoryList({ setSelectedbtn, selectedbtn, setNew_category, setCategorieslists, setChoosedcategory, new_category }) {
  //all categories with value
  const [categorieslist, setCategorieslist] = useState([]);

  const [paginate, setPaginate] = useState([]);
  const [paginatecounter, setPaginatecounter] = useState(0);

  //filter search purpose
  const [subcategorieslist, setSubcategorieslist] = useState([]);
  const [filteredsearch, setFilteredsearch] = useState([]);
  const [search, setSearch] = useState('');

  //context API
  const context = useContext(Auth);

  const [currentSelectedbtn, setCurrentSelectedbtn] = useState(null);

  //assurence of not to push duplicate items
  const duplicate = [];

  //page offset for pagination
  let pageOffset = 0;

  const next = () => {
    if (!paginate.length) return;

    if (paginatecounter === paginate.length - 1) {
      setPaginatecounter(0);
    } else {
      setPaginatecounter(paginatecounter + 1);
    }
  }

  const prev = () => {
    if (!paginate.length) return;

    if (paginatecounter === 0) {
      setPaginatecounter(paginate.length - 1);
    } else {
      setPaginatecounter(paginatecounter - 1);
    }
  }

  const filterSearch = () => {
    if (search) {
      const result = subcategorieslist.filter(event => {
        return event.category.toLowerCase().match(search.toLowerCase());
      });

      setFilteredsearch(result);
    }
  }

  useLayoutEffect(() => {
    filterSearch();

    if (context.screenWidth > 500 && context.screenWidth < 900) {
      pageOffset = 12;
    } else if (context.screenWidth < 500) {
      pageOffset = 6;
    } else {
      pageOffset = 20;
    }

    if (new_category) {
      setPaginate([]);
      let finalItemList = [];
      let finalTempItemList = [];

      categorieslist.forEach((element, index) => {
        if ((index + 1) % pageOffset === 0) {
          finalTempItemList.push(element);
          finalItemList.push(finalTempItemList);
          finalTempItemList = [];
        } else {
          finalTempItemList.push(element);
        }
      });

      if (finalTempItemList.length !== 0)
        finalItemList.push(finalTempItemList);

      setPaginate(finalItemList);
    }
  }, [search, new_category])

  useEffect(() => {
    if (pageOffset && !new_category) {
      authorizedaxios(context.token, context.businessId).get(`/business/get-all-menu-category?businessId=${context.businessId}`)
        .then((res) => {
          if (res) {
            setCategorieslist([]);
            setCategorieslists([]);
            setSubcategorieslist([]);

            for (let i = 0; i < res.data['response'].length; ++i) {
              if (!duplicate.includes(res.data['response'][i].category)) {
                duplicate.push(res.data['response'][i].category);
                setCategorieslist(s => [...s, res.data['response'][i]]);
                setCategorieslists(s => [...s, res.data['response'][i]]);
                setSubcategorieslist(s => [...s, res.data['response'][i]]);
              }
            }

            let finalItemList = [];
            let finalTempItemList = [];

            res.data['response'].forEach((element, index) => {
              if ((index + 1) % pageOffset === 0) {
                finalTempItemList.push(element);
                finalItemList.push(finalTempItemList);
                finalTempItemList = [];
              } else {
                finalTempItemList.push(element);
              }
            });

            if (finalTempItemList.length !== 0)
              finalItemList.push(finalTempItemList);

            setPaginate(finalItemList);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    if (new_category) {
      setCategorieslist(s => [...s, new_category]);
      setNew_category(null);
    }
  }, [new_category])

  return (
    <>
      <div id="card-category" className="px-4 py-6 form-font rounded-md border bg-white duration-200 hover:shadow-md hover:shadow-slate-400 text-sm md:text-base">
        <div className="justify-between items-center flex">
          <span className="text-[16px] md:text-lg font-semibold">Categories</span>
          <span className="font-semibold text-white">
            <button disabled={(!paginate.length || paginatecounter === 0 || paginate.length <= pageOffset) ? true : false} className={(!paginate.length || paginatecounter === 0) ? "px-[7px] py-[2px] mr-1 rounded bg-[#eeeeee] opacity-50" : "px-[7px] py-[2px] mr-1 rounded bg-[#eeeeee] hover:bg-slate-200"} onClick={prev}>
              <i className="fa-solid fa-less-than text-slate-400"></i>
            </button>
            <button disabled={(!paginate.length || paginatecounter === paginate.length - 1) ? true : false} className={(!paginate.length || paginatecounter === paginate.length - 1) ? "px-[7px] py-[2px] mr-1 rounded bg-[#eeeeee] opacity-50" : "px-[7px] py-[2px] mr-1 rounded bg-[#eeeeee] hover:bg-slate-200"} onClick={next}>
              <i className="fa-solid fa-greater-than text-slate-400"></i>
            </button>
          </span>
        </div>
        <div className="my-2">
          <form>
            <label className="relative block">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white text-slate-600 placeholder:font-italitc border border-slate-400 focus:shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                placeholder="Search for categories..." type="text" />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                  viewBox="0 0 30 30">
                  <path
                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                  </path>
                </svg>
              </span>
            </label>
          </form>
        </div>
        <div>
          {!search && paginate.length ?
            paginate[paginatecounter].map((val, i) =>
              <button onClick={() => {
                setChoosedcategory(null)
                setSelectedbtn(null)
                setCurrentSelectedbtn(null)
                setChoosedcategory(val)
                setSelectedbtn(val.id)
                setCurrentSelectedbtn(val.id)
              }} className={!currentSelectedbtn ? selectedbtn === val.id ? "btn-category-selected" : "btn-category" : currentSelectedbtn === val.id ? "btn-category-selected" : "btn-category"} key={val.id}>{val.category}</button>
            ) :
            filteredsearch.map((val, i) =>
              <button onClick={() => {
                setChoosedcategory(null)
                setSelectedbtn(null)
                setCurrentSelectedbtn(null)
                setChoosedcategory(val)
                setSelectedbtn(val.id)
                setCurrentSelectedbtn(val.id)
              }} className={!currentSelectedbtn ? selectedbtn === val.id ? "btn-category-selected" : "btn-category" : currentSelectedbtn === val.id ? "btn-category-selected" : "btn-category"} key={val.id}>{val.category}</button>
            )
          }
        </div>
      </div>
    </>
  );
}

export default CategoryList
