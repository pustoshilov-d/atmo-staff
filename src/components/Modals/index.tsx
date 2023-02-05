import { eModalIds } from '@src/shared/enums'
import { iFilter, iSort, iStatRowValue } from '@src/shared/types'
import { getPeopleFilters } from '@views/ViewMain/components/PanelPeople/helpers'
import { Icon12CircleOutline, Icon24Chevron } from '@vkontakte/icons'
import {
  FormItem,
  FormLayoutGroup,
  Group,
  Header,
  ModalPage,
  ModalPageHeader,
  PanelHeaderBack,
  PanelHeaderClose,
  Platform,
  Radio,
  Search,
  SimpleCell,
  Subhead,
  Text,
  usePlatform,
} from '@vkontakte/vkui'
import { ru } from 'convert-layout'
import { ChangeEvent, FC, useState } from 'react'
import { getMedals } from '../Medals'
import { ePeopleFilter, ePeopleSort } from './enums'
import './index.css'
import { iModalFilterCustomProps, iModalPeopleFiltersProps } from './types'

export const ModalPeopleFilters: FC<iModalPeopleFiltersProps> = ({
  stats,
  onClose,
  changeActiveModal,
  setPeopleSort,
  peopleSort,
  setPeopleFilter,
  peopleFilter,
  sizeX,
  ...rest
}) => {
  const platform = usePlatform()

  const onSortClick = (p: iSort | null) => {
    setPeopleSort(p)
    changeActiveModal(null)
  }
  const onFilterClick = (p: iFilter | null) => {
    setPeopleFilter(p)
    changeActiveModal(null)
  }

  return (
    <ModalPage
      settlingHeight={100}
      hideCloseButton={platform === Platform.IOS}
      onClose={onClose}
      dynamicContentHeight={false}
      header={
        <ModalPageHeader
          after={sizeX.compact && <PanelHeaderClose onClick={onClose} className={sizeX.compact.className} />}
        >
          Сортировка и фильтрация
        </ModalPageHeader>
      }
      {...rest}
    >
      {/* <>Сбросить фильтры</> */}
      <Group>
        <Header>Сортировать по</Header>
        <FormItem className={'modal-people-filters__sort-radios'}>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.NAME}
            description="От А до Я"
            onClick={() => onSortClick(ePeopleSort.NAME)}
          >
            Имя вожатого
          </Radio>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.SURNAME}
            description="От А до Я"
            onClick={() => onSortClick(ePeopleSort.SURNAME)}
          >
            Фамилия вожатого
          </Radio>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.SHVA_YEAR_S}
            description="От прошлых к новым"
            onClick={() => onSortClick(ePeopleSort.SHVA_YEAR_S)}
          >
            Год выпуска ШВА
          </Radio>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.SHVA_YEAR_S_DESC}
            description="От новых к прошлым"
            onClick={() => onSortClick(ePeopleSort.SHVA_YEAR_S_DESC)}
          >
            Год выпуска ШВА
          </Radio>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.ALL_YEARS_SMENY_DESC}
            description="От большего к меньшему"
            onClick={() => onSortClick(ePeopleSort.ALL_YEARS_SMENY_DESC)}
          >
            Количество отработанных смен
          </Radio>
          <Radio
            checked={peopleSort != null && peopleSort === ePeopleSort.ACHIEVEMENTS_COUNT_DESC}
            description="От большего к меньшему"
            onClick={() => onSortClick(ePeopleSort.ACHIEVEMENTS_COUNT_DESC)}
          >
            Количество достижений
          </Radio>
        </FormItem>
      </Group>
      <Group>
        <Header>Фильтровать по</Header>
        <FormItem top="Пол">
          <Radio
            checked={peopleFilter != null && peopleFilter === ePeopleFilter.SEX_M}
            name="sex"
            description={
              'Вожатых найдено: ' +
                stats
                  .find((stat) => stat.stat_id === 'sex')
                  ?.rows.find((row) => row.y_en_label === 'sex')
                  ?.values.find((value) => value.header === 'м')?.value || null
            }
            onClick={() => onFilterClick(ePeopleFilter.SEX_M)}
          >
            Парни
          </Radio>
          <Radio
            checked={peopleFilter != null && peopleFilter === ePeopleFilter.SEX_F}
            name="sex"
            description={
              'Вожатых найдено: ' +
                stats
                  .find((stat) => stat.stat_id === 'sex')
                  ?.rows.find((row) => row.y_en_label === 'sex')
                  ?.values.find((value) => value.header === 'ж')?.value || null
            }
            onClick={() => onFilterClick(ePeopleFilter.SEX_F)}
          >
            Девушки
          </Radio>
        </FormItem>
        <FormItem top="Статус в отряде">
          <Radio
            checked={peopleFilter != null && peopleFilter === ePeopleFilter.IS_PO_ACTIVE_TRUE}
            name="is_po_active"
            description={
              'Вожатых найдено: ' +
                stats
                  .find((stat) => stat.stat_id === 'is_po_active')
                  ?.rows.find((row) => row.y_en_label === 'is_po_active')
                  ?.values.find((value) => value.header === 'true')?.value || null
            }
            onClick={() => onFilterClick(ePeopleFilter.IS_PO_ACTIVE_TRUE)}
          >
            Активный
          </Radio>
          <Radio
            checked={peopleFilter != null && peopleFilter === ePeopleFilter.IS_PO_ACTIVE_FALSE}
            name="is_po_active"
            description={
              'Вожатых найдено: ' +
                stats
                  .find((stat) => stat.stat_id === 'is_po_active')
                  ?.rows.find((row) => row.y_en_label === 'is_po_active')
                  ?.values.find((value) => value.header === 'false')?.value || null
            }
            onClick={() => onFilterClick(ePeopleFilter.IS_PO_ACTIVE_FALSE)}
          >
            Неактивный
          </Radio>
        </FormItem>
        <Subhead className="vkuiFormItem__top modal-people-filters__other-filters-header">Другие фильтры</Subhead>
        {stats &&
          getPeopleFilters({ stats }).map((filter) => (
            <SimpleCell
              key={filter.y_en_label}
              before={<Icon12CircleOutline className="modal-people-filters__filter-custom-before" />}
              after={<Icon24Chevron className="modal-people-filters__filter-custom-after" />}
              onClick={() => changeActiveModal(filter.y_en_label)}
            >
              {filter.y_ru_label}
            </SimpleCell>
          ))}
      </Group>
    </ModalPage>
  )
}

export const ModalFilterCustom: FC<iModalFilterCustomProps> = ({
  filter,
  onClose,
  changeActiveModal,
  setPeopleFilter,
  sizeX,
  ...rest
}) => {
  const platform = usePlatform()

  const { y_ru_label, y_en_label, values } = filter
  const [searchValue, setSearchValue] = useState<string>('')
  const [valuesToShow, setValuesToShow] = useState<iStatRowValue[]>(values)

  const medals16_2 = getMedals(16, '2 0 0 0')

  const onFilterClick = (p: iFilter): void => {
    setPeopleFilter(p)
    changeActiveModal(null)
  }
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value || ''
    setSearchValue(value)

    value = ru.fromEn(value)
    value = value.toUpperCase().replace('Ё', 'Е')
    const localValuesToShow = values.filter(
      (item) => value === '' || item.header.toString().toUpperCase().replace('Ё', 'Е').includes(value)
    )
    setValuesToShow(localValuesToShow)
  }
  return (
    <ModalPage
      settlingHeight={100}
      hideCloseButton={platform === Platform.IOS}
      onClose={onClose}
      dynamicContentHeight={false}
      header={
        <>
          <ModalPageHeader
            before={<PanelHeaderBack label="Назад" onClick={() => changeActiveModal(eModalIds.PeopleFilters)} />}
            after={sizeX.compact && <PanelHeaderClose onClick={onClose} className={sizeX.compact.className} />}
          >
            <Text>{y_ru_label}</Text>
          </ModalPageHeader>
          <Search value={searchValue} onChange={onSearchChange} />
        </>
      }
      {...rest}
    >
      <Group>
        <FormLayoutGroup>
          {valuesToShow &&
            valuesToShow.map((item) => {
              let { header, value } = item
              let image = null
              if (y_en_label === eModalIds.AchievementsHistory) {
                const parts = item.header.toString().split(' | ')
                image = parts[1]
                image = medals16_2[image as keyof typeof medals16_2]
                header = parts[0]
              }
              return (
                <Radio
                  className={'modal-filter-custom__radio'}
                  key={header}
                  name={y_ru_label}
                  value={header}
                  description={`Вожатых найдено: ${value}`}
                  onClick={() => onFilterClick({ key: y_en_label, value: item.header })}
                >
                  <div className={'modal-filter-custom__radio-cell'}>
                    <>
                      {image && image}
                      <Text style={{ paddingLeft: image ? '6px' : '0' }}>{header}</Text>
                    </>
                  </div>
                </Radio>
              )
            })}
        </FormLayoutGroup>
      </Group>
    </ModalPage>
  )
}
