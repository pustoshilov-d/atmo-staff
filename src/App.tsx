import { getPeopleFilters } from '@views/ViewMain/components/PanelPeople/helpers'
import { ViewNotLoaded } from '@views/ViewNotLoaded'
import bridge, { AppearanceType, UserInfo } from '@vkontakte/vk-bridge'
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  ModalRoot,
  Root,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { FC, useEffect, useState } from 'react'
import { ModalFilterCustom, ModalPeopleFilters } from './components/Modals'
import { ePeopleSort } from './components/Modals/enums'
import { Popout } from './components/Popuots'
import { getGsheetsData } from './shared/api/gsheets'
import { REACT_APP_VK_ATMOMY_GROUP_ID } from './shared/consts'
import { eModalIds, eViewIds } from './shared/enums'
import { iChat, iFilter, iMap, iPerson, iSort, iStat } from './shared/types'
import { ViewBlock } from './views/ViewBlock'
import { ViewLoader } from './views/ViewLoader'
import { ViewMain } from './views/ViewMain'

const App: FC = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark')
  const [activeView, setActiveView] = useState<eViewIds>(eViewIds.Loader)

  const [activeModal, setActiveModal] = useState<eModalIds | string | null>()
  const [peopleFilter, setPeopleFilter] = useState<iFilter | null>(null)
  const [peopleSort, setPeopleSort] = useState<iSort | null>(ePeopleSort.SURNAME)
  const [modalHistory, setModalHistory] = useState<eModalIds[]>([])
  const [isPopout, setIsPopout] = useState<boolean>(false)

  const [fetchedUser, setFetchedUser] = useState<UserInfo>()
  const [persons, setPersons] = useState<iPerson[]>([])
  const [chats, setChats] = useState<iChat[]>([])
  const [stats, setStats] = useState<iStat[]>([])
  const [maps, setMaps] = useState<iMap[]>([])
  const [curPerson, setCurPerson] = useState<iPerson>()

  const { sizeX } = useAdaptivityConditionalRender()

  useEffect(() => {
    bridge.subscribe((res) => {
      if (res.detail.type === 'VKWebAppUpdateConfig') {
        // TODO: where stand scheme
        // setAppearance(res.detail.data.scheme)
      }
    })

    async function fetchData() {
      console.log(new Date().toTimeString(), 'App.fetchData hook called')
      try {
        let fetchedUserToSet = await bridge.send('VKWebAppGetUserInfo')
        let groupInfo = await bridge.send('VKWebAppGetGroupInfo', {
          group_id: REACT_APP_VK_ATMOMY_GROUP_ID,
        })

        if (!fetchedUserToSet || groupInfo.is_member === 1) {
          console.log(new Date().toTimeString(), 'Access denied')
          setActiveView(eViewIds.Block)
        } else {
          console.log(new Date().toTimeString(), 'Access allowed')

          let [personsToSet, statsToSet, chatsToSet, mapsToSet] = await getGsheetsData()
          console.log(new Date().toTimeString(), 'getGsheetsData processed')
          console.log({ personsToSet }, { statsToSet }, { chatsToSet }, { mapsToSet })
          let curPersonToSet = personsToSet.filter((person) => person.vk_id === fetchedUserToSet?.id)[0] || undefined
          setFetchedUser(fetchedUserToSet)
          setCurPerson(curPersonToSet)
          setPersons(personsToSet)
          setStats(statsToSet)
          setChats(chatsToSet)
          setMaps(mapsToSet)
          setActiveView(eViewIds.Main)
          console.log(new Date().toTimeString(), 'App.fetchData hook processed')
        }
      } catch (error) {
        console.log(new Date().toTimeString(), 'App.fetchData hook error', error)
        setActiveView(eViewIds.NotLoaded)
      }
    }

    fetchData()
  }, [])

  const changeActiveModal = (activeModal: eModalIds | string | null) => {
    let localModalHistory: eModalIds[] = modalHistory ? modalHistory : []

    if (!activeModal) {
      localModalHistory = []
    } else if (modalHistory.includes(activeModal as unknown as eModalIds)) {
      localModalHistory = localModalHistory.splice(
        0,
        localModalHistory.indexOf(activeModal as unknown as eModalIds) + 1
      )
    } else {
      localModalHistory.push(activeModal as unknown as eModalIds)
    }

    setActiveModal(activeModal)
    setModalHistory(localModalHistory)
  }

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2])
  }

  const modals = (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
      <ModalPeopleFilters
        id={eModalIds.PeopleFilters}
        onClose={modalBack}
        changeActiveModal={changeActiveModal}
        stats={stats}
        peopleSort={peopleSort}
        setPeopleSort={setPeopleSort}
        peopleFilter={peopleFilter}
        setPeopleFilter={setPeopleFilter}
        sizeX={sizeX}
      />
      {stats &&
        getPeopleFilters({ stats }).map((filter) => {
          return (
            <ModalFilterCustom
              id={filter.y_en_label}
              onClose={modalBack}
              changeActiveModal={changeActiveModal}
              sizeX={sizeX}
              filter={filter}
              peopleFilter={peopleFilter}
              setPeopleFilter={setPeopleFilter}
            />
          )
        })}
    </ModalRoot>
  )

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modals} popout={isPopout ? Popout : null}>
            <SplitCol>
              <Root activeView={activeView}>
                <ViewBlock id={eViewIds.Block} />
                <ViewNotLoaded id={eViewIds.NotLoaded} />
                <ViewLoader id={eViewIds.Loader} />
                <ViewMain
                  id={eViewIds.Main}
                  fetchedUser={fetchedUser}
                  setActiveModal={setActiveModal}
                  setIsPopout={setIsPopout}
                  stats={stats}
                  chats={chats}
                  maps={maps}
                  persons={persons}
                  curPerson={curPerson}
                  peopleSort={peopleSort}
                  setPeopleSort={setPeopleSort}
                  peopleFilter={peopleFilter}
                  setPeopleFilter={setPeopleFilter}
                />
              </Root>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
