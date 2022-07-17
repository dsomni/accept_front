import { validation } from './validation';
import { steps } from './steps';

export const form = {
  steps,
  validation,

  title: 'Название',
  complexity: 'Сложность',
  description: 'Описание',
  inputFormat: 'Входные данные',
  outputFormat: 'Выходные данные',
  inputExample: 'Пример входных данных',
  outputExample: 'Пример выходных данных',
  grade: 'Класс',
  constraints: {
    title: 'Ограничения',
    time: 'Время (секунды)',
    memory: 'Память (Мб)',
  },
  checkTypes: ['Тесты', 'Чекер'],
  taskTypes: ['Задача со сдачей кода', 'Текстовая задача'],
  checkType: 'Тип тестирования',
  taskType: 'Тип задачи',
  checker: 'Чекер',
  hint: {
    title: 'Подсказка',
    alarmType: 'Вид триггера',
    hintAlarmTypes: ['Попытки', 'Время (минуты)'],
    text: 'Текст подсказки',
    showAfter: 'Показать после',
  },
  remark: 'Примечание',
  tests: 'Тесты',
  inputTest: 'Входные данные',
  outputTest: 'Выходные данные',
  test: 'Тест',
  example: 'Пример',
  allowed: 'Разрешенные',
  forbidden: 'Запрещенные',
};
