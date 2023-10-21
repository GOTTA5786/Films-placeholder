import { handleRating } from "../inputValidators"





describe ('Проверка валидности поля рейтинга',() => {

    let answer: string
    const callback = jest.fn((value: string) => answer = value)

    beforeEach(()=>{
        answer = ''
    })
    
    test('Одиночная цифра',() => {
        handleRating(callback, {target:{value:'4'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('4')
    })

    test('Число с десятыми',() => {
        handleRating(callback, {target:{value:'3.9'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('3.9')
    })

    test('Число с сотыми',() => {
        handleRating(callback, {target:{value:'3.93'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })

    test('Бувы в строке',() => {
        handleRating(callback, {target:{value:'a1a'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('1')
    })
    test('Запись с точкой',() => {
        handleRating(callback, {target:{value:'2.'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('2.')
    })
    test('Начало с нуля',() => {
        handleRating(callback, {target:{value:'01'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
    test('Начало с точки',() => {
        handleRating(callback, {target:{value:'.2'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
    test('Ноль',() => {
        handleRating(callback, {target:{value:'0'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
    test('Число с более чем 2 знаками',() => {
        handleRating(callback, {target:{value:'101'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
    test('Число большее чем 10',() => {
        handleRating(callback, {target:{value:'11'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
})




        

        

        

        