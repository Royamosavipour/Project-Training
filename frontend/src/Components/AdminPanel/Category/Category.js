import React, { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable";

export default function Category() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getallCategories()
  }, []);


  function getallCategories(){
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
        setCategories(allCategories)
      });
  }

  return (
    <>
      <DataTable title={"دسته بندی"}>
      <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>

              <th>ویرایش</th>
              <th>حذف</th>

            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1} </td>
                <td>{category.title} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}