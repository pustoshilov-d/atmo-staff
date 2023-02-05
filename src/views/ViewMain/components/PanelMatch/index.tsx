import { Group, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { iCustomPanelProps } from '../types'

export const PanelMatch: FC<iCustomPanelProps> = ({ setActivePanel, goHome, ...rest }) => (
  <Panel {...rest}>
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
      AtmoMatch
    </PanelHeader>
    <Group>
      <SimpleCell>Будет контент!</SimpleCell>
    </Group>
  </Panel>
)
