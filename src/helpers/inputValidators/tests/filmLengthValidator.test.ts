import { handleLength } from "../inputValidators";



describe ('Проверка валидности поля длительности фильма',() => {

    let answer: string
    const callback = jest.fn((value: string) => answer = value)

    beforeEach(()=>{
        answer = ''
    })

    test('Обычное число',() => {
        handleLength(callback, {target:{value:'100'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('100')
    })

    test('Дробное число',() => {
        handleLength(callback, {target:{value:'4.4'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('44')
    })

    test('Бувы в строке',() => {
        handleLength(callback, {target:{value:'a1a'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('1')
    })
    test('Начало с нуля',() => {
        handleLength(callback, {target:{value:'01'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('')
    })
    test('Наличие симоволов',() => {
        handleLength(callback, {target:{value:'1-.+=?/'}} as React.ChangeEvent<HTMLInputElement>)
        expect(answer).toBe('1')
    })
})




        

        

        

        