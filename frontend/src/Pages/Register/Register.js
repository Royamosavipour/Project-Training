import React, { useContext } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import { useForm } from "../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validaitors/rules";
import AuthContext from "../../Context/authContext";

import "./Register.css";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";

export default function Register() {
  const authContext = useContext(AuthContext);

  const navigaite = useNavigate();
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      phone: formState.inputs.phone.value,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => {
        // res.json();
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 403) {
            swal({
              title: "شماره مسدود می باشد",
              icon: "error",
              buttons: "ای بابا",
            });
          }
        }
      })
      .then((result) => {
        console.log(result);
        authContext.login(result.user, result.accessToken);
        navigaite('/')
      });
  };

  return (
    <>
      <TopBar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="login-form__username-input"
                element="input"
                id="name"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                type="text"
                placeholder="نام کاربری"
                className="login-form__username-input"
                element="input"
                id="username"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                type="text"
                placeholder="شماره تماس "
                className="login-form__username-input"
                element="input"
                id="phone"
                onInputHandler={onInputHandler}
                validations={[minValidator(8), maxValidator(20)]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="text"
                placeholder="آدرس ایمیل"
                className="login-form__username-input"
                element="input"
                id="email"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  maxValidator(25),
                  emailValidator(),
                ]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="password"
                placeholder="رمز عبور"
                className="login-form__password-input"
                element="input"
                id="password"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "login-form__btn_success"
                  : "login-form__btn_error"
              }`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
