type Callback = (arg: string) => void

export function handleRating(callback: Callback,e: React.ChangeEvent<HTMLInputElement>){
    let rating = (e.target.value.replace(/[^\d.]/g,''))
    if (Number(rating) <= 10 && rating.replace(/[.,]/g,'').length <= 2 && rating[0] !== '0' && rating[0] !== '.' && rating[2] !=='.'){
        callback(rating)
    }
}

export function handleLength(callback: Callback,e: React.ChangeEvent<HTMLInputElement>){
    const minutes: string = e.target.value.replace(/\D/g,'')
    if (minutes[0] !== '0'){
        callback(minutes)
    }
    
}