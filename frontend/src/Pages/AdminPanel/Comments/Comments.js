import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch(`http://localhost:4000/v1/comments`)
      .then((res) => res.json())
      .then((allComments) => {
        console.log(allComments);
        setComments(allComments);
      });
  }

  // Ban Comment
  const removecoment = (commentID) => {
    swal({
      title: "آیا از حذف مطمینید؟",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      console.log(result);
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام شد",
              buttons: "اوکی",
              icon: "success",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title={"کامنتها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کاربر </th>
              <th> دوره </th>
              <th> مشاهده کامنت </th>
              <th>پاسخ</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((coment, index) => (
              <tr>
                <td>{index + 1} </td>
                <td>{coment.creator.name} </td>
                <td>{coment.course} </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removecoment(coment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
                    بن
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