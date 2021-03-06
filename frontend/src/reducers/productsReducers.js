import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  REMOVE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  REMOVE_REVIEW_REQUEST,
  REMOVE_REVIEW_SUCCESS,
  REMOVE_REVIEW_FAIL,
  REMOVE_REVIEW_RESET,
} from "../constants/productConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST: {
      return {
        loading: true,
        products: [],
      };
    }

    case ALL_PRODUCTS_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        filteredProductsCount: action.payload.filteredProductsCount,
        resPerPage: action.payload.resPerPage,
      };
    }

    case ALL_PRODUCTS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case ADMIN_PRODUCTS_REQUEST: {
      return {
        loading: true,
        products: [],
      };
    }

    case ADMIN_PRODUCTS_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
      };
    }

    case ADMIN_PRODUCTS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case PRODUCT_DETAILS_SUCCESS: {
      return {
        loading: false,
        product: action.payload.product,
      };
    }

    case PRODUCT_DETAILS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case NEW_REVIEW_SUCCESS: {
      return {
        loading: false,
        success: action.payload,
      };
    }

    case NEW_REVIEW_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case NEW_REVIEW_RESET: {
      return {
        ...state,
        success: false,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case NEW_PRODUCT_SUCCESS: {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    }

    case NEW_PRODUCT_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case NEW_PRODUCT_RESET: {
      return {
        ...state,
        success: false,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case REMOVE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    }

    case REMOVE_PRODUCT_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case REMOVE_PRODUCT_RESET: {
      return {
        ...state,
        isDeleted: false,
      };
    }

    case UPDATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    }

    case UPDATE_PRODUCT_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case UPDATE_PRODUCT_RESET: {
      return {
        ...state,
        isUpdated: false,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_REVIEWS_SUCCESS: {
      return {
        loading: false,
        reviews: action.payload,
      };
    }

    case GET_REVIEWS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_REVIEW_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case REMOVE_REVIEW_SUCCESS: {
      return {
        loading: false,
        isDeleted: action.payload,
      };
    }

    case REMOVE_REVIEW_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    case REMOVE_REVIEW_RESET: {
      return {
        ...state,
        isDeleted: false,
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};
