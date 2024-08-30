/* eslint-disable @next/next/no-img-element */
import React from 'react'

import { MenuGrid } from '@/entities/Menu'
import { ScrollArea } from '@/shared/ui'

import s from './HomePage.module.scss'

import { schools } from '../../model/consts/schools'
import { SchoolPreview } from '../SchoolPreview/SchoolPreview'
export const HomePage = () => {
  return (
    <main className={s.root}>
      <h1 className={s.title}>Лучшие курсы онлайн</h1>
      <ScrollArea className={s.scrollArea}>
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
