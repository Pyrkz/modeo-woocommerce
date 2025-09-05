/**
 * Sidebar Cart Implementation for WordPress
 * Pure CSS implementation - no Tailwind dependencies
 */
class SidebarCart {
    constructor() {
        this.isOpen = false;
        this.isLoading = false;
        this.isUpdating = false;
        
        this.initializeCart();
        this.bindEvents();
        this.initializeBodyScrollLock();
    }

    initializeCart() {
        this.createCartStructure();
        this.loadCartData();
    }

    createCartStructure() {
        // Remove existing cart if present
        const existingCart = document.getElementById('sidebar-cart');
        if (existingCart) {
            existingCart.remove();
        }

        // Create cart HTML structure
        const cartHTML = `
            <!-- Overlay -->
            <div id="cart-overlay" aria-hidden="true"></div>

            <!-- Sidebar Cart -->
            <div id="sidebar-cart" aria-label="Koszyk" aria-modal="true" role="dialog">
                <div class="cart-header">
                    <h2 id="cart-title">Koszyk (0)</h2>
                    <button id="cart-close" aria-label="Zamknij koszyk">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Content -->
                <div id="cart-content">
                    <!-- Loading skeleton -->
                    <div id="cart-loading" class="cart-element-hidden">
                        ${this.createLoadingSkeleton()}
                    </div>

                    <!-- Error state -->
                    <div id="cart-error" class="cart-element-hidden">
                        <div class="error-content">
                            <p id="error-message"></p>
                            <button id="retry-button">Spróbuj ponownie</button>
                        </div>
                    </div>

                    <!-- Empty state -->
                    <div id="cart-empty" class="cart-element-hidden">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2"></path>
                        </svg>
                        <h3>Twój koszyk jest pusty</h3>
                        <p>Dodaj produkty do koszyka, aby kontynuować zakupy</p>
                        <button id="continue-shopping">Kontynuuj zakupy</button>
                    </div>

                    <!-- Cart items -->
                    <div id="cart-items" class="cart-element-hidden">
                        <div id="items-container">
                            <!-- Cart items will be inserted here -->
                        </div>
                    </div>
                </div>

                <!-- Footer with summary -->
                <div id="cart-footer" class="cart-element-hidden">
                    <div class="cart-summary">
                        <div id="cart-summary"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    createLoadingSkeleton() {
        let skeletonHTML = '';
        for (let i = 0; i < 3; i++) {
            skeletonHTML += `
                <div class="loading-skeleton animate-pulse">
                    <div class="loading-skeleton-image"></div>
                    <div class="loading-skeleton-content">
                        <div class="loading-skeleton-line"></div>
                        <div class="loading-skeleton-line short"></div>
                        <div class="loading-skeleton-controls">
                            <div class="loading-skeleton-control"></div>
                            <div class="loading-skeleton-price"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return skeletonHTML;
    }

    bindEvents() {
        console.log('SidebarCart: Binding events...');
        
        // Cart trigger buttons
        document.addEventListener('click', (e) => {
            // Only log clicks on cart-related elements to reduce noise
            if (e.target.id?.includes('cart') || e.target.closest('[id*="cart"]')) {
                console.log('SidebarCart: Click detected on cart element:', e.target);
            }
            
            if (e.target.matches('#cart-trigger, #mobile-cart-trigger') || 
                e.target.closest('#cart-trigger, #mobile-cart-trigger')) {
                console.log('SidebarCart: Cart trigger clicked!');
                e.preventDefault();
                this.openCart();
            }
        });

        // Close button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#cart-close') || e.target.closest('#cart-close')) {
                this.closeCart();
            }
        });

        // Overlay click
        document.addEventListener('click', (e) => {
            if (e.target.matches('#cart-overlay')) {
                this.closeCart();
            }
        });

        // Continue shopping button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#continue-shopping')) {
                this.closeCart();
            }
        });

        // Retry button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#retry-button')) {
                this.loadCartData();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });

        // Item quantity and remove buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quantity-decrease')) {
                this.updateQuantity(e.target.dataset.key, parseInt(e.target.dataset.quantity) - 1);
            }
            if (e.target.matches('.quantity-increase')) {
                this.updateQuantity(e.target.dataset.key, parseInt(e.target.dataset.quantity) + 1);
            }
            if (e.target.matches('.remove-item') || e.target.closest('.remove-item')) {
                this.removeItem(e.target.dataset.key || e.target.closest('.remove-item').dataset.key);
            }
        });
    }

    initializeBodyScrollLock() {
        this.originalBodyOverflow = '';
    }

    async openCart() {
        console.log('SidebarCart: Opening cart...');
        
        // Check if cart elements still exist in DOM
        const cartTrigger = document.getElementById('cart-trigger');
        const mobileCartTrigger = document.getElementById('mobile-cart-trigger');
        const overlay = document.getElementById('cart-overlay');
        const cart = document.getElementById('sidebar-cart');

        console.log('SidebarCart: DOM Elements check:');
        console.log('- cart-trigger:', !!cartTrigger);
        console.log('- mobile-cart-trigger:', !!mobileCartTrigger);
        console.log('- cart-overlay:', !!overlay);
        console.log('- sidebar-cart:', !!cart);
        
        this.isOpen = true;
        this.originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        if (overlay && cart) {
            overlay.classList.add('bg-opacity-50');
            overlay.setAttribute('aria-hidden', 'false');

            cart.classList.add('translate-x-0');
            console.log('SidebarCart: Cart opened successfully');

            // Refresh cart data when opened
            await this.loadCartData();
        } else {
            console.error('SidebarCart: Cart elements missing from DOM!');
            // Attempt to recreate cart structure if missing
            if (!cart || !overlay) {
                console.log('SidebarCart: Attempting to recreate cart structure...');
                this.createCartStructure();
                // Try again with new elements
                const newOverlay = document.getElementById('cart-overlay');
                const newCart = document.getElementById('sidebar-cart');
                if (newOverlay && newCart) {
                    newOverlay.classList.add('bg-opacity-50');
                    newOverlay.setAttribute('aria-hidden', 'false');
                    newCart.classList.add('translate-x-0');
                    await this.loadCartData();
                }
            }
        }
    }

    closeCart() {
        this.isOpen = false;
        document.body.style.overflow = this.originalBodyOverflow;

        const overlay = document.getElementById('cart-overlay');
        const cart = document.getElementById('sidebar-cart');

        overlay.classList.remove('bg-opacity-50');
        overlay.setAttribute('aria-hidden', 'true');

        cart.classList.remove('translate-x-0');
    }

    async loadCartData() {
        this.isLoading = true;
        this.showLoading();

        try {
            const response = await fetch('/wp-json/wc/store/cart', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.renderCart(data);
            this.updateCartCounts(data.items_count || 0);
        } catch (error) {
            console.error('Error loading cart:', error);
            this.showError(error.message);
        } finally {
            this.isLoading = false;
        }
    }

    showLoading() {
        this.hideAllStates();
        document.getElementById('cart-loading').classList.remove('cart-element-hidden');
    }

    showError(message) {
        this.hideAllStates();
        const errorContainer = document.getElementById('cart-error');
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorContainer.classList.remove('cart-element-hidden');
    }

    hideAllStates() {
        document.getElementById('cart-loading').classList.add('cart-element-hidden');
        document.getElementById('cart-error').classList.add('cart-element-hidden');
        document.getElementById('cart-empty').classList.add('cart-element-hidden');
        document.getElementById('cart-items').classList.add('cart-element-hidden');
        document.getElementById('cart-footer').classList.add('cart-element-hidden');
    }

    renderCart(cartData) {
        const items = cartData.items || [];
        const itemCount = cartData.items_count || 0;

        // Update cart title
        document.getElementById('cart-title').textContent = `Koszyk (${itemCount})`;

        if (items.length === 0) {
            this.hideAllStates();
            document.getElementById('cart-empty').classList.remove('cart-element-hidden');
            return;
        }

        // Show items
        this.hideAllStates();
        document.getElementById('cart-items').classList.remove('cart-element-hidden');
        document.getElementById('cart-footer').classList.remove('cart-element-hidden');

        this.renderCartItems(items);
        this.renderCartSummary(cartData.totals);
    }

    renderCartItems(items) {
        const container = document.getElementById('items-container');
        container.innerHTML = '';

        items.forEach(item => {
            const itemHTML = this.createCartItemHTML(item);
            container.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    createCartItemHTML(item) {
        const imageUrl = item.images?.[0]?.thumbnail || item.images?.[0]?.src || '';
        const imageAlt = item.images?.[0]?.alt || item.name;
        const unitPrice = parseInt(item.prices.price) / 100;
        const totalPrice = parseInt(item.totals.line_total) / 100;

        return `
            <div class="cart-item ${this.isUpdating ? 'updating' : ''}">
                <!-- Product Image -->
                <div class="cart-item-image">
                    ${imageUrl ? 
                        `<img src="${imageUrl}" alt="${imageAlt}">` :
                        `<div class="cart-item-image-placeholder">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                            </svg>
                        </div>`
                    }
                </div>

                <!-- Product Details -->
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    
                    ${item.sku ? `<p class="cart-item-sku">SKU: ${item.sku}</p>` : ''}

                    <div class="cart-item-controls">
                        <!-- Quantity Controls -->
                        <div class="quantity-controls">
                            <button class="quantity-decrease"
                                    data-key="${item.key}" 
                                    data-quantity="${item.quantity}"
                                    ${this.isUpdating || item.quantity <= 1 ? 'disabled' : ''}
                                    aria-label="Zmniejsz ilość">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            
                            <span class="quantity-display">${item.quantity}</span>
                            
                            <button class="quantity-increase"
                                    data-key="${item.key}" 
                                    data-quantity="${item.quantity}"
                                    ${this.isUpdating ? 'disabled' : ''}
                                    aria-label="Zwiększ ilość">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Price -->
                        <div class="cart-item-price">
                            <p class="cart-item-total">
                                ${totalPrice.toFixed(2)} ${item.totals.currency_symbol}
                            </p>
                            ${item.quantity > 1 ? 
                                `<p class="cart-item-unit">
                                    ${unitPrice.toFixed(2)} ${item.prices.currency_symbol} / szt.
                                </p>` : ''
                            }
                        </div>
                    </div>
                </div>

                <!-- Remove Button -->
                <button class="remove-item"
                        data-key="${item.key}"
                        ${this.isUpdating ? 'disabled' : ''}
                        aria-label="Usuń ${item.name} z koszyka">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    renderCartSummary(totals) {
        if (!totals) return;

        const totalPrice = parseInt(totals.total_price) / 100;
        const subtotal = parseInt(totals.total_items) / 100;
        const shipping = totals.total_shipping ? parseInt(totals.total_shipping) / 100 : 0;
        const tax = totals.total_tax ? parseInt(totals.total_tax) / 100 : 0;

        let summaryHTML = `
            <!-- Subtotal -->
            <div class="cart-summary-row">
                <span class="cart-summary-label">Suma częściowa</span>
                <span class="cart-summary-value">
                    ${subtotal.toFixed(2)} ${totals.currency_symbol}
                </span>
            </div>
        `;

        // Shipping
        if (shipping > 0) {
            summaryHTML += `
                <div class="cart-summary-row">
                    <span class="cart-summary-label">Wysyłka</span>
                    <span class="cart-summary-value">
                        ${shipping === 0 ? 'Darmowa' : `${shipping.toFixed(2)} ${totals.currency_symbol}`}
                    </span>
                </div>
            `;
        }

        // Tax
        if (tax > 0) {
            summaryHTML += `
                <div class="cart-summary-row">
                    <span class="cart-summary-label">Podatek</span>
                    <span class="cart-summary-value">
                        ${tax.toFixed(2)} ${totals.currency_symbol}
                    </span>
                </div>
            `;
        }

        // Total
        summaryHTML += `
            <div class="cart-total">
                <span class="cart-total-label">Razem</span>
                <span class="cart-total-value">
                    ${totalPrice.toFixed(2)} ${totals.currency_symbol}
                </span>
            </div>

            <!-- Checkout Button -->
            <button id="checkout-button" 
                    ${this.isUpdating ? 'disabled' : ''}
                    onclick="window.location.href='${typeof wc_cart_vars !== 'undefined' ? wc_cart_vars.checkout_url : '/checkout'}'">
                ${this.isUpdating ? 'Przetwarzanie...' : 'Przejdź do kasy'}
            </button>

            <!-- Additional Info -->
            <p class="cart-info">
                Koszty wysyłki i podatki zostaną obliczone przy kasie
            </p>
        `;

        document.getElementById('cart-summary').innerHTML = summaryHTML;
    }

    async updateQuantity(itemKey, quantity) {
        if (quantity < 1 || this.isUpdating) return;

        this.isUpdating = true;
        this.updateLoadingState();

        try {
            const response = await fetch(`/wp-json/wc/store/cart/items/${itemKey}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await this.loadCartData();
        } catch (error) {
            console.error('Error updating quantity:', error);
            this.showError('Błąd aktualizacji koszyka');
        } finally {
            this.isUpdating = false;
        }
    }

    async removeItem(itemKey) {
        if (this.isUpdating) return;

        this.isUpdating = true;
        this.updateLoadingState();

        try {
            const response = await fetch(`/wp-json/wc/store/cart/items/${itemKey}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await this.loadCartData();
        } catch (error) {
            console.error('Error removing item:', error);
            this.showError('Błąd usuwania z koszyka');
        } finally {
            this.isUpdating = false;
        }
    }

    updateLoadingState() {
        // Update opacity for cart items
        const container = document.getElementById('items-container');
        if (container) {
            const items = container.querySelectorAll('.cart-item');
            items.forEach(item => {
                if (this.isUpdating) {
                    item.classList.add('updating');
                } else {
                    item.classList.remove('updating');
                }
            });
        }
    }

    updateCartCounts(count) {
        // Update cart count badges in header
        const badges = document.querySelectorAll('.cart-count-badge');
        badges.forEach(badge => {
            badge.textContent = count > 99 ? '99+' : count;
            if (count > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });

        // Update cart button aria-labels
        const cartButtons = document.querySelectorAll('#cart-trigger, #mobile-cart-trigger');
        cartButtons.forEach(button => {
            const baseLabel = 'Koszyk';
            if (count > 0) {
                const productText = count === 1 ? 'produkt' : 'produkty';
                button.setAttribute('aria-label', `${baseLabel} (${count} ${productText})`);
            } else {
                button.setAttribute('aria-label', baseLabel);
            }
        });
    }
}

// Initialize sidebar cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('SidebarCart: Initializing...');
    try {
        const cart = new SidebarCart();
        console.log('SidebarCart: Initialized successfully');
        
        // Periodic health check to detect if cart elements disappear
        setInterval(() => {
            const cartTrigger = document.getElementById('cart-trigger');
            const mobileCartTrigger = document.getElementById('mobile-cart-trigger');
            const overlay = document.getElementById('cart-overlay');
            const sidebarCart = document.getElementById('sidebar-cart');
            
            if (!cartTrigger && !mobileCartTrigger) {
                console.warn('SidebarCart: Cart trigger buttons missing from DOM!');
            }
            if (!overlay || !sidebarCart) {
                console.warn('SidebarCart: Cart overlay or sidebar missing from DOM!');
                // Attempt to recreate if missing
                cart.createCartStructure();
            }
        }, 30000); // Check every 30 seconds
        
    } catch (error) {
        console.error('SidebarCart: Failed to initialize:', error);
    }
});