
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("A test that checks creating a new todo", () => {
  beforeAll(() => {
    add({
      title: "test 1",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Add new todo in todoList", () => {
    const todoItemCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("Checks marking a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Checks retrieval of overdue items", () => {
    let overdueList = overdue();

    expect(
      overdueList.every((item) => {
        return item.dueDate < today;
      })
    ).toBe(true);
  });

  test("Checks retrieval of due today items", () => {
    let dueTodayList = dueToday();

    expect(
      dueTodayList.every((item) => {
        return item.dueDate === today;
      })
    ).toBe(true);
  });


test("Checks retrieval of due later items", () => {
  let todos = todoList(); // Initialize the `todos` object
  let dueLaterList = todos.dueLater();

  expect(
    dueLaterList.every((item) => {
      return item.dueDate > today;
    })
  ).toBe(true);
});

});

