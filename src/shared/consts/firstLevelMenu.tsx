import CoursesIcon from '../assets/icons/hat.svg'
import { FirstLevelMenuItem } from '../types/menu'
import { Icon } from '../ui/Icon'
// import BooksIcon from '../assets/icons/book.svg'
// import ServicesIcon from '../assets/icons/cloud.svg'
// import ProductsIcon from '../assets/icons/product.svg'
import { TopLevelCategory } from '../types/page'

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    icon: <Icon Svg={CoursesIcon} />,
    id: TopLevelCategory.Courses,
    name: 'Курсы',
    route: 'courses',
  },
  // {
  //   route: 'services',
  //   name: 'Сервисы',
  //   icon: <Icon Svg={ServicesIcon} />,
  //   id: TopLevelCategory.Services,
  // },
  // {
  //   route: 'books',
  //   name: 'Книги',
  //   icon: <Icon Svg={BooksIcon} />,
  //   id: TopLevelCategory.Books,
  // },
  // {
  //   route: 'products',
  //   name: 'Товары',
  //   icon: <Icon Svg={ProductsIcon} />,
  //   id: TopLevelCategory.Products,
  // },
]
