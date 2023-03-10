import { eModalIds, ePanelIds } from '@shared/enums'
import useDidMountEffect from '@shared/hooks/useDidMountEffect'

import { ReactComponent as IconCollapse } from '@assets/img/collapse.svg'
import { ReactComponent as IconExpand } from '@assets/img/expand.svg'
import { ReactComponent as IconFilter } from '@assets/img/filter.svg'
import { ReactComponent as IconUnfilter } from '@assets/img/filter_x.svg'
import {
  FixedLayout,
  Footer,
  Group,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Search,
  Spacing,
  Spinner,
} from '@vkontakte/vkui'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import '../../index.css'
import { CHUNK_SIZE } from './consts'
import { filterPersons, searchPersons, shiftCurPerson, sortPersons } from './helpers'
import './index.css'
import { iPerson } from '@src/shared/types'
import { iPeoplePanelProps } from '../types'
import { PersonCard } from '@components/PersonCard'

export const PanelPeople: FC<iPeoplePanelProps> = ({
  fetchedUser,
  personsToSet,
  curPersonToSet,
  setPeopleSort,
  peopleSort,
  setPeopleFilter,
  peopleFilter,
  setActivePanel,
  setActiveModal,
  peopleSearch,
  setPeopleSearch,
  isPeopleCardsCollapsed,
  setIsPeopleCardsCollapsed,
  goHome,
  ...rest
}) => {
  const [persons, setPersons] = useState<iPerson[]>([])
  const [curPerson, setCurPerson] = useState<iPerson>()
  const [shownPersons, setShownPersons] = useState<iPerson[]>([])

  const [scrolledPersons, setScrolledPersons] = useState<iPerson[]>([])
  const [hasPersonsToScroll, setHasPersonsToScroll] = useState<boolean>(true)
  const [scrollChunkNum, setScrollChunkNum] = useState<number>(1)

  useEffect(() => {
    console.log(new Date().toTimeString(), 'fetchData hook called')
    let localPersons = personsToSet
    console.log({ localPersons }, { persons })
    setCurPerson(curPersonToSet)
    setPersons(localPersons)

    if (peopleSort) {
      localPersons = sortPersons({ persons: localPersons, ...peopleSort })
    }
    if (peopleFilter) {
      localPersons = filterPersons({ persons: localPersons, ...peopleFilter })
    }

    resetShownPersons(localPersons, curPersonToSet)
    console.log(new Date().toTimeString(), 'fetchData hook ended')
  }, [])

  useEffect(() => {
    window.onpopstate = () => {
      console.log('window.onpopstate hook called')
      setActivePanel(ePanelIds.Home)
    }
  })

  useDidMountEffect(() => {
    console.log(new Date().toTimeString(), 'peopleSort hook called')
    setPeopleSearch('')
    const localPersons = peopleSort ? sortPersons({ persons, ...peopleSort }) : persons
    resetShownPersons(localPersons)
    console.log(new Date().toTimeString(), 'peopleSort hook ended')
  }, [peopleSort])

  useDidMountEffect(() => {
    console.log(new Date().toTimeString(), 'peopleFilter hook called')
    setPeopleSearch('')
    const localPersons = peopleFilter ? filterPersons({ persons, ...peopleFilter }) : persons
    resetShownPersons(localPersons)
    console.log(new Date().toTimeString(), 'peopleFilter hook ended')
  }, [peopleFilter])

  useDidMountEffect(() => {
    console.log(new Date().toTimeString(), 'peopleSearch hook called')
    // setPeopleFilter(null)
    const localPersons = peopleSearch !== '' ? searchPersons({ persons, value: peopleSearch }) : persons
    resetShownPersons(localPersons)
    console.log(new Date().toTimeString(), 'peopleSearch hook ended')
  }, [peopleSearch])

  const resetShownPersons = (localPersons = persons, localCurPerson = curPerson): void => {
    localPersons = shiftCurPerson({ persons: localPersons, curPerson: localCurPerson })
    setShownPersons(localPersons)
    resetScrolledPersons(localPersons)
  }

  const fetchDataToScroll = (
    localShownPersons: iPerson[] = shownPersons,
    localScrollChunkNum: number = scrollChunkNum
  ): void => {
    console.log(new Date().toTimeString(), 'fetchDataToScroll called')
    if (localScrollChunkNum * CHUNK_SIZE >= localShownPersons.length - 1) {
      setScrolledPersons(localShownPersons)
      setHasPersonsToScroll(false)
      console.log(localShownPersons)
    } else {
      const endIndex = localScrollChunkNum * CHUNK_SIZE
      setScrolledPersons(localShownPersons.slice(0, endIndex))
      setHasPersonsToScroll(true)
      console.log(localShownPersons.slice(0, endIndex))
    }
    setScrollChunkNum(localScrollChunkNum + 1)
    console.log(new Date().toTimeString(), 'fetchDataToScroll ended')
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value || ''
    setPeopleSearch(searchString)
  }

  const resetScrolledPersons = (localShownPersons: iPerson[] = shownPersons): void => {
    console.log('resetScrolledPersons called')
    window.scrollTo(0, 0)
    setScrollChunkNum(1)
    fetchDataToScroll(localShownPersons, 1)
  }

  const onSearchFocus = (): void => {
    setPeopleFilter(null)
  }

  const panelHeader = (
    <FixedLayout vertical="top">
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
        ??????????????
      </PanelHeader>
      <div className="people-panel__header">
        <Search
          autoFocus
          onFocus={onSearchFocus}
          className="people-panel__header-search"
          value={peopleSearch}
          onChange={onSearchChange}
        />
        <div className="people-panel__header-buttons">
          {peopleFilter ? (
            <IconButton onClick={() => setPeopleFilter(null)}>
              <IconUnfilter className="people-panel__header-buttons-unfilter-svg" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setActiveModal(eModalIds.PeopleFilters)}>
              <IconFilter className="people-panel__header-buttons-filter-svg" />
            </IconButton>
          )}

          {isPeopleCardsCollapsed ? (
            <IconButton onClick={() => setIsPeopleCardsCollapsed(!isPeopleCardsCollapsed)}>
              <IconExpand className="people-panel__header-buttons-expand-svg" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsPeopleCardsCollapsed(!isPeopleCardsCollapsed)}>
              <IconCollapse className="people-panel__header-buttons-collapse-svg" />
            </IconButton>
          )}
        </div>
      </div>
    </FixedLayout>
  )

  const panelFooter = (
    <FixedLayout vertical="bottom">
      <Footer>
        {shownPersons && shownPersons.length > 0
          ? `${
              shownPersons.length % 10 === 1
                ? '???????????? ' + shownPersons.length.toString() + ' ??????????????'
                : '?????????????? ' + shownPersons.length.toString() + ' ??????????????'
            }`
          : '???????????? ???? ??????????????'}
      </Footer>
    </FixedLayout>
  )

  return (
    <Panel {...rest}>
      {panelHeader}
      <Spacing size={100} />
      <Group>
        {scrolledPersons && scrolledPersons.length > 0 && (
          <InfiniteScroll
            dataLength={scrolledPersons.length}
            next={fetchDataToScroll}
            hasMore={hasPersonsToScroll}
            loader={<Spinner size="small" style={{ margin: '20px 0' }} />}
          >
            {scrolledPersons.map((person) => (
              <PersonCard
                key={person.vk_id}
                person={person}
                isCurPerson={person === curPerson}
                isCardsCollapsed={isPeopleCardsCollapsed}
              />
            ))}
          </InfiniteScroll>
        )}
      </Group>
      <Spacing size={30} />
      {panelFooter}
    </Panel>
  )
}
