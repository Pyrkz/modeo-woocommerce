</main>

<style>
.modeo-footer {
    background-color: #f9fafb;
    margin-top: auto;
}

.modeo-footer-container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (min-width: 640px) {
    .modeo-footer-container {
        padding: 0 1.5rem;
    }
}

@media (min-width: 1024px) {
    .modeo-footer-container {
        padding: 0 2rem;
    }
}

.modeo-footer-main {
    padding-top: 2rem;
    padding-bottom: 1.5rem;
}

@media (min-width: 768px) {
    .modeo-footer-main {
        padding-top: 3rem;
        padding-bottom: 2rem;
    }
}

@media (min-width: 1024px) {
    .modeo-footer-main {
        padding-top: 4rem;
        padding-bottom: 2rem;
    }
}

.modeo-footer-columns {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

@media (min-width: 768px) {
    .modeo-footer-columns {
        flex-direction: row;
        justify-content: space-between;
        gap: 2rem;
    }
}

@media (min-width: 1024px) {
    .modeo-footer-columns {
        gap: 4rem;
    }
}

.modeo-footer-column {
    flex: 1;
    min-width: 0;
}

.modeo-footer-title {
    font-size: 1rem;
    font-weight: bold;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin-bottom: 1.5rem;
}

.modeo-footer-nav {
    display: flex;
    flex-direction: column;
}

.modeo-footer-nav a {
    display: block;
    font-size: 0.875rem;
    color: #4b5563;
    text-decoration: none;
    margin-bottom: 12px;
    transition: color 0.2s ease;
}

.modeo-footer-nav a:hover {
    color: #111827;
}

.modeo-footer-payments-social {
    padding: 1.5rem 0;
    border-top: 1px solid #e5e7eb;
}

@media (min-width: 768px) {
    .modeo-footer-payments-social {
        padding: 2rem 0;
    }
}

.modeo-footer-payments-social-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.modeo-footer-payments {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.modeo-footer-payments img {
    height: 2rem;
    width: auto;
    object-fit: contain;
}

.modeo-footer-social {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
}

@media (min-width: 768px) {
    .modeo-footer-social {
        gap: 1rem;
    }
}

.modeo-footer-social-line {
    height: 1px;
    background-color: #d1d5db;
    flex: 1;
}

.modeo-footer-social-icons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.modeo-footer-social-icon {
    padding: 0.5rem;
    color: #4b5563;
    text-decoration: none;
    transition: all 0.2s ease;
    border-radius: 50%;
}

.modeo-footer-social-icon:hover {
    color: #111827;
    background-color: #f3f4f6;
}

.modeo-footer-social-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
}

.modeo-footer-legal {
    border-top: 1px solid #e5e7eb;
    padding: 1rem 0;
}

@media (min-width: 768px) {
    .modeo-footer-legal {
        padding: 1.5rem 0;
    }
}

.modeo-footer-legal-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

@media (min-width: 1024px) {
    .modeo-footer-legal-inner {
        flex-direction: row;
    }
}

.modeo-footer-copyright {
    font-size: 0.875rem;
    color: #6b7280;
    order: 2;
}

@media (min-width: 1024px) {
    .modeo-footer-copyright {
        order: 1;
    }
}

.modeo-footer-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #6b7280;
    order: 1;
}

@media (min-width: 768px) {
    .modeo-footer-links {
        gap: 1rem;
    }
}

@media (min-width: 1024px) {
    .modeo-footer-links {
        gap: 2rem;
        order: 2;
    }
}

.modeo-footer-links a {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s ease;
}

.modeo-footer-links a:hover {
    color: #374151;
}

.modeo-footer-country {
    color: #9ca3af;
}
</style>

<!-- Footer Section - Matching Next.js Design -->
<footer class="modeo-footer">
    <div class="modeo-footer-container">
        
        <!-- Main Footer Content -->
        <div class="modeo-footer-main">
            <div class="modeo-footer-columns">
                
                <!-- SKLEP Section -->
                <div class="modeo-footer-column">
                    <h4 class="modeo-footer-title">SKLEP</h4>
                    <nav class="modeo-footer-nav">
                        <a href="<?php echo esc_url(home_url('/nowosci')); ?>">Nowości</a>
                        <a href="<?php echo esc_url(home_url('/kolekcje')); ?>">Kolekcje</a>
                        <a href="<?php echo esc_url(home_url('/sklep/koszulki')); ?>">Koszulki</a>
                        <a href="<?php echo esc_url(home_url('/sklep/bluzy')); ?>">Bluzy</a>
                        <a href="<?php echo esc_url(home_url('/sklep/polary')); ?>">Polary</a>
                        <a href="<?php echo esc_url(home_url('/sklep/kurtki')); ?>">Kurtki</a>
                        <a href="<?php echo esc_url(home_url('/sklep/akcesoria')); ?>">Akcesoria</a>
                    </nav>
                </div>
                
                <!-- POPULARNE Section -->
                <div class="modeo-footer-column">
                    <h4 class="modeo-footer-title">POPULARNE</h4>
                    <nav class="modeo-footer-nav">
                        <a href="<?php echo esc_url(home_url('/sklep/sezonowe-hity')); ?>">Sezonowe hity</a>
                        <a href="<?php echo esc_url(home_url('/sklep/must-have')); ?>">Must-Have produkty</a>
                        <a href="<?php echo esc_url(home_url('/sklep/dzianina')); ?>">Przytulne swetry</a>
                        <a href="<?php echo esc_url(home_url('/sklep/modne-akcesoria')); ?>">Modne akcesoria</a>
                    </nav>
                </div>
                
                <!-- WSPARCIE Section -->
                <div class="modeo-footer-column">
                    <h4 class="modeo-footer-title">WSPARCIE</h4>
                    <nav class="modeo-footer-nav">
                        <a href="<?php echo esc_url(home_url('/kontakt')); ?>">Kontakt</a>
                        <a href="<?php echo esc_url(home_url('/moje-konto')); ?>">Konto</a>
                        <a href="<?php echo esc_url(home_url('/dostawa-i-odbiory')); ?>">Dostawa i odbior</a>
                        <a href="<?php echo esc_url(home_url('/zwroty')); ?>">Zwroty</a>
                    </nav>
                </div>
                
                <!-- INFO Section -->
                <div class="modeo-footer-column">
                    <h4 class="modeo-footer-title">INFO</h4>
                    <nav class="modeo-footer-nav">
                        <a href="<?php echo esc_url(home_url('/o-nas')); ?>">O nas</a>
                        <a href="<?php echo esc_url(home_url('/dla-firm')); ?>">Współpraca</a>
                    </nav>
                </div>
                
            </div>
        </div>

        <!-- Payment Methods and Social Media -->
        <div class="modeo-footer-payments-social">
            <div class="modeo-footer-payments-social-inner">
                
                <!-- Payment Methods -->
                <div class="modeo-footer-payments">
                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/platnosci-loga.webp" 
                         alt="Akceptowane metody płatności: Visa, Apple Pay, Google Pay, Klarna, Mastercard, PayPal, BLIK" 
                         loading="lazy">
                </div>
                
                <!-- Social Media -->
                <div class="modeo-footer-social">
                    <div class="modeo-footer-social-line"></div>
                    <div class="modeo-footer-social-icons">
                        <a href="https://www.facebook.com/modeopolska" target="_blank" rel="noopener noreferrer" 
                           class="modeo-footer-social-icon" aria-label="Odwiedź nas na Facebook">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/modeo_nadruki/" target="_blank" rel="noopener noreferrer" 
                           class="modeo-footer-social-icon" aria-label="Odwiedź nas na Instagram">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/modeo-pl/" target="_blank" rel="noopener noreferrer" 
                           class="modeo-footer-social-icon" aria-label="Odwiedź nas na LinkedIn">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="modeo-footer-social-line"></div>
                </div>
                
            </div>
        </div>

        <!-- Bottom Legal Links and Copyright -->
        <div class="modeo-footer-legal">
            <div class="modeo-footer-legal-inner">
                <p class="modeo-footer-copyright">
                    &copy; <?php echo date('Y'); ?> Modeo.pl
                </p>
                <div class="modeo-footer-links">
                    <a href="<?php echo esc_url(home_url('/polityka-prywatnosci')); ?>">Polityka prywatności</a>
                    <a href="<?php echo esc_url(home_url('/regulamin')); ?>">Regulamin</a>
                    <a href="<?php echo esc_url(home_url('/mapa-strony')); ?>">Mapa strony</a>
                    <span class="modeo-footer-country">Polska</span>
                </div>
            </div>
        </div>
        
    </div>
</footer>

<?php wp_footer(); ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // User dropdown functionality - identyczne jak w Next.js UserMenu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = dropdownMenu.classList.contains('hidden') || 
                            dropdownMenu.style.display === 'none' || 
                            window.getComputedStyle(dropdownMenu).display === 'none';
            
            if (isHidden) {
                dropdownMenu.classList.remove('hidden');
                dropdownMenu.style.display = 'block';
                if (dropdownArrow) dropdownArrow.classList.add('rotate-180');
                console.log('Showing dropdown');
            } else {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.style.display = 'none';
                if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
                console.log('Hiding dropdown');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.style.display = 'none';
                if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
            }
        });
        
        // Close dropdown when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownMenu.classList.add('hidden');
                dropdownMenu.style.display = 'none';
                if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
            }
        });
    }
    
    // Simplified Megamenu functionality - CSS handles hover, JS handles mobile
    const megamenuContainers = document.querySelectorAll('.megamenu-container');
    
    megamenuContainers.forEach(container => {
        const trigger = container.querySelector('.megamenu-trigger');
        const menu = container.querySelector('.megamenu');
        const arrow = container.querySelector('.megamenu-arrow');
        
        if (trigger && menu) {
            // Only handle mobile click events - CSS handles desktop hover
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    const isHidden = menu.classList.contains('hidden');
                    
                    // Hide all other menus
                    megamenuContainers.forEach(otherContainer => {
                        if (otherContainer !== container) {
                            const otherMenu = otherContainer.querySelector('.megamenu');
                            const otherArrow = otherContainer.querySelector('.megamenu-arrow');
                            if (otherMenu) {
                                otherMenu.classList.add('hidden');
                                if (otherArrow) otherArrow.classList.remove('rotate-180');
                            }
                        }
                    });
                    
                    // Toggle current menu
                    if (isHidden) {
                        menu.classList.remove('hidden');
                        if (arrow) arrow.classList.add('rotate-180');
                    } else {
                        menu.classList.add('hidden');
                        if (arrow) arrow.classList.remove('rotate-180');
                    }
                }
            });
            
            // Desktop: CSS handles everything, just ensure menu isn't hidden by default
            if (window.innerWidth > 768) {
                menu.classList.remove('hidden');
            }
        }
    });
    
    // Close all megamenus when pressing escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            megamenuContainers.forEach(container => {
                const menu = container.querySelector('.megamenu');
                const arrow = container.querySelector('.megamenu-arrow');
                if (menu) {
                    menu.classList.add('hidden');
                    if (arrow) arrow.classList.remove('rotate-180');
                }
            });
        }
    });
    
    // Close all megamenus when clicking outside
    document.addEventListener('click', function(e) {
        let clickedInsideMenu = false;
        megamenuContainers.forEach(container => {
            if (container.contains(e.target)) {
                clickedInsideMenu = true;
            }
        });
        
        if (!clickedInsideMenu) {
            megamenuContainers.forEach(container => {
                const menu = container.querySelector('.megamenu');
                const arrow = container.querySelector('.megamenu-arrow');
                if (menu) {
                    menu.classList.add('hidden');
                    if (arrow) arrow.classList.remove('rotate-180');
                }
            });
        }
    });
    
    // Enhanced Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
                mobileMenuToggle.classList.add('active');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Mobile navigation submenus
        const mobileNavTriggers = document.querySelectorAll('.mobile-nav-trigger');
        
        mobileNavTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = this.getAttribute('data-target');
                const submenu = document.getElementById(target);
                const arrow = this.querySelector('.mobile-nav-arrow');
                
                if (submenu) {
                    const isHidden = submenu.classList.contains('hidden');
                    
                    // Close all other submenus
                    mobileNavTriggers.forEach(otherTrigger => {
                        if (otherTrigger !== this) {
                            const otherTarget = otherTrigger.getAttribute('data-target');
                            const otherSubmenu = document.getElementById(otherTarget);
                            const otherArrow = otherTrigger.querySelector('.mobile-nav-arrow');
                            
                            if (otherSubmenu && !otherSubmenu.classList.contains('hidden')) {
                                otherSubmenu.classList.add('hidden');
                                if (otherArrow) otherArrow.classList.remove('rotate-180');
                            }
                        }
                    });
                    
                    // Toggle current submenu
                    if (isHidden) {
                        submenu.classList.remove('hidden');
                        if (arrow) arrow.classList.add('rotate-180');
                    } else {
                        submenu.classList.add('hidden');
                        if (arrow) arrow.classList.remove('rotate-180');
                    }
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});
</script>

</body>
</html>