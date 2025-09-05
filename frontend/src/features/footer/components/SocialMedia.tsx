import Link from 'next/link';
import { socialMediaLinks } from '../data/socialMediaLinks';

const SocialMedia = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px bg-gray-300 flex-1" />
      <div className="flex items-center gap-3">
        {socialMediaLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 rounded-full"
              aria-label={`Odwiedź nas na ${social.name}`}
            >
              <IconComponent className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
      <div className="h-px bg-gray-300 flex-1" />
    </div>
  );
};

export default SocialMedia;