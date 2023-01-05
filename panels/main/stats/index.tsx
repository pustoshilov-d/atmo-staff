import { Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { CustomPanelProps } from '../../../types'

export const PanelStats: FC<CustomPanelProps> = ({ setActivePanel }) => (
  <Panel id="stats">
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActivePanel('home')} />}>
      Статистика
    </PanelHeader>
    <Group>
      <SimpleCell>Будет контент!</SimpleCell>
    </Group>
  </Panel>
)
