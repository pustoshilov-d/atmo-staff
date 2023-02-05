import {
  REACT_APP_APP_TITLE,
  REACT_APP_ATMOLIB_LINK,
  REACT_APP_PEREPIS_LINK,
  REACT_APP_VK_ATMOSTAF_GROUP_ID,
  WARNING_GRADIENT,
} from '@shared/consts'
import { ePanelIds } from '@shared/enums'
import {
  Icon24ExternalLinkOutline,
  Icon28BookSpreadOutline,
  Icon28ChatsOutline,
  Icon28Hearts2Outline,
  Icon28HelpCircleOutline,
  Icon28LocationMapOutline,
  Icon28StatisticsOutline,
  Icon28UsersOutline,
} from '@vkontakte/icons'
import { Avatar, Banner, Button, Group, Panel, PanelHeader, SimpleCell, Subhead, Text, Title } from '@vkontakte/vkui'
import { FC } from 'react'

import AvatartPathArcticfox from '@assets/img/avatartArcticfox.svg'
import React from 'react'
import '../../index.css'
import { iCustomPanelProps } from '../types'

export const PanelHome: FC<iCustomPanelProps> = ({
  setActivePanel,
  setActiveModal,
  fetchedUser,
  curPerson,
  ...rest
}) => (
  <Panel {...rest}>
    <PanelHeader>{REACT_APP_APP_TITLE}</PanelHeader>
    {fetchedUser && (
      <SimpleCell key={fetchedUser.id} disabled>
        <div className="person-card__header">
          <Avatar className="person-card__header-photo" size={48} src={fetchedUser.photo_200 || AvatartPathArcticfox} />
          <div className="person-card__header-container">
            <div className="person-card__header-title">
              <Title level="2">{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</Title>
            </div>
            <Subhead className="person-card__header-year">Пед.отряд «Атмосфера»</Subhead>
          </div>
        </div>
      </SimpleCell>
    )}
    {fetchedUser && !curPerson && (
      <Banner
        before={
          <Avatar size={28} style={{ backgroundImage: WARNING_GRADIENT }}>
            <Text style={{ color: '#fff' }}>!</Text>
          </Avatar>
        }
        subheader={
          <React.Fragment>
            {`${fetchedUser.first_name}, похоже, ты никогда не ${
              fetchedUser.sex === 1 ? 'заполняла' : 'заполнял'
            } Перепись вожатых «Атмосферы». Сделай это, чтобы добавить информацию о
                себе в Картотеку, пользоваться всеми её функциями и при желании 
                получить статус активного вожатого на следующий год.`}
          </React.Fragment>
        }
        actions={
          <Button mode="link" href={REACT_APP_PEREPIS_LINK} target="_blank" rel="noopener">
            Заполнить
          </Button>
        }
      />
    )}
    {curPerson && !curPerson.is_po_active && (
      <Banner
        before={
          <Avatar size={28} style={{ backgroundImage: WARNING_GRADIENT }}>
            <Text style={{ color: '#fff' }}>!</Text>
          </Avatar>
        }
        subheader={
          <React.Fragment>
            {`${curPerson.name}, похоже, ты не ${
              curPerson.sex === 'ж' ? 'заполняла' : 'заполнял'
            } Перепись вожатых «Атмосферы» в этом году. Сделай это, чтобы добавить информацию о
            себе в Картотеку, пользоваться всеми её функциями и при желании 
            получить статус активного вожатого на следующий год.`}
          </React.Fragment>
        }
        actions={
          <Button mode="link" href={REACT_APP_PEREPIS_LINK} target="_blank" rel="noopener">
            Заполнить
          </Button>
        }
      />
    )}
    <Group>
      <SimpleCell expandable before={<Icon28UsersOutline />} onClick={() => setActivePanel(ePanelIds.People)}>
        Вожатые
      </SimpleCell>
      <SimpleCell expandable before={<Icon28Hearts2Outline />} onClick={() => setActivePanel(ePanelIds.Match)}>
        AtmoMatch
      </SimpleCell>
      <SimpleCell expandable before={<Icon28LocationMapOutline />} onClick={() => setActivePanel(ePanelIds.Map)}>
        Карта отряда
      </SimpleCell>
      <SimpleCell expandable before={<Icon28StatisticsOutline />} onClick={() => setActivePanel(ePanelIds.Stats)}>
        Статистика
      </SimpleCell>
      <SimpleCell expandable before={<Icon28ChatsOutline />} onClick={() => setActivePanel(ePanelIds.Chats)}>
        Чаты отряда
      </SimpleCell>
      <SimpleCell
        before={<Icon28BookSpreadOutline />}
        after={<Icon24ExternalLinkOutline width={16} height={16} />}
        href={REACT_APP_ATMOLIB_LINK}
        target="_blank"
        rel="noopener"
      >
        Библиотека
      </SimpleCell>
    </Group>
    <Group>
      <SimpleCell
        before={<Icon28HelpCircleOutline />}
        after={<Icon24ExternalLinkOutline width={16} height={16} />}
        href={`https://vk.me/club${REACT_APP_VK_ATMOSTAF_GROUP_ID}`}
        target="_blank"
        rel="noopener"
      >
        Написать разработчикам
      </SimpleCell>
    </Group>
  </Panel>
)
