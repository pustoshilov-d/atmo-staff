import { Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { CustomPanelProps } from '../../../types'

export const PanelChats: FC<CustomPanelProps> = ({ setActivePanel }) => (
  <Panel id="chats">
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActivePanel('home')} />}>
      Чаты отряда
    </PanelHeader>
    <Group>
      <SimpleCell>Будет контент!</SimpleCell>
    </Group>
  </Panel>
)
