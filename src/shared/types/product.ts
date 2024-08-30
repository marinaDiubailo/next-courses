export interface ProductCharacteristic {
  name: string
  value: string
}

export interface ReviewModel {
  _id: string
  createdAt: Date
  description: string
  name: string
  rating: number
  title: string
}

export interface ProductModel {
  __v: number
  _id: string
  advantages?: string
  categories: string[]
  characteristics: ProductCharacteristic[]
  createdAt: Date
  credit: number
  description: string
  disadvantages?: string
  image: string
  initialRating: number
  link: string
  oldPrice: number
  price: number
  reviewAvg?: number
  reviewCount: number
  reviews: ReviewModel[]
  tags: string[]
  title: string
  updatedAt: Date
}
