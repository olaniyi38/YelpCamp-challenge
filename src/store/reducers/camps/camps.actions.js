import { CAMPS_ACTION_TYPES } from "./camps.types";
import { createAction } from "../../../utils/redux/redux.utils";

function addReview(review, campName, camps) {
  const camp = camps.find(
    (camp) => camp.name.toLowerCase() === campName.toLowerCase()
  );

  if (camp) {
    return camps.map((camp) => {
      if (camp.name.toLowerCase() === campName.toLowerCase()) {
        let reviews = camp.reviews;
        return {
          ...camp,
          reviews: [...reviews, review ],
        };
      } else {
        return camp;
      }
    });
  }
}

function deleteReview(review, campName, camps) {
  const camp = camps.find(
    (camp) => camp.name.toLowerCase() === campName.toLowerCase()
  );
  if (camp) {
    return camps.map((camp) => {
      if (camp.name.toLowerCase() === campName.toLowerCase()) {
        let newReviews = camp.reviews.filter(
          (campReview) =>
            review.content.toLowerCase() !== campReview.content.toLowerCase()
        );
        return {
          ...camp,
          reviews: newReviews,
        };
      } else {
        return camp;
      }
    });
  }
}

export const fetchCampsStart = () =>
  createAction(CAMPS_ACTION_TYPES.FETCH_CAMPS_START);

export const fetchCampsSuccess = (camps) =>
  createAction(CAMPS_ACTION_TYPES.FETCH_CAMPS_SUCCESS, camps);

export const fetchCampsFailed = (error) =>
  createAction(CAMPS_ACTION_TYPES.FETCH_CAMPS_FAILED, error);

export const uploadCampStart = (campData) =>
  createAction(CAMPS_ACTION_TYPES.UPLOAD_CAMP_START, campData);

export const uploadCampSuccess = () =>
  createAction(CAMPS_ACTION_TYPES.UPLOAD_CAMP_SUCCESS);

export const uploadCampFailed = (error) =>
  createAction(CAMPS_ACTION_TYPES.UPLOAD_CAMP_FAILED, error);

export const uploadReviewStart = (reviewData, campName) =>
  createAction(CAMPS_ACTION_TYPES.UPLOAD_REVIEW_START, {
    reviewData,
    campName,
  });

export const uploadReviewSuccess = (review, campName, camps) => {
  const newCampData = addReview(review, campName, camps);
  return createAction(CAMPS_ACTION_TYPES.UPLOAD_REVIEW_SUCCESS, newCampData);
};

export const uploadReviewFailed = (error) =>
  createAction(CAMPS_ACTION_TYPES.DELETE_REVIEW_FAILED, error);

export const deleteReviewStart = (reviewData, campName) =>
  createAction(CAMPS_ACTION_TYPES.DELETE_REVIEW_START, {
    reviewData,
    campName,
  });

export const deleteReviewSuccess = (review, campName, camps) => {
  const newCampData = deleteReview(review, campName, camps);
  return createAction(CAMPS_ACTION_TYPES.DELETE_REVIEW_SUCCESS, newCampData);
};

export const deleteReviewFailed = (error) =>
  createAction(CAMPS_ACTION_TYPES.DELETE_REVIEW_FAILED, error);
