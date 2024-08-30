export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export interface TopPageAdvantage {
  _id: string
  description: string
  title: string
}

export interface HhData {
  _id: string
  count: number
  juniorSalary: number
  middleSalary: number
  seniorSalary: number
  updatedAt: Date
}

export interface TopPageModel {
  _id: string
  advantages?: TopPageAdvantage[]
  alias: string
  category: string
  createdAt: Date
  firstCategory: TopLevelCategory
  hh?: HhData
  metaDescription: string
  metaTitle: string
  secondCategory: string
  seoText?: string
  tags: string[]
  tagsTitle: string
  title: string
  updatedAt: Date
}
