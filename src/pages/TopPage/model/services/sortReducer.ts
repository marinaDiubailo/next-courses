import { Sort } from '@/features/ProductsSort';
import { ProductModel } from '@/shared/types/product';

export type SortActions =
  | { type: Sort.Price }
  | { type: Sort.Rating }
  | { type: 'reset'; initialState: ProductModel[] };

export interface SortReducerState {
  sort: Sort;
  products: ProductModel[];
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions,
): SortReducerState => {
  switch (action.type) {
    case Sort.Rating:
      return {
        sort: Sort.Rating,
        products: state.products.sort(
          (a, b) => (a.initialRating > b.initialRating ? -1 : 1), // от большего к меньшему
        ),
      };
    case Sort.Price:
      return {
        sort: Sort.Price,
        products: state.products.sort(
          (a, b) => (a.price > b.price ? 1 : -1), // от меньшего к большему
        ),
      };
    case 'reset':
      return {
        sort: Sort.Rating,
        products: action.initialState,
      };
    default:
      return state;
  }
};
