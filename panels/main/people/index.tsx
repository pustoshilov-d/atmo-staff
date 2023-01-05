import { Group, Panel, PanelHeader, PanelHeaderBack, Search, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { MODAL_PEOPLE_FILTERS } from '../../../emun'
import { CustomPanelProps } from '../../../types'

export const PanelPeople: FC<CustomPanelProps> = ({ setActivePanel, setActiveModal }) => (
  <Panel id="people">
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActivePanel('home')} />}>
      Список отряда
    </PanelHeader>
    <Group>
      <Search />
      <SimpleCell>Будет контент!</SimpleCell>
      <SimpleCell onClick={() => setActiveModal(MODAL_PEOPLE_FILTERS)}></SimpleCell>
    </Group>
  </Panel>
)
