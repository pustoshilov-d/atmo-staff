import { UserInfo } from '@vkontakte/vk-bridge'
import { ModalPageProps, PanelProps, ViewProps } from '@vkontakte/vkui'

export interface CustomPanelProps extends PanelProps {
  id?: string
  setActivePanel: (panel: string) => void
  setActiveModal: (modal: string) => void
  fetchedUser?: UserInfo
}

export interface CustomViewProps extends ViewProps {
  // setActiveView: (view: string) => void
}

export interface CustomModalProps extends ModalPageProps {
  onClose: () => void
  changeActiveModal: (modal: string) => void
  sizeX: any
}
