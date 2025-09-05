interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Ładowanie...', 
  className = '' 
}: LoadingSpinnerProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-primary mx-auto mb-4 ${getSizeClasses()}`}></div>
      {text && (
        <p className="text-gray-600">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;