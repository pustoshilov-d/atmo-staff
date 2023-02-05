import { iFilter, iSort } from '@src/shared/types'

export const ePeopleSort: { [key: string]: iSort | null } = {
  NAME: { key: 'name', order: 1 } as unknown as iSort,
  SURNAME: { key: 'surname', order: 1 } as unknown as iSort,
  SHVA_YEAR_S: { key: 'shva_year_s', order: 1 } as unknown as iSort,
  SHVA_YEAR_S_DESC: { key: 'shva_year_s', order: -1 } as unknown as iSort,
  ALL_YEARS_SMENY_DESC: { key: 'all_years_smeny', order: -1 } as unknown as iSort,
  ACHIEVEMENTS_COUNT_DESC: { key: 'achievements.count', order: -1 } as unknown as iSort,
}

export const ePeopleFilter: { [key: string]: iFilter | null } = {
  SEX_M: { key: 'sex', value: 'м' },
  SEX_F: { key: 'sex', value: 'ж' },
  IS_PO_ACTIVE_TRUE: { key: 'is_po_active', value: true },
  IS_PO_ACTIVE_FALSE: { key: 'is_po_active', value: false },
}
