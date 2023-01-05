import { Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { CustomPanelProps } from '../../../types'

export const PanelMap: FC<CustomPanelProps> = ({ setActivePanel }) => (
  <Panel id="map">
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActivePanel('home')} />}>
      Карта отряда
    </PanelHeader>
    <Group>
      <SimpleCell>Будет контент!</SimpleCell>
    </Group>
  </Panel>
)
