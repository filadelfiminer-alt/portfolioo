export const ru = {
  common: {
    loading: "Загрузка...",
    error: "Ошибка",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    create: "Создать",
    close: "Закрыть",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий",
    search: "Поиск",
    filter: "Фильтр",
    all: "Все",
    none: "Нет",
    yes: "Да",
    no: "Нет",
    submit: "Отправить",
    sending: "Отправка...",
    success: "Успешно",
    viewLive: "Смотреть",
    github: "GitHub",
  },

  nav: {
    home: "Главная",
    portfolio: "Портфолио",
    about: "Обо мне",
    contact: "Контакты",
    admin: "Админ",
    login: "Войти",
    logout: "Выйти",
  },

  home: {
    heroTitle: "Творческое Портфолио",
    heroSubtitle: "Дизайн. Разработка. Креатив.",
    viewWork: "Смотреть работы",
    featuredProjects: "Избранные проекты",
    allProjects: "Все проекты",
    noProjects: "Проекты пока не добавлены",
    noProjectsDescription: "Скоро здесь появятся удивительные работы",
    viewProject: "Смотреть проект",
    downloadPdf: "Скачать PDF",
    generatingPdf: "Создание PDF...",
  },

  project: {
    title: "Название",
    description: "Описание",
    shortDescription: "Краткое описание",
    fullDescription: "Полное описание",
    tags: "Теги",
    technologies: "Технологии",
    category: "Категория",
    year: "Год",
    role: "Роль",
    client: "Клиент",
    duration: "Продолжительность",
    coverImage: "Обложка",
    galleryImages: "Галерея изображений",
    externalUrl: "Внешняя ссылка",
    githubUrl: "GitHub ссылка",
    published: "Опубликован",
    featured: "Избранный",
    draft: "Черновик",
  },

  about: {
    title: "Обо мне",
    bio: "Биография",
    profilePhoto: "Фото профиля",
    editAbout: "Редактировать информацию",
    saveChanges: "Сохранить изменения",
    noContent: "Информация пока не добавлена",
    uploadPhoto: "Загрузить фото",
  },

  contact: {
    title: "Связаться со мной",
    subtitle: "Давайте создадим что-то великолепное вместе",
    name: "Ваше имя",
    email: "Email",
    message: "Сообщение",
    send: "Отправить сообщение",
    sending: "Отправка...",
    successTitle: "Сообщение отправлено!",
    successMessage: "Спасибо за ваше сообщение. Я свяжусь с вами в ближайшее время.",
    errorTitle: "Ошибка отправки",
    errorMessage: "Не удалось отправить сообщение. Попробуйте позже.",
    namePlaceholder: "Введите ваше имя",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Расскажите о вашем проекте или идее...",
  },

  admin: {
    title: "Панель управления",
    projects: "Проекты",
    messages: "Сообщения",
    settings: "Настройки",
    aboutSettings: "Настройки «Обо мне»",
    addProject: "Добавить проект",
    editProject: "Редактировать проект",
    deleteProject: "Удалить проект",
    deleteConfirm: "Вы уверены, что хотите удалить этот проект?",
    projectSaved: "Проект сохранен",
    projectDeleted: "Проект удален",
    noMessages: "Нет новых сообщений",
    messageFrom: "От",
    messageDate: "Дата",
    deleteMessage: "Удалить сообщение",
    reorderProjects: "Перетащите для изменения порядка",
    uploadImages: "Загрузить изображения",
    dragToReorder: "Перетащите для сортировки",
    manageGallery: "Управление галереей",
    loginRequired: "Требуется авторизация",
    loginDescription: "Войдите для доступа к панели управления",
  },

  pdf: {
    title: "Портфолио",
    aboutMe: "Обо мне",
    featuredProjects: "Избранные проекты",
    allProjects: "Все проекты",
    viewLive: "Смотреть",
    github: "GitHub",
    projects: "проектов",
  },

  validation: {
    required: "Обязательное поле",
    invalidEmail: "Некорректный email",
    tooShort: "Слишком короткое значение",
    tooLong: "Слишком длинное значение",
  },

  footer: {
    copyright: "Все права защищены",
    madeWith: "Сделано с",
    love: "любовью",
  },
};

export type Translations = typeof ru;

export function t(key: string): string {
  const keys = key.split(".");
  let value: unknown = ru;
  
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  
  return typeof value === "string" ? value : key;
}
