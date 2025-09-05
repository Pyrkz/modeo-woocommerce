#!/usr/bin/env node

// Test the variation images API
const fetch = require('node-fetch');

async function testVariationImages() {
    try {
        console.log('🧪 Testing variation images API...');
        
        const response = await fetch('http://localhost:8080/wp-json/modeo/v1/product-variations-images/3050');
        const data = await response.json();
        
        console.log('✅ API Response Status:', response.status);
        console.log('📊 Number of variations with images:', data.length);
        
        if (data.length > 0) {
            console.log('🖼️ First variation:', {
                variation_id: data[0].variation_id,
                attributes: data[0].attributes,
                image_url: data[0].image.url,
                thumbnail: data[0].image.thumbnail
            });
            
            // Test if the image URLs are accessible
            const imageResponse = await fetch(data[0].image.url);
            console.log('🖼️ Image accessibility:', imageResponse.status === 200 ? '✅ Accessible' : '❌ Not accessible');
        }
        
        console.log('\n🎯 Next step: Check browser DevTools console for variation image logs');
        console.log('   Look for: 🖼️ VARIATION IMAGES: [array]');
        console.log('   And: 🖼️ Using variation image for term X: [image URL]');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testVariationImages();