const socket = io()

const form = document.querySelector('form')
const id = document.querySelector('#idDelete')
const deleteBtn = document.querySelector('#btnDelete')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const body = {}
    for (const [key, value] of data) {
        body[key] = value
    }

    socket.emit('new-product', body)
    form.reset()
})

const handleDelete = () => {
    console.log('delete')
    const currentId = parseInt(id.value)
    socket.emit('delete-product', currentId)
    id.value = ''
}

socket.on('products', (currentProducts) => {
    window.location.reload()
})

deleteBtn.addEventListener('click', handleDelete)