import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import InputField from "../../UI/fields/InputField";
import { HiPencil } from "react-icons/hi";
import SimpleButton from "../../UI/buttons/SimpleButton";
import axios from "axios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    try {
      const result = await axios.post(
        "http://localhost:3001/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSubmitProps.resetForm();

      if (result) setPageType("login");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      onSubmitProps.resetForm();

      if (result.data) {
        dispatch(
          setLogin({
            user: result.data.user,
            token: result.data.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            {isRegister && (
              <>
                <div className="flex justify-between items-center">
                  <InputField
                    className="mr-2"
                    type="text"
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <InputField
                  className="mt-5"
                  type="text"
                  label="Location"
                  name="location"
                  value={values.location}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <InputField
                  className="mt-5"
                  type="text"
                  label="Occupation"
                  name="occupation"
                  value={values.occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="w-full border-2 border-dashed border-slate-100 p-2 cursor-pointer mt-5"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p className="text-base dark:text-white">
                          Add Picture Here
                        </p>
                      ) : (
                        <div className="flex justify-between items-center">
                          <p className="text-base dark:text-white">
                            {values.picture.name}
                          </p>
                          <HiPencil className="dark:text-white" />
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </>
            )}
            <InputField
              className="mt-5"
              type="text"
              label="Email"
              name="email"
              value={values.email}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <InputField
              className="mt-5"
              type="password"
              label="Password"
              name="password"
              value={values.password}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {/* BUTTONS */}
          <div className="mt-5">
            <SimpleButton>{isLogin ? "login" : "register"}</SimpleButton>
            <p
              className="text-base transition-colors text-slate-300 dark:text-white hover:text-slate-400 hover:dark:hover:text-slate-300 underline cursor-pointer mt-5"
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
