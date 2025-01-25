import InstagramEmbed from './InstagramEmbed';
import { useTranslation } from 'react-i18next';

export default function Video() {
  const { t } = useTranslation('resources');
  const videos = t('videos', { returnObjects: true });

  return (
    <div className="container mx-auto py-16 md:py-24 min-h-screen max-w-screen-2xl mx-auto">
      <h1 className="text-2xl text-center text-gray-800 pb-8 md:pb-16 font-semibold">
        {t('videoTitle')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {videos.map((video, index) => (
          <InstagramEmbed
            key={index}
            mediaUrl={video.mediaUrls}
            thumbnailUrl={`/assets/thumbnails/law_${index}.jpg`}
            title={video.title}
          />
        ))}
      </div>

      <div className="text-center mt-10 md:mt-16">
        <p className="text-lg text-gray-700 font-medium">
          {t('instagramTitle')}
        </p>
        <a
          href="https://www.instagram.com/luklaw_to"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-lg font-semibold mt-2 inline-block"
        >
          {t('instagramLink')}
        </a>
      </div>
    </div>
  );
}
