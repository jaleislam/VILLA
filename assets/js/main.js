const div = document.getElementById('productsList')
const btn = document.getElementById('pagi')

let page = 1
let limit = 3

async function getProducts() {
    let skip = (page - 1) * limit;
    try {
        const response = await axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}&skip=${skip}`);
        const data = await response.data;
        db = response.data

        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'boxDiv';
            box.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p class='title'>${item.title}</p>
                <p class='description'>${item.name}</p>
                <button onclick="addToBasket(${item.id})">Add to basket</button>
            `;
            div.appendChild(box);
        });
        page++;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

btn.addEventListener('click', getProducts)

function addToBasket (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart))
}
getProducts()
