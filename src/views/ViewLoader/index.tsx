import loaderGif from '@assets/img/arctic_fox.gif'
import { ePanelIds } from '@src/shared/enums'
import { iNonAuthViewsProps } from '@views/types'
import { Footnote, Panel, PanelHeader, View } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { REACT_APP_APP_TITLE } from '../../shared/consts'
import './index.css'

const TEXTS = [
  'Кормим нашего песца',
  'Загружаем базу вожатых',
  'Проверяем Подслушку',
  <>
    Кстати, песца нарисовал{' '}
    <a
      target={'_blank'}
      rel={'noopener'}
      style={{ color: 'inherit' }}
      href="https://www.deviantart.com/chozobudgie/art/Arctic-fox-347635252"
    >
      Chozobudgie
    </a>
  </>,
  'Ретушируем аватарки',
  'Ищем вожатых в Москве',
  '...и в Таиланде и Италии',
  'Почти загрузилось, не закрывай...',
  'Ремонтируем Кратово',
  'Возвращаем Синезёрки',
  'Собираем вещи в ХМАО',
  'Или лучше в Рузу-дом?',
  'Делаем Атмосферу great again',
  'Бежим в светлое будущее',
  'Ещё чуть-чуть загрузки...',
]

const TEXT_CHANGE_INTERVAL = 3000

export const ViewLoader: FC<iNonAuthViewsProps> = ({ ...rest }) => {
  const [isFadeIn, seIsFadeIn] = useState<boolean>(true)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      seIsFadeIn(!isFadeIn)
    }, TEXT_CHANGE_INTERVAL / 2)
    return () => clearInterval(fadeTimeout)
  }, [isFadeIn])

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordIndex((wordIndex + 1) % TEXTS.length)
    }, TEXT_CHANGE_INTERVAL)
    return () => clearInterval(wordTimeout)
  }, [wordIndex])

  return (
    <View activePanel={ePanelIds.Loader} {...rest}>
      <Panel id={ePanelIds.Loader}>
        <PanelHeader separator={false} className="view-loader__header">
          {REACT_APP_APP_TITLE}
        </PanelHeader>
        <div className="view-loader__content">
          <img src={loaderGif} alt="loading" className="view-loader__content-spinner" />
          <Footnote caps className={`view-loader__content-text ${isFadeIn ? 'fade-in' : 'fade-out'}`}>
            {TEXTS[wordIndex]}
          </Footnote>
        </div>
      </Panel>
    </View>
  )
}
