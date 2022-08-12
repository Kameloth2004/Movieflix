import { useState } from "react";
import { useForm } from "react-hook-form";
import { requestBackendLogin } from "../../util/requests";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((Response) => {
        setHasError(false);
        console.log("SUCESSO", Response);
      })
      .catch((error) => {
        setHasError(true);
        console.log("ERRO", error);
      });
  };

  return (
    <>
      <h2>LOGIN</h2>
      {hasError && (
        <div className="alert alert-danger">
          Erro na tentativa de Login
        </div>
      )}

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
