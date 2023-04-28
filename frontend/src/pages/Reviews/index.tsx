import { AxiosRequestConfig } from "axios";
import ReviewForm from "../../components/ReviewForm";
import ReviewListing from "../../components/ReviewListing";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review } from "../../types/review";
import { requestBackend } from "../../util/requests";
import MovieDetails from "../MovieDetails";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

import "./styles.css";

type urlParams = {
  movieId: string;
};

const Reviews = () => {
  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  const { authContextData } = useContext(AuthContext);
  const isMember =
    authContextData.tokenData?.authorities.includes("ROLE_MEMBER");

  console.log(movieId);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}/reviews/`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleIsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="detalhe">
      <MovieDetails />
      <>
        {isMember && (
          <ReviewForm movieId={movieId} onIsertReview={handleIsertReview} />
        )}
      </>
      <div className="listing">
        <ReviewListing reviews={reviews} />
      </div>
    </div>
  );
};

export default Reviews;
