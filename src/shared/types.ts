export interface iGsheetsResDTO {
  people: iPersonDTO[]
  stats: iStatDTO[]
  chats: iChatDTO[]
  map: iMapDTO[]
}

export interface iMapDTO {
  title: string
  radius: number
  coord: number[]
  count: number
  levels: number
}

export interface iMap {
  title: string
  radius: number
  coord: number[]
  count: number
  levels: number
}

export interface iPersonDTO {
  perepis_year?: number
  vk_id: number
  name: string
  surname: string
  nickname?: string
  name_status?: string
  is_po_active: string
  is_student: string
  sex: string
  shva_year_s?: string
  inst_link?: string
  tg_link?: string
  education_org?: string
  education_spec?: string
  work_spec?: string
  interests?: string[]
  prof_can?: string[]
  prof_want?: string[]
  prof_teach?: string[]
  prof_learn?: string[]
  all_years_smeny?: number
  achievements?: iAchievementsDTO
  atmo_match?: iMatchDTO[]
  location_coord: number[]
}

export interface iPerson {
  photo?: string
  perepis_year?: number
  vk_id: number
  name: string
  surname: string
  nickname?: string
  name_status?: string
  is_po_active: boolean
  is_student: boolean
  sex: 'м' | 'ж'
  shva_year_s?: string
  inst_link?: string
  tg_link?: string
  education_org?: string
  education_spec?: string
  work_spec?: string
  interests?: string[]
  prof_can?: string[]
  prof_want?: string[]
  prof_teach?: string[]
  prof_learn?: string[]
  all_years_smeny?: number
  achievements?: iAchievements
  atmo_match?: iMatch[]
  location_coord: number[]
}

export interface iAchievementsDTO {
  history?: string[]
  medals?: string[]
  count?: number
  en_titles?: string[]
  ru_titles?: string[]
}

export interface iAchievements {
  history?: string[]
  medals?: string[]
  count?: number
  en_titles?: string[]
  ru_titles?: string[]
}

export interface iMatchDTO {
  values: {
    vk_id: number
    percent: number
  }[]
  en_name: string
  ru_name: string
  descr: string
  type: string
}

export interface iMatch {
  values: {
    vk_id: number
    percent: number
  }[]
  en_name: string
  ru_name: string
  descr: string
  type: string
}

export interface iStatDTO {
  stat_id: string
  rows: {
    stat_id: string
    y_ru_label: string
    y_en_label: string
    values: {
      header: number | string
      value: number
    }[]
  }[]
  stat_name: string
  x_label: string
}

export interface iStat {
  stat_id: string
  rows: iStatRow[]
  stat_name: string
  x_label: string
}

export interface iStatRow {
  stat_id: string
  y_ru_label: string
  y_en_label: string
  values: iStatRowValue[]
}

export interface iStatRowValue {
  header: number | string
  value: number
}

export interface iChatDTO {
  is_active: boolean
  order: number
  name: string
  descr: string
  link: string
}

export interface iChat {
  is_active: boolean
  order: number
  name: string
  descr: string
  link: string
}

export interface iFilter {
  key: string
  value: string | number | boolean
}

export interface iSort {
  key: string
  order: 1 | -1
}
