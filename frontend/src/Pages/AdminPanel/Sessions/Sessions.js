import React, { useEffect, useState } from "react";
import Input from "../../../Components/Form/Input";
import { useForm } from "../../../Hooks/useForm";
import { minValidator } from "../../../Validaitors/rules";
import swal from "sweetalert";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";

export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState({});
  const [setions, setSetions] = useState([]);
  const [isSessionFree, setIsSessionFree] = useState("1");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSesstion();

    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allcourses) => {
        console.log(allcourses);
        setCourses(allcourses);
      });
  }, []);

  const createSession = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("time", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", isSessionFree);

    fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorageData.token}` },
      body: formData,
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        swal({
          title: "درخواست دوره ثیت گردید",
          icon: "success",
          buttons: "OK",
        }).then(() => console.log("get all sesstion"));
      }
      return res.text()
    }).then(res=>{console.log(res)})
  };

  function getAllSesstion() {
    fetch(`http://localhost:4000/v1/courses/sessions`)
      .then((res) => res.json())
      .then((allsetions) => {
        console.log(allsetions);
        setSetions(allsetions);
      });
  }

  function removeSetion(setionID) {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "آیا از حذف جلسه اطمینان دارید",
      icon: "warning",
      buttons: ["NO", "Yes"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/courses/sessions/${setionID}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorageData.token}` },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "حذف با موفقیت انجام شد",
              icon: "success",
              buttons: "OK",
            }).then(() => getAllSesstion());
          }
        });
      }
    });
  }
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">فایل جلسه</label>
                <input
                  type="file"
                  onChange={(e) => setSessionVideo(e.target.files[0])}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>رایگان </span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={(e) => setIsSessionFree(e.target.value)}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>غیررایگان  </span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          onInput={(e) => setIsSessionFree(e.target.value)}
                          checked
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="جلسات" />
      <table class="table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>عنوان</th>
            <th>مدت زمان جلسه</th>
            <th>دوره‌</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {setions.map((setion, index) => (
            <tr>
              <td>{index + 1} </td>
              <td>{setion.title} </td>
              <td>{setion.time} </td>
              <td>{setion.course.name} </td>

              <td>
                <button
                  type="button"
                  class="btn btn-danger delete-btn"
                  onClick={() => {
                    removeSetion(setion._id);
                  }}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
