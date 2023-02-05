import { Map, ObjectManager, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import { ePanelIds } from '@src/shared/enums'
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { FC } from 'react'
import { iPanelMapProps } from '../types'
import './index.css'

export const PanelMap: FC<iPanelMapProps> = ({
  setActivePanel,
  goHome,
  setActiveModal,
  setIsPeopleCardsCollapsed,
  setPeopleSearch,
  persons,
  maps,
  fetchedUser,
  ...rest
}) => {
  const points = [
    {
      id: '1',
      coordinates: [61.703602, 30.680139],
      title: 'Железнодорожная станция',
    },
    {
      id: '2',
      coordinates: [61.699623, 30.690952],
      title: 'Пристань Метеоров',
    },
    {
      id: '3',
      coordinates: [61.705707, 30.672616],
      title: 'Парк Ваккасалми',
    },
  ]

  let collection = {
    type: 'FeatureCollection',
    features: persons.map((person, index) => {
      return {
        id: index,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: person.location_coord,
        },
        properties: {
          balloonContent: `
          <div>${person.name} ${person.surname}</div>
        `,
          clusterCaption: `Метка ${person.name} ${person.surname}`,
        },
      }
    }),
  }

  const onObjectEvent = (e: any) => {
    let objectId = e.get('objectId')
    let person = persons[objectId]
    let searchPersonToSet = `${person.name} ${person.surname}`
    setPeopleSearch(searchPersonToSet)
    setIsPeopleCardsCollapsed(false)
    setActivePanel(ePanelIds.Home)
  }

  return (
    <Panel className='panel-map' {...rest}>
      <PanelHeader separator={true} before={<PanelHeaderBack onClick={goHome} />}>
        Карта отряда
      </PanelHeader>
      <YMaps>
        <Map
          // className="panel-map__map"
          height="inherit"
          width="inherit"
          defaultState={{ center: [55.75, 37.57], zoom: 4 }}
        >
          {/* {maps &&
            maps.map((map) => (
              <Circle
                key={map.title}
                geometry={[map.coord, 1000 * map.radius]}
                options={{
                  draggable: false,
                  fillColor: '#DB709377',
                  strokeColor: '#990066',
                  strokeOpacity: 0.5,
                  strokeWidth: 1,
                }}
              />
            ))} */}
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            objects={{
              // openBalloonOnClick: true,
              preset: 'islands#greenDotIcon',
              // events: {
              //   add: ['mouseenter', 'mouseleave'],
              //   onObjectEvent: onObjectEvent,
              // },
            }}
            clusters={{
              preset: 'islands#redClusterIcons',
            }}
            defaultFeatures={persons && collection}
            // modules={[
            //   'objectManager.addon.objectsBalloon',
            //   'objectManager.addon.objectsHint',
            //   'objectManager.addon.clustersBalloon',
            // ]}
          />
          <ZoomControl options={{}} />
        </Map>
      </YMaps>
    </Panel>
  )
}

{
  /* <Clusterer
          options={{
            preset: 'islands#violetClusterIcons',
            groupByCoordinates: false,
          }}
        >
          {persons &&
            persons
              .filter((person) => person.location_coord)
              .map((person, personIndex) => (
                <Placemark
                  key={personIndex}
                  defaultGeometry={person.location_coord}
                  defaultOptions={{
                    iconLayout: 'default#image',
                    iconImageHref: person.photo,
                    iconImageSize: [30, 30],
                  }}
                />
              ))}
        </Clusterer> */
}
