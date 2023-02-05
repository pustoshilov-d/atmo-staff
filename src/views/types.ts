import { eModalIds, eViewIds } from '@src/shared/enums'
import { iChat, iFilter, iMap, iPerson, iSort, iStat } from '@src/shared/types'
import { UserInfo } from '@vkontakte/vk-bridge'
import { ViewProps } from '@vkontakte/vkui'

export interface iCustomViewProps extends Omit<ViewProps, 'activePanel'> {
  id: eViewIds
  fetchedUser?: UserInfo
}

export interface iNonAuthViewsProps extends iCustomViewProps {
  setActiveView?: (view: eViewIds) => void
}

export interface iMainViewProps extends iCustomViewProps {
  setActiveModal: (modalId: eModalIds | null) => void
  setIsPopout: (isPopout: boolean) => void
  stats: iStat[]
  chats: iChat[]
  maps: iMap[]
  persons: iPerson[]
  curPerson: iPerson | undefined
  peopleSort: iSort | null
  setPeopleSort: (v: iSort | null) => void
  peopleFilter: iFilter | null
  setPeopleFilter: (v: iFilter | null) => void
}
