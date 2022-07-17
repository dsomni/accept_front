import { validation } from "./validation"
import { steps } from "./steps"

export const form = {
    steps,
    validation,

    title: 'название',
    complexity: 'сложность',
    description: 'описание',
    inputFormat: 'входные данные',
    outputFormat: 'выходные данные',
    inputExample: 'пример входных данных',
    outputExample: 'пример выходных данных',
    grade: 'класс',
    constraints: {
      title: 'ограничения',
      time: 'время (секунды)',
      memory: 'память (Мб)',
    },
    checkTypes: ['тесты', 'чекер'],
    taskTypes: ['задача со сдачей кода', 'текстовая задача'],
    checkType: 'тип тестирования',
    taskType: 'тип задачи',
    checker: 'чекер',
    hint: {
      title: 'подсказка',
      alarmType: 'вид триггера',
      hintAlarmTypes: ['попытки', 'время (минуты)'],
      text: 'текст подсказки',
      showAfter: 'показать после',
    },
    remark: 'примечание',
    tests: 'тесты',
    inputTest: 'входные данные',
    outputTest: 'выходные данные',
    test: 'тест',
    example: 'пример',
    allowed: 'Разрешенные',
    forbidden: 'Запрещенные',
  }