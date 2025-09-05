<?php
/**
 * Downloads - Pliki do pobrania
 *
 * Shows downloads on the account page.
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_account_downloads', $has_downloads ); ?>

<div class="modeo-downloads-wrapper">
    <div class="downloads-header">
        <h2 class="downloads-title">Moje pliki</h2>
        <p class="downloads-subtitle">Pobierz zakupione produkty cyfrowe i faktury</p>
    </div>

    <?php if ( $has_downloads ) : ?>
        <div class="downloads-grid">
            <?php foreach ( $downloads as $download ) : ?>
                <div class="download-card">
                    <div class="download-icon">
                        <?php 
                        $file_extension = pathinfo( $download['download_name'], PATHINFO_EXTENSION );
                        switch(strtolower($file_extension)) {
                            case 'pdf':
                                echo '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                      </svg>';
                                break;
                            case 'zip':
                            case 'rar':
                                echo '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                      </svg>';
                                break;
                            case 'jpg':
                            case 'jpeg':
                            case 'png':
                            case 'gif':
                                echo '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>';
                                break;
                            default:
                                echo '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                      </svg>';
                        }
                        ?>
                    </div>
                    
                    <div class="download-info">
                        <h3 class="download-name">
                            <?php echo esc_html( $download['download_name'] ); ?>
                        </h3>
                        
                        <?php if ( ! empty( $download['order_id'] ) ) : ?>
                            <p class="download-order">
                                Z zamówienia <a href="<?php echo esc_url( wc_get_account_endpoint_url( 'view-order' ) . $download['order_id'] ); ?>">
                                    #<?php echo esc_html( $download['order_id'] ); ?>
                                </a>
                            </p>
                        <?php endif; ?>
                        
                        <div class="download-meta">
                            <?php if ( ! empty( $download['downloads_remaining'] ) && 'Unlimited' !== $download['downloads_remaining'] ) : ?>
                                <span class="downloads-remaining">
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                                    </svg>
                                    Pozostało: <?php echo esc_html( $download['downloads_remaining'] ); ?>
                                </span>
                            <?php endif; ?>
                            
                            <?php if ( ! empty( $download['access_expires'] ) ) : ?>
                                <span class="expires-date">
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Wygasa: <?php echo esc_html( date_i18n( 'j M Y', strtotime( $download['access_expires'] ) ) ); ?>
                                </span>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div class="download-actions">
                        <?php
                        $file_size = '';
                        if ( ! empty( $download['file']['file'] ) && file_exists( $download['file']['file'] ) ) {
                            $size_bytes = filesize( $download['file']['file'] );
                            $file_size = size_format( $size_bytes );
                        }
                        ?>
                        
                        <?php if ( $file_size ) : ?>
                            <span class="file-size"><?php echo esc_html( $file_size ); ?></span>
                        <?php endif; ?>
                        
                        <a href="<?php echo esc_url( $download['download_url'] ); ?>" 
                           class="download-button"
                           target="_blank"
                           rel="noopener">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Pobierz
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    <?php else : ?>
        <div class="no-downloads-wrapper">
            <div class="no-downloads-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            </div>
            <h3 class="no-downloads-title">Brak plików do pobrania</h3>
            <p class="no-downloads-text">Nie masz jeszcze żadnych produktów cyfrowych do pobrania.</p>
            <a href="<?php echo esc_url( apply_filters( 'woocommerce_return_to_shop_redirect', wc_get_page_permalink( 'shop' ) ) ); ?>" class="btn-browse-digital">
                Przeglądaj produkty cyfrowe
            </a>
        </div>
    <?php endif; ?>
</div>

<style>
.modeo-downloads-wrapper {
    width: 100%;
    max-width: none !important;
    margin: 0 !important;
}

/* Full width container for downloads */
.woocommerce-account-downloads .account-content {
    padding: 20px !important;
    max-width: none !important;
}

.woocommerce-account-downloads .woocommerce-MyAccount-content {
    padding: 0 !important;
    max-width: none !important;
}

.downloads-header {
    margin-bottom: 32px;
    padding: 32px;
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    border-radius: 16px;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
}

.downloads-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: pulse-downloads 4s ease-in-out infinite;
}

@keyframes pulse-downloads {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

.downloads-title {
    color: white;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
}

.downloads-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    margin: 0;
    line-height: 1.5;
    position: relative;
    z-index: 1;
}

.downloads-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
    margin: 0;
}

.download-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(229, 231, 235, 0.8);
    transition: all 0.3s ease;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    backdrop-filter: blur(10px);
}

.download-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: #cc1616;
}

.download-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cc1616;
    border: 2px solid rgba(204, 22, 22, 0.1);
    flex-shrink: 0;
}

.download-icon svg {
    width: 32px;
    height: 32px;
}

.download-info {
    flex: 1;
}

.download-name {
    color: #1f2937;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px 0;
    line-height: 1.4;
}

.download-order {
    color: #6b7280;
    font-size: 14px;
    margin: 0 0 12px 0;
}

.download-order a {
    color: #cc1616;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
}

.download-order a:hover {
    color: #b31313;
    text-decoration: underline;
}

.download-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.downloads-remaining,
.expires-date {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
    font-size: 13px;
    font-weight: 500;
}

.downloads-remaining .icon,
.expires-date .icon {
    width: 16px;
    height: 16px;
}

.download-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 20px;
    border-top: 1px solid #f3f4f6;
}

.file-size {
    color: #6b7280;
    font-size: 13px;
    font-weight: 600;
    background: #f9fafb;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.download-button {
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.3);
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.download-button .icon {
    width: 16px;
    height: 16px;
}

.download-button:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #cc1616 100%);
    text-decoration: none;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(204, 22, 22, 0.4);
}

/* No downloads state */
.no-downloads-wrapper {
    text-align: center;
    padding: 80px 40px;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.no-downloads-wrapper::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(204, 22, 22, 0.03) 0%, transparent 70%);
    animation: rotate-downloads 20s linear infinite;
}

@keyframes rotate-downloads {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.no-downloads-icon {
    width: 96px;
    height: 96px;
    margin: 0 auto 32px;
    color: #cc1616;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid rgba(204, 22, 22, 0.1);
    position: relative;
    z-index: 1;
    animation: float-downloads 3s ease-in-out infinite;
}

@keyframes float-downloads {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.no-downloads-icon svg {
    width: 48px;
    height: 48px;
}

.no-downloads-title {
    color: #1f2937;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 16px 0;
    position: relative;
    z-index: 1;
}

.no-downloads-text {
    color: #6b7280;
    font-size: 18px;
    margin: 0 0 40px 0;
    line-height: 1.6;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 1;
}

.btn-browse-digital {
    background: linear-gradient(135deg, #cc1616 0%, #dc2626 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    border: none;
    box-shadow: 0 4px 16px rgba(204, 22, 22, 0.3);
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 1;
    gap: 8px;
}


.btn-browse-digital:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #cc1616 100%);
    text-decoration: none;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(204, 22, 22, 0.4);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .downloads-header {
        padding: 24px 20px;
        margin-bottom: 24px;
    }
    
    .downloads-title {
        font-size: 28px;
    }
    
    .downloads-subtitle {
        font-size: 15px;
    }
    
    .downloads-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .download-card {
        padding: 24px 20px;
    }
    
    .download-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
    
    .file-size {
        text-align: center;
    }
    
    .download-button {
        justify-content: center;
    }
    
    .no-downloads-wrapper {
        padding: 60px 24px;
    }
    
    .no-downloads-icon {
        width: 80px;
        height: 80px;
    }
    
    .no-downloads-title {
        font-size: 24px;
    }
    
    .no-downloads-text {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .downloads-header {
        padding: 20px 16px;
    }
    
    .downloads-title {
        font-size: 24px;
    }
    
    .downloads-subtitle {
        font-size: 14px;
    }
    
    .download-card {
        padding: 20px 16px;
    }
    
    .download-icon {
        width: 56px;
        height: 56px;
    }
    
    .download-icon svg {
        width: 28px;
        height: 28px;
    }
    
    .download-name {
        font-size: 16px;
    }
    
    .download-button {
        padding: 10px 20px;
        font-size: 13px;
    }
    
    .no-downloads-wrapper {
        padding: 40px 20px;
    }
    
    .no-downloads-icon {
        width: 64px;
        height: 64px;
    }
    
    .no-downloads-title {
        font-size: 22px;
    }
    
    .no-downloads-text {
        font-size: 15px;
    }
    
    .btn-browse-digital {
        padding: 12px 24px;
        font-size: 14px;
    }
}
</style>

<?php do_action( 'woocommerce_after_account_downloads', $has_downloads ); ?>