import React from 'react'

import { MenuGrid } from '@/entities/Menu'
import { ScrollArea } from '@/shared/ui'

import s from './HomePage.module.scss'

import { schools } from '../../model/consts/schools'
import { ImageSlideshow } from '../ImageSlideshow/ImageSlideshow'
import { SchoolPreview } from '../SchoolPreview/SchoolPreview'
export const HomePage = () => {
  return (
    <main className={s.root}>
      <h1 className={s.title}>Лучшие курсы онлайн</h1>
      <ScrollArea className={s.scrollArea}>
        <div className={s.slideShow}>
          <div className={s.slidesContainer}>
            <ImageSlideshow />
          </div>

          <p>
            Найдите идеальный курс по вашим интересам — от программирования до иностранных языков.
            Учитесь у лучших преподавателей и прокачивайте свои навыки в удобное время.
            Присоединяйтесь к обучению сегодня!
          </p>
        </div>
        <section className={s.section}>
          <h2 className={s.subTitle}>
            Подборка лучших курсов и рейтинги, основанные на реальных отзывах.
          </h2>
          <MenuGrid />
        </section>
        <section className={s.section}>
          <h2 className={s.subTitle}>Популярные школы</h2>
          <ul className={s.list}>
            {schools.map((school, index) => (
              <li key={index}>
                <SchoolPreview {...school} />
              </li>
            ))}
          </ul>
        </section>
      </ScrollArea>
    </main>
  )
}
