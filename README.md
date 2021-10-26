# Описание проекта

Это четвертый учебный проект в рамках образовательной программы "Веб-разработчик" от Яндекс.Практикума: его цель заключается в переносе проекта Mesto на React с увеличением функциональных возможностей пользователя.

## Использованные технологии:

HTML5, CSS3 (адаптивная семантическая вёрстка по БЭМ) JavaScript, работа с REST API;
React: useState (работа со стейтами, поднятие стейта), useEffect (колбэки компонентов), useContext (создание и подключение контекста текущего пользователя), useRef (работа с неконтролируемыми компонентами), работа с контролируемыми компонентами (управление содержимым форм).
NEW! В текущей проектной работе были использованы:

- React Router для осуществления маршрутизации между страницами регистрации и входа пользователя и основной страницы с галереей.
- Был создан authApi для поддержки регистрации и авторизации пользователя.
- Реализовано взаимодействие с localStorage для повторного визита пользователя без процесса авторизации.

## Инструкция по использованию

Склонировать репозиторий к себе командой:
<code>git clone git@github.com:evamoer/react-mesto-auth.git</code>

Проинсталлировать проект командой:
<code>npm install</code>

Запустить проект в режиме разработчика командой:
<code>npm run start</code>
