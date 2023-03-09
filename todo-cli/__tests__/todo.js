
let todoList = require("../todo");
const {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  } = todoList();
  
  describe("TodoList", () => {
    beforeEach(() => {
      // Clear all todos before each test case.
      all.length = 0;
    });
  
    describe("add", () => {
      it("should add a new item to the todo list", () => {
        const itemTitle = "New Todo";
        const itemDueDate = "2022-10-30";
        const itemCompleted = false;
  
        add({ title: itemTitle, dueDate: itemDueDate, completed: itemCompleted });
  
        expect(all).toHaveLength(1);
        expect(all[0]).toMatchObject({
          title: itemTitle,
          dueDate: itemDueDate,
          completed: itemCompleted,
        });
      });
    });
  
    describe("markAsComplete", () => {
      it("should mark the given item as completed", () => {
        const itemDueDate = "2022-11-01";
        add({ title: "Test Todo", dueDate: itemDueDate, completed: false });
  
        const itemIndex = 0;
        markAsComplete(itemIndex);
  
        expect(all[itemIndex].completed).toBe(true);
      });
    });
  
    describe("overdue", () => {
      it("should return all items that are overdue", () => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const yesterdayStr = yesterday.toISOString().split("T")[0];
  
        add({
          title: "First Todo",
          dueDate: yesterdayStr,
          completed: false,
        });
        add({
          title: "Second Todo",
          dueDate: todayStr,
          completed: false,
        });
  
        const overdueItems = overdue();
  
        expect(overdueItems).toHaveLength(1);
        expect(overdueItems[0].title).toBe("First Todo");
      });
    });
  
    describe("dueToday", () => {
      it("should return all items that are due today", () => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        const yesterdayStr = yesterday.toISOString().split("T")[0];
  
        add({
          title: "First Todo",
          dueDate: yesterdayStr,
          completed: false,
        });
        add({
          title: "Second Todo",
          dueDate: todayStr,
          completed: false,
        });
  
        const dueTodayItems = dueToday();
  
        expect(dueTodayItems).toHaveLength(1);
        expect(dueTodayItems[0].title).toBe("Second Todo");
      });
    });
  
    describe("dueLater", () => {
      it("should return all items that are due later", () => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const tomorrowStr = tomorrow.toISOString().split("T")[0];
  
        add({
          title: "First Todo",
          dueDate: todayStr,
          completed: false,
        });
        add({
          title: "Second Todo",
          dueDate: tomorrowStr,
          completed: false,
        });
  
        const dueLaterItems = dueLater();
  
        expect(dueLaterItems).toHaveLength(1);
        expect(dueLaterItems[0].title).toBe("Second Todo");
      });
    });
  
    describe("toDisplayableList", () => {
      it("should return the formatted string representation of a list of todos", () => {
        add({ title: "Todo1", dueDate: "2022-12-25", completed: true });
        add({ title: "Todo2", dueDate: "2022-12-26", completed: false });
  
        const displayString = toDisplayableList(all);
  
        expect(displayString).toContain("[x] Todo1 ");
        expect(displayString).toContain("[ ] Todo2 2022-12-26");
      });
    });
  });
  