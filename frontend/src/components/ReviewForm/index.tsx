import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Review } from "../../types/review";
import { requestBackend } from "../../util/requests";

import "./styles.css";

type Props = {
  movieId: string;
  onIsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onIsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/reviews",
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue("text", "");
        onIsertReview(response.data);
      })
      .catch((error) => {
        console.log("ERRO AO SALVAR !!", error);
      });
  };
  return (
    <div className="review-text-container">
      <div className="review-text">
        <div className="review-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text">
              <input
                {...register("text", {
                  required: "Campo obrigatório !",
                })}
                type="text"
                name="text"
                placeholder="Deixe sua avaliação aqui"
              />
              <div>{errors.text?.message}</div>
            </div>
            <button className="button-confirm" type="submit">
              SALVAR AVALIAÇÃO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
