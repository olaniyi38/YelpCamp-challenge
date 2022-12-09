import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { CAMPS_ACTION_TYPES } from "./camps.types";
import {
  getDocumentsFromDb,
  uploadDocumentsToDB,
  uploadReviewToDb,
  uploadImageToDb,
  deleteItemFromArray,
} from "../../../utils/firebase/firebase.utils";
import {
  fetchCampsFailed,
  fetchCampsSuccess,
  uploadCampSuccess,
  uploadCampFailed,
  uploadReviewFailed,
  uploadReviewSuccess,
  deleteReviewSuccess,
  deleteReviewFailed,
} from "./camps.actions";
import { toast, Flip } from "react-toastify";

function* fetchCamps() {
  try {
    const camps = yield call(getDocumentsFromDb, "camps");
    yield put(fetchCampsSuccess(camps));
  } catch (error) {
    yield put(fetchCampsFailed(error));
    yield call(toast.success("" + error.message));
  }
}

function* uploadCamp(action) {
  const { name, price, imageFile, description, submittedBy } = action.payload;
  try {
    const imageUrl = yield call(uploadImageToDb, imageFile);
    yield call(
      uploadDocumentsToDB,
      [
        {
          name,
          price,
          description,
          imageUrl: imageUrl,
          reviews: [],
          submittedBy,
        },
      ],
      "camps"
    );
    yield put(uploadCampSuccess());
    yield call(toast.success, "Campground added");
  } catch (error) {
    yield put(uploadCampFailed(error));
    yield call(toast.error, "" + error.message);
  }
}

function* uploadReview(action) {
  const { reviewData, campName } = action.payload;
  const state = yield select();

  try {
    yield call(uploadReviewToDb, reviewData, "camps", campName.toLowerCase());
    yield put(uploadReviewSuccess(reviewData, campName, state.camps.camps));
    yield call(toast.success, "Comment Added");
  } catch (error) {
    yield put(uploadReviewFailed(error));
    yield call(toast.error, "" + error.message);
  }
}

function* deleteReview(action) {
    const { reviewData, campName } = action.payload;
    console.log(reviewData);
  const state = yield select();
  try {
    yield call(deleteItemFromArray, "camps", campName, reviewData);
    yield put(deleteReviewSuccess(reviewData, campName, state.camps.camps));
  } catch (error) {
    yield put(deleteReviewFailed(error));
  }
}

function* onFetchCamps() {
  yield takeLatest(CAMPS_ACTION_TYPES.FETCH_CAMPS_START, fetchCamps);
}

function* onUploadCamp() {
  yield takeLatest(CAMPS_ACTION_TYPES.UPLOAD_CAMP_START, uploadCamp);
}

function* onUploadReview() {
  yield takeLatest(CAMPS_ACTION_TYPES.UPLOAD_REVIEW_START, uploadReview);
}
function* onDeleteReview() {
  yield takeLatest(CAMPS_ACTION_TYPES.DELETE_REVIEW_START, deleteReview);
}

export function* campsSaga() {
  yield all([
    call(onFetchCamps),
    call(onUploadCamp),
    call(onUploadReview),
    call(onDeleteReview),
  ]);
}
