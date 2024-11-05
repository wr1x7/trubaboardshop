document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartButton = document.getElementById("cart-button");
    const cartSection = document.getElementById("cart-section");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Функция для обновления корзины
    function updateCart() {
        cartItemsContainer.innerHTML = ""; // Очистить контейнер
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span>${item.name} - ${item.price} ₽</span>
                <button class="remove-button" data-name="${item.name}">Удалить</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        cartTotal.textContent = total;
    }

    // Обработчик клика на кнопки "Купить"
    document.querySelectorAll(".buy-button").forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product");
            const name = product.getAttribute("data-name");
            const price = parseInt(product.getAttribute("data-price"));
            cart.push({ name, price });
            updateCart();
        });
    });

    // Обработчик кнопки "Корзина"
    cartButton.addEventListener("click", () => {
        cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
    });

    // Обработчик кнопки "Удалить" в корзине
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-button")) {
            const name = e.target.getAttribute("data-name");
            const index = cart.findIndex(item => item.name === name);
            if (index !== -1) {
                cart.splice(index, 1); // Удаляем товар из корзины
                updateCart();
            }
        }
    });
});