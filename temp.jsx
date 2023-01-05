const MODAL_PAGE_FILTERS = 'filters'
const MODAL_PAGE_COUNTRIES = 'countries'
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback'
const MODAL_PAGE_USER_INFO = 'user-info'
const MODAL_PAGE_FULLSCREEN = 'fullscreen'
const MODAL_PAGE_DYNAMIC = 'dynamic'

const MODAL_CARD_MONEY_SEND = 'money-send'
const MODAL_CARD_APP_TO_MENU = 'app-to-menu'
const MODAL_CARD_ABOUT = 'say-about'
const MODAL_CARD_NOTIFICATIONS = 'notifications'
const MODAL_CARD_CHAT_INVITE = 'chat-invite'

const DynamicModalPage = ({ updateModalHeight, onClose, ...props }) => {
  const platform = usePlatform()
  const { sizeX } = useAdaptivityConditionalRender()
  const [expanded, setExpanded] = React.useState(false)
  const toggle = React.useCallback(() => setExpanded(!expanded), [expanded])

  return (
    <ModalPage
      {...props}
      header={
        <ModalPageHeader
          before={
            sizeX.compact &&
            platform === Platform.ANDROID && <PanelHeaderClose className={sizeX.compact.className} onClick={onClose} />
          }
          after={
            sizeX.compact &&
            platform === Platform.IOS && (
              <PanelHeaderButton className={sizeX.compact.className} onClick={onClose}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            )
          }
        >
          Dynamic modal
        </ModalPageHeader>
      }
    >
      <Group>
        <CellButton onClick={toggle}>{expanded ? 'collapse' : 'expand'}</CellButton>
        {expanded && <Placeholder icon={<Icon56MoneyTransferOutline />} />}
      </Group>
    </ModalPage>
  )
}

const App = () => {
  const { sizeX } = useAdaptivityConditionalRender()
  const [activeModal, setActiveModal] = useState(null)
  const [modalHistory, setModalHistory] = useState([])

  const changeActiveModal = (activeModal) => {
    activeModal = activeModal || null
    let localModalHistory = modalHistory ? [...modalHistory] : []

    if (activeModal === null) {
      localModalHistory = []
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1)
    } else {
      localModalHistory.push(activeModal)
    }

    setActiveModal(activeModal)
    setModalHistory(localModalHistory)
  }

  const modalBack = () => {
    changeActiveModal(modalHistory[modalHistory.length - 2])
  }

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={modalBack}>
      <ModalPage
        id={MODAL_PAGE_FILTERS}
        onClose={modalBack}
        header={
          <ModalPageHeader
            before={sizeX.compact && <PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />}
            after={<PanelHeaderSubmit onClick={modalBack} />}
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <Group>
          <CellButton onClick={() => changeActiveModal(MODAL_PAGE_COUNTRIES)}>Выбор страны</CellButton>

          <FormItem top="Страна">
            <SelectMimicry placeholder="Выбрать страну" onClick={() => changeActiveModal(MODAL_PAGE_COUNTRIES)} />
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

      <ModalPage
        id={MODAL_PAGE_COUNTRIES}
        onClose={modalBack}
        header={
          <ModalPageHeader before={<PanelHeaderBack label="Назад" onClick={modalBack} />}>
            Выберите страну
          </ModalPageHeader>
        }
        settlingHeight={80}
      >
        <Group>
          <CellButton onClick={() => changeActiveModal(MODAL_PAGE_USER_INFO)}>Информация о пользователе</CellButton>

          <FormLayoutGroup>
            {importantCountries.map(({ id, title }) => {
              return (
                <Radio key={id} name="country" value={id}>
                  {title}
                </Radio>
              )
            })}
          </FormLayoutGroup>
        </Group>
      </ModalPage>

      {/* <ModalCard
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
      ></ModalCard> */}

    </ModalRoot>
  )

  return (
    <SplitLayout modal={modal}>
      <SplitCol>
        <View activePanel="modals">
          <Panel id="modals">
            <PanelHeader>Модальные окна</PanelHeader>
            <Group>
              <CellButton onClick={() => changeActiveModal(MODAL_PAGE_FILTERS)}>Открыть модальную страницу</CellButton>
            </Group>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

;<App />
