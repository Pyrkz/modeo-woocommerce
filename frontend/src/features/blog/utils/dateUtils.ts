export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Data nieprawidłowa';
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Show relative date for recent posts
    if (diffDays === 1) {
      return 'Wczoraj';
    } else if (diffDays <= 7) {
      return `${diffDays} dni temu`;
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? 'Tydzień temu' : `${weeks} tygodni temu`;
    }

    // Format as Polish date for older posts
    return new Intl.DateTimeFormat('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data nieprawidłowa';
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Data nieprawidłowa';
    }

    return new Intl.DateTimeFormat('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return 'Data nieprawidłowa';
  }
};

export const getRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return 'Data nieprawidłowa';
    }

    const diffTime = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return 'Przed chwilą';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minut temu`;
    } else if (diffHours < 24) {
      return diffHours === 1 ? 'Godzinę temu' : `${diffHours} godzin temu`;
    } else if (diffDays === 1) {
      return 'Wczoraj';
    } else if (diffDays <= 7) {
      return `${diffDays} dni temu`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return 'Data nieprawidłowa';
  }
};