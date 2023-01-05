import {
  Checkbox,
  DatePicker,
  FormItem,
  FormLayoutGroup,
  Group,
  Input,
  ModalPage,
  ModalPageHeader,
  PanelHeaderBack,
  PanelHeaderClose,
  PanelHeaderSubmit,
  Radio,
  SelectMimicry,
  SimpleCell,
} from '@vkontakte/vkui'
import { FC } from 'react'
import { MODAL_PEOPLE_FILTERS, MODAL_PEOPLE_FILTERS_COUNTRIES } from '../../../emun'
import { CustomModalProps } from '../../../types'

export const FilterModal: FC<CustomModalProps> = ({ onClose, changeActiveModal, sizeX }) => (
  <ModalPage
    id={MODAL_PEOPLE_FILTERS}
    onClose={onClose}
    header={
      <ModalPageHeader
        before={sizeX.compact && <PanelHeaderClose className={sizeX.compact.className} onClick={onClose} />}
        after={<PanelHeaderSubmit onClick={onClose} />}
      >
        Фильтры
      </ModalPageHeader>
    }
  >
    <Group>
      <SimpleCell onClick={() => changeActiveModal(MODAL_PEOPLE_FILTERS_COUNTRIES)}>Выбор страны</SimpleCell>

      <FormItem top="Страна">
        <SelectMimicry placeholder="Выбрать страну" onClick={() => changeActiveModal(MODAL_PEOPLE_FILTERS_COUNTRIES)} />
      </FormItem>
      <FormItem top="Город">
        <SelectMimicry placeholder="Выбрать город" disabled />
      </FormItem>

      <FormItem top="Пол">
        <Radio name="sex" value={0} defaultChecked>
          Любой
        </Radio>
        <Radio name="sex" value={1}>
          Мужской
        </Radio>
        <Radio name="sex" value={2}>
          Женский
        </Radio>
      </FormItem>

      <FormItem top="Школа">
        <SelectMimicry placeholder="Выбрать школу" disabled />
      </FormItem>
      <FormItem top="Университет">
        <SelectMimicry placeholder="Выбрать университет" disabled />
      </FormItem>

      <FormItem top="Дополнительно">
        <Checkbox>С фотографией</Checkbox>
        <Checkbox>Сейчас на сайте</Checkbox>
      </FormItem>

      <FormItem top="Работа">
        <Input placeholder="Место работы" />
      </FormItem>
      <FormItem>
        <Input placeholder="Должность" />
      </FormItem>

      <FormItem top="Дата рождения">
        <DatePicker
          min={{ day: 1, month: 1, year: 1901 }}
          max={{ day: 1, month: 1, year: 2006 }}
          dayPlaceholder="Д"
          monthPlaceholder="ММ"
          yearPlaceholder="ГГ"
        />
      </FormItem>
    </Group>
  </ModalPage>
)

export const FilterModalCountries: FC<CustomModalProps> = ({ onClose, changeActiveModal, sizeX }) => (
  <ModalPage
    id={MODAL_PEOPLE_FILTERS_COUNTRIES}
    onClose={onClose}
    header={
      <ModalPageHeader before={<PanelHeaderBack label="Назад" onClick={onClose} />}>Выберите страну</ModalPageHeader>
    }
    settlingHeight={80}
  >
    <Group>
      {/* <SimpleCell onClick={() => changeActiveModal(MODAL_PAGE_USER_INFO)}>Информация о пользователе</SimpleCell> */}
      <FormLayoutGroup>
        {[
          { id: 0, title: 'Ru' },
          { id: 1, title: 'Eng' },
        ].map((res: { id: number; title: string }) => {
          return (
            <Radio key={res.id} name="country" value={res.id}>
              {res.title}
            </Radio>
          )
        })}
      </FormLayoutGroup>
    </Group>
  </ModalPage>
)

/* <ModalCard
    id={MODAL_CARD_MONEY_SEND}
    onClose={() => changeActiveModal(null)}
    icon={<Icon56MoneyTransferOutline />}
    header="Отправляйте деньги друзьям, используя банковскую карту"
    subheader="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
    actions={
      <Button size="l" mode="primary" stretched onClick={() => changeActiveModal(MODAL_CARD_APP_TO_MENU)}>
        Попробовать
      </Button>
    }
  ></ModalCard> */
