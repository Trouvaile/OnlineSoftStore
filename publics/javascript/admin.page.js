const TablesButton = document.querySelectorAll("#TablesButton > button")
const ModelTables = document.querySelectorAll(".admin__tableContainer")

TablesButton.forEach( (model, index) => {
    model.addEventListener('click', e => {

        for(let i = 0; i < TablesButton.length; i++){
            const buttonEle = TablesButton[i].classList
            const tableEle = ModelTables[i].classList
            buttonEle.remove('active')
            buttonEle.add('text-dark')
            tableEle.add('d-none')
        }

        const classes = e.path[0].classList
        classes.add('active')
        classes.toggle('text-dark')
        ModelTables[index].classList.remove('d-none')

        let modelName = ModelTables[index].querySelector('h1').innerText
        modelName = modelName === 'Phụ kiện' ? 'Accessories' : modelName.trim().replace(' ','')
        filterModels(modelName)
    })
})



const filterModels = modelName => {
    const productArr = [...document.querySelectorAll(`#${modelName}TableBox > tbody tr`)]
    const inputs = [...document.querySelectorAll(`#${modelName}FilterBox input`)]
    inputs.map(input => {
        input.addEventListener('input', e => {
            productArr.map(tr => {
                const model = tr.querySelector('td:nth-child(2)')
                tr.classList.remove('d-none')
                const condition1 = e.target.value !== 'all'
                const condition2 = model.innerText !== e.target.value
                if(condition1 && condition2){
                    tr.classList.add('d-none')
                }
            })
        })
    })
}

filterModels('iPhone')

const deleteProduct = (id) => {
    const confirm = window.confirm('Bạn có chắc xoá sản phẩm chứ ?')
    if(confirm){
        axios.delete(`/admin/api/deleteProduct/${id}`)
        .then(() => {
            const element = document.getElementById(id)
            element.classList.add("d-none");
        })
        .catch(err => console.log(err))
    }
}

const readPrice = () => {
    let price = document.getElementById("price").value
    let newPrice = document.getElementById("newprice")
    newPrice.value = price
    newPrice.innerHTML = price
}

const discountChange = () => {
    let select = document.getElementById('disount')
    let option = select.options[select.selectedIndex].value
    let discount

    let price = document.getElementById("price").value
    if (price) {
        if (option === '0% giảm giá') {
            discount = 0
        } else if (option === '10% giảm giá') {
            discount = 10
        } else if (option === '20% giảm giá') {
            discount = 20
        } else if (option === '30% giảm giá') {
            discount = 30
        } else if (option === '40% giảm giá') {
            discount = 40
        } else {
            discount = 50
        }

        let newPrice = document.getElementById("newprice")
        let value = price - ((price * discount) / 100)
        newPrice.value = value
        newPrice.innerHTML = value
    }

}