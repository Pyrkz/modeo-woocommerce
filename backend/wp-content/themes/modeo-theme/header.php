<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('antialiased min-h-screen bg-gray-50 flex flex-col'); ?>>
<?php wp_body_open(); ?>

<!-- Header Section - IDENTYCZNE jak Next.js -->
<header class="bg-white shadow-sm border-b sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-16">
            <!-- Left Column: Mobile Menu Button & Brand -->
            <div class="flex items-center flex-1">
                <!-- Mobile Menu Button -->
                <div class="md:hidden mr-4">
                    <button type="button" 
                            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 mobile-menu-toggle p-2"
                            aria-label="Toggle menu">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>

                <!-- Brand - Always on the left -->
                <div class="flex items-center">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="no-underline">
                        <h1 class="text-2xl font-bold text-primary cursor-pointer hover:text-primary transition-colors no-underline">
                            modeo.
                        </h1>
                    </a>
                </div>
            </div>

            <!-- Middle Column: Desktop Navigation -->
            <nav class="hidden md:flex space-x-8 justify-center flex-1 relative z-20">
                <!-- Sklep Megamenu -->
                <div class="relative megamenu-container">
                    <a href="<?php 
                        $store_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/sklep' : 'https://modeo.pl/sklep';
                        echo esc_url($store_url);
                    ?>" 
                       class="font-medium transition-colors text-gray-800 hover:text-primary flex items-center space-x-1 megamenu-trigger">
                        <span>Sklep</span>
                        <svg class="w-4 h-4 transition-transform duration-200 megamenu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    
                    <!-- Invisible bridge to prevent menu closing - like Next.js -->
                    <div class="megamenu-bridge"></div>
                    
                    <!-- Enhanced Sklep Megamenu -->
                    <div class="fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 transition-all duration-200 ease-out megamenu hidden">
                        <div class="w-full px-4 py-6 md:px-8 md:py-8">
                            <div class="max-w-screen-2xl mx-auto">
                                <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                                    
                                    <!-- Odzież podstawowa -->
                                    <div class="space-y-4 md:pr-8 md:border-r border-gray-200">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Odzież podstawowa</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($store_url); ?>/koszulki" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👕</span>
                                                <span class="text-sm">Koszulki</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/bluzy" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧥</span>
                                                <span class="text-sm">Bluzy</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/kurtki" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧥</span>
                                                <span class="text-sm">Kurtki</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/softshelle" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧥</span>
                                                <span class="text-sm">Softshelle</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/polary" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧥</span>
                                                <span class="text-sm">Polary</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Odzież specjalistyczna -->
                                    <div class="space-y-4 md:pr-8 md:border-r border-gray-200">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Odzież specjalistyczna</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($store_url); ?>/ubrania-sportowe" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🏃</span>
                                                <span class="text-sm">Ubrania sportowe</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/ubrania-robocze" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👷</span>
                                                <span class="text-sm">Ubrania robocze</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Akcesoria -->
                                    <div class="space-y-4 md:pr-8 md:border-r border-gray-200">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Akcesoria</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($store_url); ?>/czapki" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧢</span>
                                                <span class="text-sm">Czapki</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/plecaki-torby" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎒</span>
                                                <span class="text-sm">Plecaki i torby</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/akcesoria" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🔧</span>
                                                <span class="text-sm">Akcesoria</span>
                                            </a>
                                            <a href="<?php echo esc_url($store_url); ?>/okulary" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🕶️</span>
                                                <span class="text-sm">Okulary</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Inne kategorie -->
                                    <div class="space-y-4 md:pr-8 md:border-r border-gray-200">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Inne kategorie</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($store_url); ?>/dom-ogrod" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🏠</span>
                                                <span class="text-sm">Dom i ogród</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- CTA Section -->
                                    <div class="md:pl-0">
                                        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 h-full flex flex-col justify-center items-center text-center min-h-[280px]">
                                            <div class="mb-4">
                                                <svg class="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                                </svg>
                                            </div>
                                            <h3 class="text-xl font-bold text-gray-900 mb-2">Wszystkie produkty</h3>
                                            <p class="text-sm text-gray-600 mb-6 max-w-xs">Odkryj pełną ofertę naszych produktów w sklepie</p>
                                            <a href="<?php echo esc_url($store_url); ?>" class="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors group">
                                                Zobacz sklep
                                                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Na prezent Megamenu -->
                <div class="relative megamenu-container">
                    <a href="<?php 
                        $gift_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/na-prezent' : 'https://modeo.pl/na-prezent';
                        echo esc_url($gift_url);
                    ?>" 
                       class="font-medium transition-colors text-gray-800 hover:text-primary flex items-center space-x-1 megamenu-trigger">
                        <span>Na prezent</span>
                        <svg class="w-4 h-4 transition-transform duration-200 megamenu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    
                    <!-- Invisible bridge to prevent menu closing -->
                    <div class="megamenu-bridge"></div>
                    
                    <!-- Gift Megamenu -->
                    <div class="fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 transition-all duration-200 ease-out megamenu hidden">
                        <div class="w-full px-4 py-6 md:px-8 md:py-8">
                            <div class="max-w-screen-2xl mx-auto">
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    
                                    <!-- Okazje rodzinne -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Okazje rodzinne</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($gift_url); ?>/urodziny" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎂</span>
                                                <span class="text-sm">Urodziny</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/imieniny" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🌹</span>
                                                <span class="text-sm">Imieniny</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/rocznica" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">💕</span>
                                                <span class="text-sm">Rocznica</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/wesele" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">💒</span>
                                                <span class="text-sm">Wesele</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Święta -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Święta</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($gift_url); ?>/boze-narodzenie" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎄</span>
                                                <span class="text-sm">Boże Narodzenie</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/nowy-rok" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎊</span>
                                                <span class="text-sm">Nowy Rok</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/walentynki" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">💝</span>
                                                <span class="text-sm">Walentynki</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Dla rodziny -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Dla rodziny</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($gift_url); ?>/dzien-matki" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👩</span>
                                                <span class="text-sm">Dzień Matki</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/dzien-ojca" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👨</span>
                                                <span class="text-sm">Dzień Ojca</span>
                                            </a>
                                            <a href="<?php echo esc_url($gift_url); ?>/dzien-babci-i-dziadka" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👴</span>
                                                <span class="text-sm">Dzień Babci i Dziadka</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- CTA Section -->
                                    <div class="md:pl-0">
                                        <div class="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-2xl border border-pink-200 h-full flex flex-col justify-center items-center text-center">
                                            <div class="mb-4">
                                                <span class="text-4xl">🎁</span>
                                            </div>
                                            <h3 class="text-xl font-bold text-gray-900 mb-2">Wszystkie okazje</h3>
                                            <p class="text-sm text-gray-600 mb-6 max-w-xs">Znajdź idealny prezent na każdą okazję</p>
                                            <a href="<?php echo esc_url($gift_url); ?>" class="inline-flex items-center justify-center px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors group">
                                                Zobacz wszystkie
                                                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Znakowanie Megamenu -->
                <div class="relative megamenu-container">
                    <a href="<?php 
                        $branding_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/znakowanie' : 'https://modeo.pl/znakowanie';
                        echo esc_url($branding_url);
                    ?>" 
                       class="font-medium transition-colors text-gray-800 hover:text-primary flex items-center space-x-1 megamenu-trigger">
                        <span>Znakowanie</span>
                        <svg class="w-4 h-4 transition-transform duration-200 megamenu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    
                    <!-- Invisible bridge to prevent menu closing -->
                    <div class="megamenu-bridge"></div>
                    
                    <!-- Branding Megamenu -->
                    <div class="fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 transition-all duration-200 ease-out megamenu hidden">
                        <div class="w-full px-4 py-6 md:px-8 md:py-8">
                            <div class="max-w-screen-2xl mx-auto">
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    
                                    <!-- Branże -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Dla branż</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($branding_url); ?>/dla-branz/biznes" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">💼</span>
                                                <span class="text-sm">Biznes</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/dla-branz/restauracja" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🍽️</span>
                                                <span class="text-sm">Restauracja</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/dla-branz/sport" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">⚽</span>
                                                <span class="text-sm">Sport</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/dla-branz/szkola" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎓</span>
                                                <span class="text-sm">Szkoła</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Techniki znakowania -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Techniki</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($branding_url); ?>/haft" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧵</span>
                                                <span class="text-sm">Haft</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/sitodruk" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🖨️</span>
                                                <span class="text-sm">Sitodruk</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/nadruk-cyfrowy" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🖥️</span>
                                                <span class="text-sm">Nadruk cyfrowy</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/grawerowanie" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">⚒️</span>
                                                <span class="text-sm">Grawerowanie</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Materiały -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Materiały</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($branding_url); ?>/bawelna" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🌱</span>
                                                <span class="text-sm">Bawełna</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/poliester" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧪</span>
                                                <span class="text-sm">Poliester</span>
                                            </a>
                                            <a href="<?php echo esc_url($branding_url); ?>/softshell" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🧥</span>
                                                <span class="text-sm">Softshell</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- CTA Section -->
                                    <div class="md:pl-0">
                                        <div class="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200 h-full flex flex-col justify-center items-center text-center">
                                            <div class="mb-4">
                                                <span class="text-4xl">🎨</span>
                                            </div>
                                            <h3 class="text-xl font-bold text-gray-900 mb-2">Znakowanie</h3>
                                            <p class="text-sm text-gray-600 mb-6 max-w-xs">Profesjonalne znakowanie dla Twojej firmy</p>
                                            <a href="<?php echo esc_url($branding_url); ?>" class="inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors group">
                                                Zobacz ofertę
                                                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dla firm Megamenu -->
                <div class="relative megamenu-container">
                    <a href="<?php 
                        $business_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/dla-firm' : 'https://modeo.pl/dla-firm';
                        echo esc_url($business_url);
                    ?>" 
                       class="font-medium transition-colors text-gray-800 hover:text-primary flex items-center space-x-1 megamenu-trigger">
                        <span>Dla firm</span>
                        <svg class="w-4 h-4 transition-transform duration-200 megamenu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    
                    <!-- Invisible bridge to prevent menu closing -->
                    <div class="megamenu-bridge"></div>
                    
                    <!-- Business Megamenu -->
                    <div class="fixed top-16 left-0 w-full bg-white border-t border-gray-200 shadow-xl z-50 transition-all duration-200 ease-out megamenu hidden">
                        <div class="w-full px-4 py-6 md:px-8 md:py-8">
                            <div class="max-w-screen-2xl mx-auto">
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    
                                    <!-- Usługi -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Usługi</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($business_url); ?>/odziez-firmowa" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">👔</span>
                                                <span class="text-sm">Odzież firmowa</span>
                                            </a>
                                            <a href="<?php echo esc_url($business_url); ?>/wlasna-kolekcja" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">🎨</span>
                                                <span class="text-sm">Własna kolekcja</span>
                                            </a>
                                            <a href="<?php echo esc_url($business_url); ?>/dropshipping" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">📦</span>
                                                <span class="text-sm">Dropshipping</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Rozwiązania -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Rozwiązania</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($business_url); ?>/hurtowe-zakupy" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">📊</span>
                                                <span class="text-sm">Zakupy hurtowe</span>
                                            </a>
                                            <a href="<?php echo esc_url($business_url); ?>/konsultacje" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">💬</span>
                                                <span class="text-sm">Konsultacje</span>
                                            </a>
                                            <a href="<?php echo esc_url($business_url); ?>/szybka-dostawa" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">⚡</span>
                                                <span class="text-sm">Szybka dostawa</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Wsparcie -->
                                    <div class="space-y-4">
                                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Wsparcie</h3>
                                        <div class="space-y-3">
                                            <a href="<?php echo esc_url($business_url); ?>/kontakt-biznesowy" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">📞</span>
                                                <span class="text-sm">Kontakt biznesowy</span>
                                            </a>
                                            <a href="<?php echo esc_url($business_url); ?>/faq-biznes" class="flex items-center space-x-3 font-medium text-gray-700 hover:text-primary transition-colors group p-2 rounded-lg hover:bg-gray-50">
                                                <span class="text-primary group-hover:scale-110 transition-transform">❓</span>
                                                <span class="text-sm">FAQ Biznes</span>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- CTA Section -->
                                    <div class="md:pl-0">
                                        <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 h-full flex flex-col justify-center items-center text-center">
                                            <div class="mb-4">
                                                <span class="text-4xl">🏢</span>
                                            </div>
                                            <h3 class="text-xl font-bold text-gray-900 mb-2">Rozwiązania B2B</h3>
                                            <p class="text-sm text-gray-600 mb-6 max-w-xs">Kompleksowe rozwiązania dla Twojego biznesu</p>
                                            <a href="<?php echo esc_url($business_url); ?>" class="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors group">
                                                Dowiedz się więcej
                                                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Other navigation items -->
                <a href="<?php 
                    $about_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/o-nas' : 'https://modeo.pl/o-nas';
                    echo esc_url($about_url);
                ?>" 
                   class="inline-block font-medium transition-colors text-gray-800 hover:text-primary relative z-10"
                   style="cursor: pointer;">
                    O nas
                </a>
                
                <a href="<?php 
                    $blog_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/blog' : 'https://modeo.pl/blog';
                    echo esc_url($blog_url);
                ?>" 
                   class="inline-block font-medium transition-colors text-gray-800 hover:text-primary relative z-10"
                   style="cursor: pointer;">
                    Blog
                </a>
                
                <a href="<?php 
                    $contact_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/kontakt' : 'https://modeo.pl/kontakt';
                    echo esc_url($contact_url);
                ?>" 
                   class="inline-block font-medium transition-colors text-gray-800 hover:text-primary relative z-10"
                   style="cursor: pointer;">
                    Kontakt
                </a>
            </nav>

            <!-- Right Column: User Menu & Cart -->
            <div class="flex items-center gap-4 flex-1 justify-end" style="position: relative;">
                <!-- User Menu -->
                <div class="hidden md:block">
                    <?php if (is_user_logged_in()): 
                        $current_user = wp_get_current_user();
                        $display_name = !empty($current_user->first_name) ? $current_user->first_name : $current_user->display_name;
                    ?>
                        <!-- Logged in user dropdown -->
                        <div class="relative user-dropdown">
                            <button class="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-1 dropdown-toggle" type="button">
                                <!-- User Avatar Icon -->
                                <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                                    <?php 
                                        // Get user initials like Next.js UserMenu
                                        $first_name = get_user_meta($current_user->ID, 'first_name', true);
                                        $last_name = get_user_meta($current_user->ID, 'last_name', true);
                                        $initials = '';
                                        
                                        if ($first_name && $last_name) {
                                            $initials = strtoupper(substr($first_name, 0, 1) . substr($last_name, 0, 1));
                                        } elseif ($first_name) {
                                            $initials = strtoupper(substr($first_name, 0, 1));
                                        } elseif ($last_name) {
                                            $initials = strtoupper(substr($last_name, 0, 1));
                                        } else {
                                            $initials = strtoupper(substr($current_user->display_name, 0, 1));
                                        }
                                        
                                        echo esc_html($initials);
                                    ?>
                                </div>
                                <span class="font-medium"><?php echo esc_html($display_name); ?></span>
                                <svg class="w-4 h-4 transition-transform dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <div class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-48 dropdown-menu hidden z-50 animate-scale-in">
                                <div class="p-3 border-b border-gray-100">
                                    <p class="font-medium text-gray-900"><?php echo esc_html($current_user->display_name); ?></p>
                                    <?php if ($current_user->user_email): ?>
                                        <p class="text-sm text-gray-600"><?php echo esc_html($current_user->user_email); ?></p>
                                    <?php endif; ?>
                                </div>
                                
                                <div class="py-2">
                                    <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" 
                                       class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Moje konto
                                    </a>
                                    
                                    <a href="<?php echo esc_url(wc_get_endpoint_url('orders', '', wc_get_page_permalink('myaccount'))); ?>" 
                                       class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Moje zamówienia
                                    </a>
                                    
                                    <a href="<?php echo esc_url(wc_get_endpoint_url('edit-address', '', wc_get_page_permalink('myaccount'))); ?>" 
                                       class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Adresy
                                    </a>
                                </div>
                                
                                <div class="border-t border-gray-100 py-2">
                                    <a href="<?php echo wp_logout_url(home_url('/')); ?>" 
                                       class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Wyloguj się
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php else: ?>
                        <!-- Guest user -->
                        <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" 
                           class="text-gray-700 hover:text-primary transition-colors font-medium">
                            Zaloguj się
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Desktop Cart Button -->
                <div class="hidden sm:block">
                    <button id="cart-trigger" 
                       class="relative bg-white hover:bg-gray-50 text-gray-700 hover:text-primary p-3 rounded-lg transition-all duration-200 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                       aria-label="Koszyk<?php 
                           $cart_count = (WC() && WC()->cart) ? WC()->cart->get_cart_contents_count() : 0;
                           if ($cart_count > 0) {
                               echo ' (' . $cart_count . ' ' . ($cart_count === 1 ? 'produkt' : 'produkty') . ')';
                           }
                       ?>">
                        <!-- Shopping bag icon to match Next.js -->
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                        </svg>
                        <?php if ($cart_count > 0): ?>
                            <span class="absolute -top-1 -right-1 bg-primary text-white rounded-full px-1.5 py-1 text-xs font-medium min-w-[1.25rem] h-5 text-center leading-none flex items-center justify-center animate-scale-in cart-count-badge"
                                  aria-label="<?php echo $cart_count . ' ' . ($cart_count === 1 ? 'produkt' : 'produkty') . ' w koszyku'; ?>">
                                <?php echo $cart_count > 99 ? '99+' : $cart_count; ?>
                            </span>
                        <?php else: ?>
                            <span class="absolute -top-1 -right-1 bg-primary text-white rounded-full px-1.5 py-1 text-xs font-medium min-w-[1.25rem] h-5 text-center leading-none items-center justify-center animate-scale-in cart-count-badge hidden"
                                  aria-label="0 produkty w koszyku">
                                0
                            </span>
                        <?php endif; ?>
                    </button>
                </div>

                <!-- Mobile Cart Button -->
                <div class="md:hidden">
                    <button id="mobile-cart-trigger" 
                       class="relative bg-white hover:bg-gray-50 text-gray-700 hover:text-primary p-2 rounded-lg transition-all duration-200 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                       aria-label="Koszyk<?php 
                           $mobile_cart_count = (WC() && WC()->cart) ? WC()->cart->get_cart_contents_count() : 0;
                           if ($mobile_cart_count > 0) {
                               echo ' (' . $mobile_cart_count . ' ' . ($mobile_cart_count === 1 ? 'produkt' : 'produkty') . ')';
                           }
                       ?>">
                        <!-- Shopping bag icon to match Next.js mobile -->
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                        </svg>
                        <?php if ($mobile_cart_count > 0): ?>
                            <span class="absolute -top-1 -right-1 bg-primary text-white rounded-full px-1.5 py-1 text-xs font-medium min-w-[1.25rem] h-5 text-center leading-none flex items-center justify-center animate-scale-in cart-count-badge"
                                  aria-label="<?php echo $mobile_cart_count . ' ' . ($mobile_cart_count === 1 ? 'produkt' : 'produkty') . ' w koszyku'; ?>">
                                <?php echo $mobile_cart_count > 99 ? '99+' : $mobile_cart_count; ?>
                            </span>
                        <?php else: ?>
                            <span class="absolute -top-1 -right-1 bg-primary text-white rounded-full px-1.5 py-1 text-xs font-medium min-w-[1.25rem] h-5 text-center leading-none items-center justify-center animate-scale-in cart-count-badge hidden"
                                  aria-label="0 produkty w koszyku">
                                0
                            </span>
                        <?php endif; ?>
                    </button>
                </div>

            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Header script loaded');
        
        // User dropdown functionality - matching Next.js behavior
        const userDropdown = document.querySelector('.user-dropdown');
        console.log('User dropdown element:', userDropdown);
        
        if (userDropdown) {
            const dropdownToggle = userDropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
            const dropdownArrow = dropdownToggle?.querySelector('.dropdown-arrow');
            
            console.log('Dropdown elements found:', {
                toggle: dropdownToggle,
                menu: dropdownMenu,
                arrow: dropdownArrow
            });
            
            if (dropdownToggle && dropdownMenu) {
                // Toggle dropdown on click
                dropdownToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('Dropdown clicked!');
                    
                    const isHidden = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '';
                    console.log('Is hidden:', isHidden);
                    
                    // Toggle menu visibility
                    if (isHidden) {
                        dropdownMenu.style.display = 'block';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.pointerEvents = 'auto';
                        console.log('Showing dropdown');
                        console.log('Dropdown menu styles:', {
                            display: dropdownMenu.style.display,
                            visibility: dropdownMenu.style.visibility,
                            position: window.getComputedStyle(dropdownMenu).position,
                            zIndex: window.getComputedStyle(dropdownMenu).zIndex,
                            top: window.getComputedStyle(dropdownMenu).top,
                            right: window.getComputedStyle(dropdownMenu).right
                        });
                        // Rotate arrow
                        if (dropdownArrow) {
                            dropdownArrow.style.transform = 'rotate(180deg)';
                        }
                    } else {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.pointerEvents = 'none';
                        console.log('Hiding dropdown');
                        // Reset arrow
                        if (dropdownArrow) {
                            dropdownArrow.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Close dropdown when clicking outside - like Next.js
                document.addEventListener('click', function(e) {
                    if (!userDropdown.contains(e.target)) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.pointerEvents = 'none';
                        if (dropdownArrow) {
                            dropdownArrow.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Close dropdown when clicking on menu items
                const menuLinks = dropdownMenu.querySelectorAll('a');
                menuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.pointerEvents = 'none';
                        if (dropdownArrow) {
                            dropdownArrow.style.transform = 'rotate(0deg)';
                        }
                    });
                });
            }
        }
        
        // Cart count animation consistency
        const cartBadges = document.querySelectorAll('.cart-count-badge');
        cartBadges.forEach(badge => {
            if (badge && !badge.classList.contains('hidden')) {
                badge.classList.add('animate-scale-in');
            }
        });
    });
    </script>

    <!-- Enhanced Mobile Navigation Menu -->
    <div class="md:hidden hidden border-t border-gray-200 mobile-menu bg-white shadow-lg">
        <div class="px-4 py-6 space-y-6 max-h-screen overflow-y-auto">
            
            <!-- Main Navigation -->
            <div class="space-y-4">
                <!-- Sklep Dropdown -->
                <div class="mobile-nav-item">
                    <button class="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-gray-700 hover:text-primary mobile-nav-trigger" data-target="sklep-submenu">
                        <span>Sklep</span>
                        <svg class="w-4 h-4 transition-transform mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div id="sklep-submenu" class="hidden mt-2 ml-4 space-y-2">
                        <?php 
                            $mobile_store_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/sklep' : 'https://modeo.pl/sklep';
                        ?>
                        <a href="<?php echo esc_url($mobile_store_url . '/koszulki'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">👕 Koszulki</a>
                        <a href="<?php echo esc_url($mobile_store_url . '/bluzy'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🧥 Bluzy</a>
                        <a href="<?php echo esc_url($mobile_store_url . '/kurtki'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🧥 Kurtki</a>
                        <a href="<?php echo esc_url($mobile_store_url . '/czapki'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🧢 Czapki</a>
                        <a href="<?php echo esc_url($mobile_store_url); ?>" class="block px-3 py-2 text-sm font-medium text-primary border-t border-gray-100 mt-2 pt-2">Zobacz wszystkie →</a>
                    </div>
                </div>

                <!-- Na prezent Dropdown -->
                <div class="mobile-nav-item">
                    <button class="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-gray-700 hover:text-primary mobile-nav-trigger" data-target="prezent-submenu">
                        <span>Na prezent</span>
                        <svg class="w-4 h-4 transition-transform mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div id="prezent-submenu" class="hidden mt-2 ml-4 space-y-2">
                        <?php 
                            $mobile_gift_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/na-prezent' : 'https://modeo.pl/na-prezent';
                        ?>
                        <a href="<?php echo esc_url($mobile_gift_url . '/urodziny'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🎂 Urodziny</a>
                        <a href="<?php echo esc_url($mobile_gift_url . '/boze-narodzenie'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🎄 Boże Narodzenie</a>
                        <a href="<?php echo esc_url($mobile_gift_url . '/walentynki'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">💝 Walentynki</a>
                        <a href="<?php echo esc_url($mobile_gift_url . '/dzien-matki'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">👩 Dzień Matki</a>
                        <a href="<?php echo esc_url($mobile_gift_url); ?>" class="block px-3 py-2 text-sm font-medium text-primary border-t border-gray-100 mt-2 pt-2">Zobacz wszystkie →</a>
                    </div>
                </div>

                <!-- Znakowanie Dropdown -->
                <div class="mobile-nav-item">
                    <button class="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-gray-700 hover:text-primary mobile-nav-trigger" data-target="znakowanie-submenu">
                        <span>Znakowanie</span>
                        <svg class="w-4 h-4 transition-transform mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div id="znakowanie-submenu" class="hidden mt-2 ml-4 space-y-2">
                        <?php 
                            $mobile_branding_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/znakowanie' : 'https://modeo.pl/znakowanie';
                        ?>
                        <a href="<?php echo esc_url($mobile_branding_url . '/haft'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🧵 Haft</a>
                        <a href="<?php echo esc_url($mobile_branding_url . '/sitodruk'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🖨️ Sitodruk</a>
                        <a href="<?php echo esc_url($mobile_branding_url . '/nadruk-cyfrowy'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🖥️ Nadruk cyfrowy</a>
                        <a href="<?php echo esc_url($mobile_branding_url); ?>" class="block px-3 py-2 text-sm font-medium text-primary border-t border-gray-100 mt-2 pt-2">Zobacz ofertę →</a>
                    </div>
                </div>

                <!-- Dla firm Dropdown -->
                <div class="mobile-nav-item">
                    <button class="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-gray-700 hover:text-primary mobile-nav-trigger" data-target="firma-submenu">
                        <span>Dla firm</span>
                        <svg class="w-4 h-4 transition-transform mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div id="firma-submenu" class="hidden mt-2 ml-4 space-y-2">
                        <?php 
                            $mobile_business_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/dla-firm' : 'https://modeo.pl/dla-firm';
                        ?>
                        <a href="<?php echo esc_url($mobile_business_url . '/odziez-firmowa'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">👔 Odzież firmowa</a>
                        <a href="<?php echo esc_url($mobile_business_url . '/wlasna-kolekcja'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">🎨 Własna kolekcja</a>
                        <a href="<?php echo esc_url($mobile_business_url . '/dropshipping'); ?>" class="block px-3 py-2 text-sm text-gray-600 hover:text-primary">📦 Dropshipping</a>
                        <a href="<?php echo esc_url($mobile_business_url); ?>" class="block px-3 py-2 text-sm font-medium text-primary border-t border-gray-100 mt-2 pt-2">Dowiedz się więcej →</a>
                    </div>
                </div>

                <!-- Simple Links -->
                <a href="<?php 
                    $about_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/o-nas' : 'https://modeo.pl/o-nas';
                    echo esc_url($about_url);
                ?>" 
                   class="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-primary hover:bg-gray-50">
                    O nas
                </a>
                
                <a href="<?php 
                    $blog_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/blog' : 'https://modeo.pl/blog';
                    echo esc_url($blog_url);
                ?>" 
                   class="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-primary hover:bg-gray-50">
                    Blog
                </a>
                
                <a href="<?php 
                    $contact_url = (defined('WP_DEBUG') && WP_DEBUG) ? 'http://localhost:3000/kontakt' : 'https://modeo.pl/kontakt';
                    echo esc_url($contact_url);
                ?>" 
                   class="block px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-primary hover:bg-gray-50">
                    Kontakt
                </a>
            </div>
            
            <!-- Mobile User Menu -->
            <div class="border-t border-gray-100 pt-4">
                <div class="px-3 py-2">
                    <?php if (is_user_logged_in()): ?>
                        <div class="space-y-3">
                            <p class="font-medium text-gray-900"><?php echo esc_html(wp_get_current_user()->display_name); ?></p>
                            <div class="space-y-2">
                                <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" 
                                   class="block text-sm text-gray-600 hover:text-primary">Moje konto</a>
                                <a href="<?php echo esc_url(wc_get_endpoint_url('orders', '', wc_get_page_permalink('myaccount'))); ?>" 
                                   class="block text-sm text-gray-600 hover:text-primary">Moje zamówienia</a>
                                <a href="<?php echo wp_logout_url(home_url('/')); ?>" 
                                   class="block text-sm text-red-600 hover:text-red-700">Wyloguj się</a>
                            </div>
                        </div>
                    <?php else: ?>
                        <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" 
                           class="block px-3 py-2 text-center bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors">
                            Zaloguj się
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Page Title Section removed - handled by individual templates -->

<main class="flex-1">