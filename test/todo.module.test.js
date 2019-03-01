const puppeteer = require('puppeteer')

/**
 * probably a test shouldn't be organized like this, idk ._.
 * it's just a demonstration
 */
describe('Test the Todo Module', () => {
    let page, browser;

    beforeAll(async () => {
        jest.setTimeout(30000)
        let {PUPPETEER_SLOWMO, PUPPETEER_HEADLESS, PUPPETEER_WIDTH, PUPPETEER_HEIGHT} = process.env
        let width = parseInt(PUPPETEER_WIDTH)
        let height = parseInt(PUPPETEER_HEIGHT)
        let headless = PUPPETEER_HEADLESS === 'true'
        
        browser = await puppeteer.launch({
            headless,
            slowMo: PUPPETEER_SLOWMO,
            args: [`--window-size=${width},${height}`]
        })
        page = await browser.newPage()
        await page.goto(process.env.APP_URL)
        await page.setViewport({ width, height })
    })

    afterAll(() => {
        browser.close()
    })

    test("It Can Add Todo", async () => {
        let todoText = "Can I put my todo here?"
        //click and type to the todo form
        let todoForm = await page.waitForSelector('input[name="todo"]')
        await todoForm.click()
        await page.keyboard.type(todoText)
        //submit the text
        let submitButton = await page.waitForSelector('button[name="todo-button-submit"]')
        await submitButton.click()
        //check if it is rendered correctly
        let firstTodoItemHandle = await page.waitForSelector(`#todos-container > div:nth-child(1) > div > p`)
        let firstTodoItemContent = await page.evaluate(todoItem => todoItem.innerHTML, firstTodoItemHandle)
        expect(firstTodoItemContent).toBe(todoText)
    }, 5000)
    
    test("It Can Delete Todo", async () => {
        //tell js to wait for the element to be hidden, but don't use await
        let waitForTheFirstTodoDisappear = page.waitForSelector(`#todos-container > div:nth-child(1) > div > p`, {hidden:true})
        //click the button
        let buttonSelector = await page.waitForSelector(`#todos-container > div:nth-child(1) > button`)
        await buttonSelector.click()
        //wait the element to be hidden
        await waitForTheFirstTodoDisappear
    }, 5000)

    test("It shows alert when input is empty", async () => {
        async function checkAlertDialog (dialog) {
            let message = await dialog.message()
            let isTheAlertDisplayCorrectly = message.includes("Really, don't you have anything to do?")
            expect(isTheAlertDisplayCorrectly).toBeTruthy()
            await dialog.accept()
        }

        page.on('dialog', checkAlertDialog)
        let buttonSelector = await page.waitForSelector(`button[name="todo-button-submit"]`)
        await buttonSelector.click()
        page.removeListener('dialog', checkAlertDialog)
    }, 3000)

    test("It Can Add and Delete the Todo Many Times", async () => {
        
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
                let todoForm = await page.waitForSelector('input[name="todo"]')
                await todoForm.click()
                await page.keyboard.type(value)
                let submitButton = await page.waitForSelector('button[name="todo-button-submit"]')
                await submitButton.click()
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
                let buttonSelector = await page.waitForSelector(`#todos-container > div:nth-child(${index + 1}) > button`)
                await buttonSelector.click()
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