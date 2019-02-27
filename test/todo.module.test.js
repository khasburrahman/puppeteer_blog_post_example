const puppeteer = require('puppeteer')

describe('Todo module test ', () => {
    let page;
    let browser;
    const width = 1280;
    const height = 720;

    beforeAll(async () => {
        jest.setTimeout(30000)
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            args: [`--window-size=${width},${height}`]
        })
        page = await browser.newPage()
        await page.goto(process.env.APP_URL)
        await page.setViewport({ width, height })
    })

    afterAll(() => {
        browser.close()
    })


    test("A demonstration of automation testing", async () => {
        /**
         * really the test shouldn't be organized like this test ._.
         * it's just a demonstration
         */

        let addedTodos = []

        /**
         * this function help to check if the todo content 
         * is rendered correctly and in order
         * @param {*} todoItems: array of todo items that been submitted 
         */
        async function isTodoItemsCorrectlyRendered(todoItems) {
            for (const [index, value] of todoItems.entries()) {
                let firstTodoItemHandle = await page.waitForSelector(`#todos-container > div:nth-child(${index + 1}) > div > p`)
                let firstTodoItemContent = await page.evaluate(todoItem => todoItem.innerHTML, firstTodoItemHandle)
                expect(firstTodoItemContent).toBe(value)
            }
        }

        /**
         * this function help to input the todo item into the form
         * @param {*} todoItems 
         */
        async function inputToTodo(todoItems) {
            for (let value of todoItems) {
                await page.click('input[name="todo"]')
                await page.keyboard.type(value)
                await page.click('button[name="todo-button-submit"]')
                addedTodos.push(value)
                await isTodoItemsCorrectlyRendered(addedTodos)
            }
        }

        /**
         * delete todo from the rendered page with the order acccording to indexToDelete
         * after a deletion, the index decreased by one
         * @param {*} indexToDelete 
         */
        async function deleteTodoItems(indexToDelete){
            for (let index of indexToDelete) {
                let buttonSelector = `#todos-container > div:nth-child(${index + 1}) > button`
                await page.waitForSelector(buttonSelector)
                await page.click(buttonSelector)
                addedTodos.splice(index, 1)
                await isTodoItemsCorrectlyRendered(addedTodos)
            }
        }


        const TODOS = [
            "Hey there!",
            "I really",
            "like you!",
            "****",
            "So much",
            "that I",
            "created this",
            "some alien",
            "test example!",
            "----",
            "Hope you",
            "have a",
            "great day!",
        ]

        await inputToTodo(TODOS.slice(0, 4))
        await deleteTodoItems([1, 2, 1, 0])
        await inputToTodo(TODOS.slice(4, 10))
        await deleteTodoItems([3, 4, 1, 1, 0, 0])
        await inputToTodo(TODOS.slice(10, 13))
        await deleteTodoItems([1, 0, 0])

    }, 50000);
})