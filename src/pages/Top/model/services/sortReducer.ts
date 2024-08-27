import type { ProductModel } from '@/shared/types/product'

import { Sort } from '@/features/ProductsSort'

export type SortActions =
  | { initialState: ProductModel[]; type: 'reset' }
  | { type: Sort.Price }
  | { type: Sort.Rating }

export interface SortReducerState {
  products: ProductModel[]
  sort: Sort
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  switch (action.type) {
    case Sort.Rating:
      return {
        products: state.products.sort(
          (a, b) => (a.initialRating > b.initialRating ? -1 : 1) // от большего к меньшему
        ),
        sort: Sort.Rating,
      }
    case Sort.Price:
      return {
        products: state.products.sort(
          (a, b) => (a.price > b.price ? 1 : -1) // от меньшего к большему
        ),
        sort: Sort.Price,
      }
    case 'reset':
      return {
        products: action.initialState,
        sort: Sort.Rating,
      }
    default:
      return state
  }
}
