import { Film, FilmsActionTypes, MappedFilms } from './../../types/films';
import { filmsReducer } from "./filmsReducer"

enum Id {
    first = 1697727612454,
    second = 1697735372432
}


const films: Array<[number, Film]> = [
    [1697727612454,{
    appendDate: 1697727612454,
    description: 'В недалеком будущем мир населен людьми и репликантами, созданными выполнять самую тяжелую работу. Работа офицера полиции Кей — держать репликантов под контролем в условиях нарастающего напряжения. Он случайно становится обладателем секретной информации, которая ставит под угрозу существование всего человечества. Желая найти ключ к разгадке, Кей решает разыскать Рика Декарда — бывшего офицера специального подразделения полиции Лос-Анджелеса, который бесследно исчез много лет назад.' ,
    id: 1697727612454,
    length: "164",
    comments: [],
    poster:'./bladerunner.jpg',
    rating: "7.8",
    title:'Blade Runner',
    }],
    [1697735372432,{
        appendDate: 1697735372432,
        description: 'Самая обыкновенная стереотипная Барби живёт в великолепном розовом Барбиленде, и каждый её день идеален. Она меняет наряды, загорает на пляже, проводит время с другими Барби, день заканчивается шумной вечеринкой с танцами, и в этой позитивной кутерьме с блёстками влюблённый Кен — всего лишь приложение к Барби. Однажды куклу посещают мысли о смерти, и её сделанные под туфли с каблуками ноги вдруг становятся плоскими. Чтобы разобраться в происходящем и вернуть привычный пластмассовый мир, Барби придётся отправиться в мир реальный и найти там свою девочку-хозяйку. За ней увязывается не мыслящий жизни без своего кумира Кен.',
        id: 1697735372432,
        length: "114",
        comments: [],
        poster:'./barbie.jpg',
        rating: "6.7",
        title:'Barbie',
        }]]



let mockFilms: MappedFilms


    
mockFilms = new Map(films)



describe('Добавление комментариев',() => {
    
    test('Добавление комментария',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.ADD_COMMENT, payload: {filmId: Id.first, comment: "bla bla"}})
            .items.get(Id.first)?.comments[0]
            )
        .toBe("bla bla")
    })
    test('Добавление комментария в соседний фильм',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.ADD_COMMENT, payload: {filmId: Id.first, comment: "bla bla"}})
            .items.get(Id.second)?.comments[0]
            )
        .toBe(undefined)
    })
    test('Добавление комментария в оба фильма',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.ADD_COMMENT, payload: {filmId: Id.first, comment: "first"}})
            .items.get(Id.first)?.comments[0]
            )
        .toBe("first")
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.ADD_COMMENT, payload: {filmId: Id.second, comment: "second"}})
            .items.get(Id.second)?.comments[0]
            )
        .toBe("second")
    })
})

describe('Добавление фильма', () => {
    const film: Film = {
        appendDate: 1,
        comments: [],
        description:'description',
        id: 12345,
        length: '50',
        poster: 'image',
        rating: '4.5',
        title: 'title',
    }
    test('Наличие добавленого фильма',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.UPLOAD_FILM, payload: film})
            .items.get(12345)
        ).toEqual(film)
    })
    test('Размер мапы',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.UPLOAD_FILM, payload: film})
            .items.size
        ).toBe(3)
    })
})

describe ('Пользовательский рейтинг',() => {
    test('Добавление рейтинга',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.first, rating: 5}})
            .items.get(Id.first)?.userRating
        ).toBe(5)
    })
    test('Добавление рейтинга в соседний фильм',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.first, rating: 5}})
            .items.get(Id.second)?.userRating
        ).toBe(undefined)
    })
    test('Добавление рейтинга в оба фильма',() => {
        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.first, rating: 5}})
            .items.get(Id.first)?.userRating
        ).toBe(5)

        expect(
            filmsReducer({items: mockFilms}, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.second, rating: 3}})
            .items.get(Id.second)?.userRating
        ).toBe(3)
    })
    test('Изменение рейтинга',() => {
        function changeCheck() {
            const firstRating = filmsReducer({items: mockFilms}, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.first, rating: 5}})

            expect(firstRating.items.get(Id.first)?.userRating).toBe(5)
            
            return filmsReducer(firstRating, {type:FilmsActionTypes.SET_RATING, payload: {filmId: Id.first, rating: 2}})
            .items.get(Id.first)?.userRating
        }

        expect(changeCheck()).toBe(2)
    })
})