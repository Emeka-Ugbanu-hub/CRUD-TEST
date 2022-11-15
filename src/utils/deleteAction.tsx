
const deleteSingle = (data:any,id:any) => {
    data.filter((user:any) => user.name !== id)
}

export {
    deleteSingle
}