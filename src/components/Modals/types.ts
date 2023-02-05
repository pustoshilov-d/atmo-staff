import { eModalIds } from "@src/shared/enums"
import { iStat, iSort, iFilter, iStatRow } from "@src/shared/types"
import { ModalPageProps } from "@vkontakte/vkui"

export interface iCustomModalProps extends ModalPageProps {
  id: eModalIds | string
  onClose: () => void
  changeActiveModal: (activeModal: eModalIds | string | null) => void
  sizeX: any
}

export interface iModalPeopleFiltersProps extends iCustomModalProps {
  stats: iStat[]
  peopleSort: iSort | null
  setPeopleSort: (v: iSort | null) => void
  peopleFilter: iFilter | null
  setPeopleFilter: (v: iFilter | null) => void
}

export interface iModalFilterCustomProps extends iCustomModalProps {
  filter: iStatRow
  peopleFilter: iFilter | null
  setPeopleFilter: (v: iFilter | null) => void
}
