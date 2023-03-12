function formateDate(dateString:string):string{
    return new Date(dateString).toLocaleString('en-US',{
        year:'numeric',
        month:'short',
        day:'2-digit'
    })
}

export default formateDate