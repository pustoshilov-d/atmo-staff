import { Panel, PanelHeader, View } from '@vkontakte/vkui'
import { FC } from 'react'
import { APP_TITLE } from '../../consts'
import { CustomViewProps } from '../../types'

export const ViewLoader: FC<CustomViewProps> = () => (
  <View activePanel="loader" id="loader">
    <Panel id="loader">
      <PanelHeader separator={false}>{APP_TITLE}</PanelHeader>
      <p>Загружается</p>
    </Panel>
  </View>
)
