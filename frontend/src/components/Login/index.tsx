import { useForm } from "react-hook-form";
import "./styles.css";

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData : FormData) => {
    console.log(formData);
  };

  return (
    <>
      <h2>LOGIN</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("username")}
              type="Email"
              placeholder="Email"
              name="username"
            />
          </div>
          <div className="mb-2">
            <input
              {...register("password")}
              type="password"
              placeholder="Senha"
              name="password"
            />
          </div>
          <button className="btn">Fazer Login</button>
        </form>
      </div>
      
    </>
  );
};

export default Login;
