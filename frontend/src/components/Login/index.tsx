import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getTokenData, requestBackendLogin, saveAuthData } from "../../util/requests";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((Response) => {
        saveAuthData(Response.data);

        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        })
        history.replace("/movie");
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
        <div className="alert alert-danger">Erro na tentativa de Login</div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("username", {
                required: "Campo obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="Email"
              className={`form-control base-input ${
                errors.username ? "is-invalid" : ""
              }`}
              placeholder="Email"
              name="username"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>

          <div className="mb-2">
            <input
              {...register("password", {
                required: "Campo obrigatório",
              })}
              type="password"
              className={`form-control base-input ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Senha"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>

          <button className="btn">Fazer Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
