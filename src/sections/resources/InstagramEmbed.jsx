import { useEffect, useRef, useState } from 'react';

export default function InstagramEmbed({ mediaUrl, thumbnailUrl, title }) {
  const embedRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className="flex justify-center items-center overflow-hidden rounded-lg relative"
      style={{
        height: '400px',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #e0e0e0',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
        backgroundColor: '#fff',
      }}
    >
      {!isPlaying && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-70"
          style={{
            zIndex: 10,
          }}
        >
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="h-full w-full object-cover rounded-lg"
            style={{
              opacity: 0.5,
            }}
          />
          <h2
            className="absolute text-white text-center font-bold px-10"
            style={{
              zIndex: 20,
              fontSize: '1.5rem',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)',
            }}
          >
            {title}
          </h2>

          <svg
            className="absolute"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="80"
            height="80"
            fill="white"
            style={{
              opacity: 0.9,
              zIndex: 20,
            }}
          >
            <circle cx="50" cy="50" r="48" fill="rgba(255, 255, 255, 0.3)" />
            <polygon
              points="40,30 70,50 40,70"
              fill="white"
              style={{ transform: 'translate(5%, 0)' }}
            />
          </svg>
        </div>
      )}
      <div
        ref={embedRef}
        style={{
          visibility: isPlaying ? 'visible' : 'hidden',
          position: isPlaying ? 'relative' : 'absolute',
          top: isPlaying ? '-35px' : '0',
          height: '450px',
          width: '100%',
          overflow: 'hidden',
        }}
        dangerouslySetInnerHTML={{
          __html: `<blockquote class="instagram-media" data-instgrm-permalink="${mediaUrl}" data-instgrm-version="14" style="border: none; width: 100%;"></blockquote>`,
        }}
      ></div>
    </div>
  );
}
