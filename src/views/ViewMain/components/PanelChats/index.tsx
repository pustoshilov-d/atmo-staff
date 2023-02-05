import { Icon28ChatsOutline } from '@vkontakte/icons'
import { Group, IconButton, Panel, PanelHeader, PanelHeaderBack, SimpleCell } from '@vkontakte/vkui'
import { FC } from 'react'
import { iPanelChatsProps } from '../types'

export const PanelChats: FC<iPanelChatsProps> = ({ setActivePanel, goHome, chats, ...rest }) => (
  <Panel {...rest}>
    <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
      Чаты отряда
    </PanelHeader>
    <Group>
      {chats &&
        chats
          .filter((chat) => chat.is_active)
          .sort((a, b) => (a.order === b.order ? 0 : a.order > b.order ? 1 : 0))
          .map((chat) => (
            <SimpleCell
              // before={<Avatar size={48} src={getAvatarUrl('user_arthurstam')} />}
              after={
                <IconButton target="_blank" rel="noopener" href={chat.link}>
                  <Icon28ChatsOutline />
                </IconButton>
              }
              subtitle={chat.descr}
            >
              {chat.name}
            </SimpleCell>
          ))}
    </Group>
  </Panel>
)
