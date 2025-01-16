import InstagramEmbed from "./InstagramEmbed"; 

export default function Video() {
  const mediaUrls = [
    "https://www.instagram.com/reel/DDdikDCucXr/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/DDs_kL0yOxA/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/DDdikDCucXr/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/DDdikDCucXr/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/DDs_kL0yOxA/?utm_source=ig_embed&amp;utm_campaign=loading", 
    "https://www.instagram.com/reel/DDdikDCucXr/?utm_source=ig_embed&amp;utm_campaign=loading", 
  ];

  return (
      <div className="container mx-auto px-4 py-24 lg:py-32 shadow-lg">
        <h1 className="text-2xl text-center text-gray-800 pb-16 font-semibold px-12">
            Our Legal Insights Through Video
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mediaUrls.map((url, index) => (
            <InstagramEmbed key={index} mediaUrl={url} />
          ))}
        </div>
      </div>
  );
}
