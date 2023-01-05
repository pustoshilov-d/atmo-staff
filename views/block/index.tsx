import { Panel, PanelHeader, View } from '@vkontakte/vkui'
import { FC } from 'react'
import { APP_TITLE } from '../../consts'
import { CustomViewProps } from '../../types'

export const ViewBlock: FC<CustomViewProps> = () => (
  <View activePanel="block" id="block">
    <Panel id="block">
      <PanelHeader separator={false}>{APP_TITLE}</PanelHeader>
      <p>Загружается</p>
    </Panel>
  </View>
)
