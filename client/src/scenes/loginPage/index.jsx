import Form from "./Form";

const LoginPage = () => {
  return (
    <div className="">
      <div className=" w-[500px] max-w-full p-6 my-8 mx-auto rounded-lg bg-white dark:bg-[#1A1A1A]">
        <h2 className=" text-2xl font-medium text-center text-black dark:text-white">
          Login
        </h2>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
