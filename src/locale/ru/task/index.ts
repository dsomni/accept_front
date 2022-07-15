import { modals } from "./modals";
import { description } from "./description";
import { list } from "./list";
import { form } from "./form";

export const task = {
    send: 'отправка',
    results: 'результаты',
    description,

    submit: 'Отправить',
    status: {
        error: 'Ошибка при отправке',
        ok: 'Попытка успешно отправлена',
    },
    constraints: {
        time: 'время',
        memory: 'память',
    },

    modals,
    list,
    form,
};