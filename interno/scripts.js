document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUser = null;

    // Atualiza o ícone do carrinho
    function updateCartIcon() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cart.length;
    }

    // Modal de Login/Cadastro
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.getElementById('login-button');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const forgotPassword = document.getElementById('forgot-password');

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const user = users.find(u => u.email === email && bcrypt.compareSync(password, u.password));
        if (user) {
            loggedInUser = user;
            alert('Login realizado com sucesso!');
            loginModal.style.display = 'none';
            updateOrderHistory();
        } else {
            alert('Email ou senha incorretos!');
        }
    });

    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ email, password: hashedPassword, orders: [] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
    });

    forgotPassword.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Um email de recuperação foi enviado para você.');
    });

    document.addEventListener('DOMContentLoaded', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let loggedInUser = null;
    
        // Atualiza o ícone do carrinho
        function updateCartIcon() {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.length;
        }
    
        // Modal de Login/Cadastro
        const loginModal = document.getElementById('login-modal');
        const loginButton = document.getElementById('login-button');
        const closeModal = document.querySelector('.close');
        const loginForm = document.getElementById('login-form');
        const signupLink = document.getElementById('signup-link');
        const forgotPassword = document.getElementById('forgot-password');
    
        loginButton.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
    
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const user = users.find(u => u.email === email && bcrypt.compareSync(password, u.password));
            if (user) {
                loggedInUser = user;
                alert('Login realizado com sucesso!');
                loginModal.style.display = 'none';
                updateOrderHistory();
            } else {
                alert('Email ou senha incorretos!');
            }
        });
    
        signupLink.addEventListener('click', function(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const hashedPassword = bcrypt.hashSync(password, 10);
            users.push({ email, password: hashedPassword, orders: [] });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Cadastro realizado com sucesso!');
        });
    
        forgotPassword.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Um email de recuperação foi enviado para você.');
        });
    
        // Destaques
        const highlights = [
            { name: 'Hambúrguer Simples', price: 8.50, category: 'burgers' },
            { name: 'Coca-Cola 500ml', price: 6.50, category: 'drinks' },
            { name: 'Batata + Alho (500g)', price: 12.00, category: 'fries' }
        ];
    
        const highlightItems = document.querySelector('.highlight-items');
        highlights.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `<h3>${item.name}</h3><p>R$ ${item.price.toFixed(2)}</p><button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Adicionar ao Carrinho</button>`;
            highlightItems.appendChild(div);
        });
    
        // Categorias
        const categories = {
            burgers: [
                { name: 'X-Tudo', price: 14.90 },
                { name: 'X-Salada', price: 13.90 },
                { name: 'X-Bacon', price: 15.00 },
                { name: 'Hambúrguer Simples', price: 8.50 }
            ],
            pizzas: [
                { name: 'Calabresa', price: 50.90 },
                { name: 'Frango + Catupiry', price: 65.50 },
                { name: 'Marguerita', price: 56.90 },
                { name: 'Muçarela', price: 50.00 },
                { name: '4 Queijos', price: 85.00 }
            ],
            pastries: [
                { name: 'Carne', price: 12.00 },
                { name: 'Carne + Milho', price: 14.00 },
                { name: 'Queijo + Presunto', price: 16.00 }
            ],
            drinks: [
                { name: 'Coca-Cola 500ml', price: 6.50 },
                { name: 'Guaraná Antarctica', price: 10.90 },
                { name: 'Guaracamp', price: 4.50 }
            ],
            fries: [
                { name: 'Batata + Linguiça (500g)', price: 15.50 },
                { name: 'Batata + Queijo/Linguiça (500g)', price: 15.00 },
                { name: 'Batata + Bacon/Linguiça (500g)', price: 16.90 },
                { name: 'Batata + Cheddar/Bacon (500g)', price: 25.50 },
                { name: 'Batata + Frango (500g)', price: 17.00 },
                { name: 'Batata + Alho (500g)', price: 12.00 }
            ]
        };
    
        const categoryButtons = document.querySelectorAll('.category-buttons button');
        const categoryItems = document.querySelector('.category-items');
    
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                categoryItems.innerHTML = '';
                categories[category].forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'item';
                    div.innerHTML = `<h3>${item.name}</h3><p>R$ ${item.price.toFixed(2)}</p><button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Adicionar ao Carrinho</button>`;
                    categoryItems.appendChild(div);
                });
            });
        });
    
        // Carrinho
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutButton = document.getElementById('checkout');
    
        function updateCart() {
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button>`;
                cartItems.appendChild(li);
                total += item.price;
            });
            cartTotal.textContent = total.toFixed(2);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();
        }
    
        function addToCart(name, price) {
            cart.push({ name, price });
            updateCart();
        }
    
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }
    
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('add-to-cart')) {
                const name = event.target.getAttribute('data-name');
                const price = parseFloat(event.target.getAttribute('data-price'));
                addToCart(name, price);
            }
        });
    
        // Finalizar Pedido
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            const name = document.getElementById('name').value;
            const cpf = document.getElementById('cpf').value;
            const phone = document.getElementById('phone').value;
            const cep = document.getElementById('cep').value;
            const address = document.getElementById('address').value;
            const frete = parseFloat(document.getElementById('frete').textContent);
    
            if (!name || !cpf || !phone || !cep || !address) {
                alert('Preencha todos os campos de entrega!');
                return;
            }
    
            const total = parseFloat(cartTotal.textContent) + frete;
            const message = `Pedido:\n${cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('\n')}\nTotal: R$ ${total.toFixed(2)}\nFrete: R$ ${frete.toFixed(2)}\n\nCliente: ${name}\nCPF: ${cpf}\nTelefone: ${phone}\nCEP: ${cep}\nEndereço: ${address}`;
    
            const whatsappURL = `https://wa.me/SEUNUMERO?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
    
            if (loggedInUser) {
                loggedInUser.orders.push({ items: cart, total, date: new Date().toLocaleString() });
                localStorage.setItem('users', JSON.stringify(users));
                updateOrderHistory();
            }
    
            cart.length = 0;
            updateCart();
        });
    
        // Histórico de Pedidos
        function updateOrderHistory() {
            if (!loggedInUser) return;
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            loggedInUser.orders.forEach(order => {
                const li = document.createElement('li');
                li.innerHTML = `Pedido em ${order.date}:<br>${order.items.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('<br>')}<br>Total: R$ ${order.total.toFixed(2)}`;
                historyList.appendChild(li);
            });
        }
    
        // Cálculo de Frete
        const deliveryForm = document.getElementById('delivery-info');
        const freteValue = document.getElementById('frete');
    
        deliveryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const cep = document.getElementById('cep').value;
            const frete = calcularFrete(cep);
            freteValue.textContent = frete.toFixed(2);
        });
    
        function calcularFrete(cep) {
            // Simulação de cálculo de frete
            return 10.00; // Valor fixo para exemplo
        }
    
        // Inicialização
        updateCartIcon();
        updateOrderHistory();
    });
});