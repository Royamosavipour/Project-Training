import React, { useContext } from "react";
import AuthContext from "../../../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";


import './Sidebar.css'





export default function Sidebar() {
const authContext=useContext(AuthContext)
const navigate=useNavigate()

  const logOutAdmin=(event)=>{
    event.preventDefault()

    swal({
      title:'خروج با موفقیت ثبت گردید',
      icon:'success',
      buttons:'اوکی',
      
    }).then(()=>{
      authContext.logout()
      navigate('/')
    })
  
  }





  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <Link to={'/p-admin'}>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses
            ">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <span>کدهای تخفیف</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>دسته‌بندی‌ها</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span onClick={logOutAdmin}> خروج   </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}