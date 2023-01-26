import React, { useState, useEffect, useLayoutEffect } from 'react';
import DataTable from 'react-data-table-component';
import Modify from './modifyitem';
import ConfirmationDelete from './confirmationDelete';

function Table({ setToastDanger, setToastSuccess, setAllertmsg, setNew_items, title, categoryid, items, new_item, setIs_modified, setIs_deleted }) {
  const [Row, setRow] = useState(null);
  const [search, setSearch] = useState('');
  const [itemlist, setItemlist] = useState([]);
  const [subitemlist, setSubitemlist] = useState([]);
  const [filteredsearch, setFilteredsearch] = useState([]);

  function hideDeleteModal() {
    window.document.getElementById("popup-delete-item-modal").classList.add("hidden");
    window.document.getElementById("popup-delete-item-modal").classList.remove("flex");
  }

  function showDeleteModal() {
    window.document.getElementById("popup-delete-item-modal").classList.add("flex");
    window.document.getElementById("popup-delete-item-modal").classList.remove("hidden");
  }

  function hideModal() {
    window.document.getElementById("popup-update-item-modal").classList.add("hidden");
    window.document.getElementById("popup-update-item-modal").classList.remove("flex");
  }

  function showModal() {
    window.document.getElementById("popup-update-item-modal").classList.add("flex");
    window.document.getElementById("popup-update-item-modal").classList.remove("hidden");
  }

  let detectduplicate = [];

  const deleteButton = (row) => {
    setRow(null)
    showDeleteModal();
    setRow(row)
  };

  const columns = [
    { name: "Item Name", selector: (row) => row.itemName, sortable: true },
    { name: "Item Price", selector: (row) => row.itemPrice, sortable: true },
    { name: "Food Type", selector: (row) => row.isVeg },
    { name: "Availability", selector: (row) => row.isEnabled },
    { name: "Discount", selector: (row) => `${row.discount} %` },
    { name: "Discounted Price", selector: (row) => row.discountedPrice },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <button className="mx-2" onClick={() => {
              setRow(row)
              showModal()
            }}>
              <i className="fa-solid fa-pen-to-square text-xl text-blue-600"></i>
            </button>
            <button className="" onClick={() => deleteButton(row)}>
              <i class="fa-solid fa-trash-can text-xl text-red-600"></i>
            </button>
          </>
        );
      }
    }
  ];

  const creationOfItemList = () => {
    if (new_item === null && items) {
      setItemlist([]);
      setSubitemlist([]);
      detectduplicate = [];
      for (let i = 0; i < items.length; ++i) {
        if (!detectduplicate.includes(items[i].itemName)) {
          detectduplicate.push(items[i].itemName);
          setItemlist(s => [...s, items[i]]);
          setSubitemlist(s => [...s, items[i]]);
        }
      }
    }
  }

  const filterSearch = () => {
    if (search) {
      const result = subitemlist.filter(event => {
        return event.itemName.toLowerCase().match(search.toLowerCase());
      });
      setFilteredsearch(result);
    }
  }

  const newItemAdd = () => {
    if (new_item && new_item.categoryId === categoryid) {
      if (itemlist && !itemlist.includes(new_item.itemName)) {
        setItemlist(s => [...s, new_item]);
        setSubitemlist(s => [...s, new_item]);
        setNew_items(null);
        new_item = null;
      }
    }
  }

  useLayoutEffect(() => {
    setItemlist([]);
    setSubitemlist([]);
    creationOfItemList();
  }, [items])

  useEffect(() => {
    filterSearch();
    newItemAdd();
  }, [new_item, search])

  return (
    <>
      <Modify close={hideModal} setAllertmsg={setAllertmsg} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setIs_modified={setIs_modified} row={Row} setRow={setRow} />
      <ConfirmationDelete setSubitemlist={setSubitemlist} subitemlist={subitemlist} setItemlist={setItemlist} itemlist={itemlist} setAllertmsg={setAllertmsg} setToastSuccess={setToastSuccess} setToastDanger={setToastDanger} setIs_deleted={setIs_deleted} close={hideDeleteModal} row={Row} setRow={setRow} />
      <DataTable
        title={<b>{title && title}</b>}
        columns={columns}
        data={search ? filteredsearch : itemlist}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="385px"
        key={itemlist.id}
        // selectableRows
        selectableRowsHighlight
        highlightOnHover
        className="data-table-scroll-none"
        subHeader
        subHeaderComponent={
          <>
            <div className="py-1 flex justify-end w-full">
              <input
                type="text"
                className="w-full sm:w-[50%] xl:w-[35%] px-2.5 py-1.5 rounded outline outline-1 outline-sky-400 text-slate-800 focus:outline-2 focus:shadow-md"
                name="table-search"
                id="table-search"
                placeholder="Search for items..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </>
        }
      />
    </>
  );
}

export default Table