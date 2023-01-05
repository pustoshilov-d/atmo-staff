import { Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { CustomPanelProps } from '../../../types'

export const PanelMatch: FC<CustomPanelProps> = ({ setActivePanel }) => (
  <Panel id="match">
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActivePanel('home')} />}>
      AtmoMatch
    </PanelHeader>
    <Group>
      <SimpleCell>Будет контент!</SimpleCell>
    </Group>
  </Panel>
)
