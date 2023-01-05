import {
  Icon28ChatsOutline,
  Icon28LocationMapOutline,
  Icon28MessageOutline,
  Icon28StatisticsOutline,
  Icon28UsersOutline,
} from '@vkontakte/icons'
import { Avatar, Group, Link, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { APP_TITLE } from '../../../consts'
import { CustomPanelProps } from '../../../types'

export const PanelHome: FC<CustomPanelProps> = ({ setActivePanel, fetchedUser }) => (
  <Panel id="home">
    <PanelHeader>{APP_TITLE}</PanelHeader>
    <Group>
      {fetchedUser && (
        <SimpleCell
          before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
          subtitle={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
        >
          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
        </SimpleCell>
      )}
      <SimpleCell expandable before={<Icon28UsersOutline />} onClick={() => setActivePanel('list')}>
        Список отряда
      </SimpleCell>
      <SimpleCell expandable before={<Icon28UsersOutline />} onClick={() => setActivePanel('match')}>
        AtmoMatch
      </SimpleCell>
      <SimpleCell expandable before={<Icon28LocationMapOutline />} onClick={() => setActivePanel('map')}>
        Карта отряда
      </SimpleCell>
      <SimpleCell expandable before={<Icon28StatisticsOutline />} onClick={() => setActivePanel('stats')}>
        Статистика
      </SimpleCell>
      <SimpleCell expandable before={<Icon28ChatsOutline />} onClick={() => setActivePanel('chats')}>
        Чаты отряда
      </SimpleCell>
    </Group>
    <Group>
      <Link href="https://vk.me/atmostafff" target="_blank">
        <SimpleCell expandable before={<Icon28MessageOutline />}>
          Написать разработчикам
        </SimpleCell>
      </Link>
    </Group>
  </Panel>
)
