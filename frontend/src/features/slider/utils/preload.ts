export const preloadSliderImages = (imagePaths: string[]) => {
  // Preload first image with highest priority
  if (imagePaths.length > 0) {
    const firstImage = new window.Image();
    firstImage.loading = 'eager';
    firstImage.fetchPriority = 'high';
    firstImage.src = imagePaths[0];
  }
  
  // Preload remaining images with progressive delay
  if (imagePaths.length > 1) {
    imagePaths.slice(1).forEach((path, index) => {
      setTimeout(() => {
        const img = new window.Image();
        img.loading = 'lazy';
        img.fetchPriority = 'low';
        img.src = path;
      }, 150 + (index * 50)); // Progressive delay
    });
  }
};

export const prefetchSliderRoutes = (hrefs: string[]) => {
  // Use modern prefetch with priority hints
  hrefs.forEach((href, index) => {
    if (href && href !== '#') {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      // First link gets higher priority
      if (index === 0) {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);
    }
  });
};

// Additional performance utility for critical resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) {
      link.crossOrigin = hint.crossorigin;
    }
    document.head.appendChild(link);
  });
};