import bridge, { AppearanceType, UserInfo } from '@vkontakte/vk-bridge'
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  ModalRoot,
  Root,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
  View,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { FC, ReactElement, useEffect, useState } from 'react'
import { PanelChats } from './panels/main/chats'
import { PanelHome } from './panels/main/home'
import { PanelMap } from './panels/main/map'
import { PanelMatch } from './panels/main/match'
import { PanelPeople } from './panels/main/people'
import { FilterModal, FilterModalCountries } from './panels/main/people/FilterModals'
import { PanelStats } from './panels/main/stats'

const App: FC = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark')
  const [activeView, setActiveView] = useState<string>('main')
  const [activePanel, setActivePanel] = useState<string>('home')
  const [activeModal, setActiveModal] = useState<string>()
  const [modalHistory, setModalHistory] = useState<string[]>([])
  const [popout, setPopout] = useState<ReactElement | null>(<ScreenSpinner size="large" />)

  const [fetchedUser, setUser] = useState<UserInfo>()
  const { sizeX } = useAdaptivityConditionalRender()

  useEffect(() => {
    bridge.subscribe((res) => {
      if (res.detail.type === 'VKWebAppUpdateConfig') {
        // TODO: where stand scheme
        // setAppearance(res.detail.data.scheme)
      }
    })

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      setUser(user)
      setPopout(null)
    }
    fetchData()
  }, [])

  const changeActiveModal = (activeModal: string) => {
    let localModalHistory: string[] = modalHistory ? modalHistory : []

    if (!activeModal) {
      localModalHistory = []
    } else if (modalHistory.includes(activeModal)) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1)
    } else {
      localModalHistory.push(activeModal)
    }

    setActiveModal(activeModal)
    setModalHistory(localModalHistory)
  }

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2])
  }

  const modals = (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
      <FilterModal onClose={modalBack} changeActiveModal={changeActiveModal} sizeX={sizeX} />
      <FilterModalCountries onClose={modalBack} changeActiveModal={changeActiveModal} sizeX={sizeX} />
    </ModalRoot>
  )

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modals}>
            <SplitCol>
              <Root activeView={activeView}>
                {/* <ViewBlock />
                <ViewLoader /> */}
                <View activePanel={activePanel} id="main">
                  <PanelHome
                    id="home"
                    setActivePanel={setActivePanel}
                    setActiveModal={setActiveModal}
                    fetchedUser={fetchedUser}
                  />
                  <PanelPeople
                    id="people"
                    setActivePanel={setActivePanel}
                    setActiveModal={setActiveModal}
                    fetchedUser={fetchedUser}
                  />
                  <PanelMap
                    id="map"
                    setActivePanel={setActivePanel}
                    setActiveModal={setActiveModal}
                    fetchedUser={fetchedUser}
                  />
                  <PanelMatch
                    id="match"
                    setActivePanel={setActivePanel}
                    setActiveModal={setActiveModal}
                    fetchedUser={fetchedUser}
                  />
                  <PanelStats id="stats" setActivePanel={setActivePanel} setActiveModal={setActiveModal} />
                  <PanelChats id="chats" setActivePanel={setActivePanel} setActiveModal={setActiveModal} />
                </View>
              </Root>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
