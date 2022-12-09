import {
    CAMPS_ACTION_TYPES
} from "./camps.types"

const INITIAL_STATE = {
    camps: [],
    isLoading: false,
    error: null
}

export const campsReducer = (state = INITIAL_STATE, action) => {
    const {
        type,
        payload
    } = action

    switch (type) {
        case CAMPS_ACTION_TYPES.FETCH_CAMPS_START:
            return {
                ...state, isLoading: true
            }
            case CAMPS_ACTION_TYPES.FETCH_CAMPS_SUCCESS:
                return {
                    ...state, camps: payload, isLoading: false
                }
                case CAMPS_ACTION_TYPES.FETCH_CAMPS_FAILED:
                    return {
                        ...state, isLoading: false, error: payload
                    }
                    case CAMPS_ACTION_TYPES.UPLOAD_CAMP_START:
                        return {
                            ...state, isLoading: true
                        }
                        case CAMPS_ACTION_TYPES.UPLOAD_CAMP_SUCCESS:
                            return {
                                ...state, isLoading: false
                            }
                            case CAMPS_ACTION_TYPES.UPLOAD_CAMP_FAILED:
                                return {
                                    ...state, isLoading: false, error: payload
                                }
                                case CAMPS_ACTION_TYPES.UPLOAD_REVIEW_START:
                                    return {
                                        ...state, isLoading: true
                                    }
                                    case CAMPS_ACTION_TYPES.UPLOAD_REVIEW_SUCCESS:
                                        return {
                                            ...state, camps: payload, isLoading: false
                                        }
                                        case CAMPS_ACTION_TYPES.UPLOAD_REVIEW_FAILED:
                                            return {
                                                ...state, isLoading: false, error: payload
                                            }
                                            case CAMPS_ACTION_TYPES.DELETE_REVIEW_START:
                                                return {
                                                    ...state, isLoading: true
                                                }
                                                case CAMPS_ACTION_TYPES.DELETE_REVIEW_SUCCESS:
                                                    return {
                                                        ...state, camps: payload, isLoading: false
                                                    }
                                                    case CAMPS_ACTION_TYPES.DELETE_REVIEW_FAILED:
                                                        return {
                                                            ...state, isLoading: false, error: payload
                                                        }
                                                        default:
                                                            return state
    }
}