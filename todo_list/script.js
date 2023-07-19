// - В приложении должен быть input для ввода текста задачи и кнопка для её добавления в «Список задач»
// - Ниже должен быть «Список задач» и кнопка «Очистить список»
// - Когда задач нет, должно быть серое уведомление о том, что задачи отсутствуют, а кнопка «Очистить список» должна быть неактивна

// - При добавлении задачи в список, каждая из них должна появляться в списке задач и напротив иметь неактивный чекбокс, а кнопка «Очистить список» должна быть активна
// - Каждый чекбокс напротив задачи должен менять своё состояние при клике (говоря нам, что задача выполнена)
// - При клике на кнопку «Очистить список» все задачи должны удаляться
//     **Важно: Для сохранения состояния списка задач между сеансами работы с приложением используйте Local Storage. Это позволит восстановить список задач при повторном открытии приложения.**

let tasks = [];
const noTaskDiv = document.querySelector('.no-tasks');
const addBtn = document.form.elements.addBtn;
const clearBtn = document.querySelector('.clear-btn');
const list = document.querySelector('.task-list');

document.addEventListener('DOMContentLoaded', function () {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks.length) {
        tasks.forEach((elem) => {
            list.appendChild(makeTask(elem.task, elem.completed));
        });
        noTaskDiv.classList.add('hidden');
        clearBtn.removeAttribute('disabled');
    }
});

//completed - состояние чекбокса, тру или фолз
/**
 * Make <div> with task description and with a checkbox marnikg the task as completed
 * @param {*} taskText текст задачи
 * @param {*} completed состояние чекбокса, тру или фолз
 * @returns HTML элемент содержащий текст задачи и чекбокс
 */

function makeTask(taskText, completed) {
    const div = document.createElement('div');
    div.classList.add('one-task');

    const label = document.createElement('label');

    const span = document.createElement('span');
    span.textContent = taskText;

    const input = document.createElement('input');

    input.setAttribute('type', 'checkbox');
    input.classList.add('checkbox');

    //!! - логический оператор, который приводит к булиану
    input.checked = !!completed;

    input.addEventListener('change', function () {
        if (this.checked) {
            div.classList.add('completed');
            // const complete = tasks.every(({completed}) => completed);
            let complete = true;
            for (const inp of document.querySelectorAll('input.checkbox')) {
                if (!inp.checked) {
                    complete = false;
                    break;
                }
            }

            if (complete) {
                //чтобы успел обновиться интерфейс отобразился обновленный стиль чекбокса
                setTimeout(() => {
                    alert('возьми пирожок');
                }, 0);
            }
        } else {
            div.classList.remove('completed');
        }

        //засетать в лс состояние чекбокса
        //localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    label.append(span, input);

    div.appendChild(label);

    return div;
}

//добавить задачу
addBtn.addEventListener('click', function () {
    if (!this.form.task.value) {
        alert('сделай хоть что-нибудь, ну');
        return;
    }

    tasks.push({
        task: this.form.task.value,
        completed: false,
    });

    //засетать в лс
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //вывести в список
    list.appendChild(makeTask(this.form.task.value));

    //тоже самое document.forms.form.elements.task.value = '';
    this.form.task.value = '';

    //спрятать див и кнопук
    noTaskDiv.classList.add('hidden');
    clearBtn.removeAttribute('disabled');
});

//очистить список задач и локал сторэдж
clearBtn.addEventListener('click', function () {
    list.innerHTML = '';
    noTaskDiv.classList.remove('hidden');
    clearBtn.setAttribute('disabled', true);
    localStorage.removeItem('tasks');
});
