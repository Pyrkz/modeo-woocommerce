import { memo } from 'react';

interface FeatureIconProps {
  icon: string;
  iconBgColor?: string;
  className?: string;
}

function FeatureIcon({ icon, iconBgColor = 'bg-gray-100', className = '' }: FeatureIconProps) {
  return (
    <div className={`w-16 h-16 rounded-2xl ${iconBgColor} flex items-center justify-center mb-4 ${className}`}>
      <span className="text-2xl" role="img" aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

export default memo(FeatureIcon);