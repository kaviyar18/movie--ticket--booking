import { useEffect } from "react";
import "aframe";

// ✅ Tell TypeScript about A-Frame tags
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": any;
      "a-assets": any;
      "a-videosphere": any;
      "a-text": any;
      "a-entity": any;
    }
  }
}

interface SeatView360Props {
  seat?: string;
}

const SeatView360: React.FC<SeatView360Props> = ({ seat = "default" }) => {
  useEffect(() => {
    console.log(`🎥 Loaded 360° video for seat: ${seat}`);

    // Try to auto-play (for browsers that block muted autoplay)
    const video = document.querySelector("#currentVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(() => {
        console.warn("Autoplay prevented — user interaction required.");
      });
    }
  }, [seat]);

  // ✅ Google Drive direct download links
  const seatVideos: Record<string, string> = {
    front:
      "https://drive.google.com/uc?export=download&id=1NNB3x0H-WYQ3LZW_CCPThUHt85vxuLaM",
    back: "https://drive.google.com/uc?export=download&id=1qDnWM2-zkVA9qE0EB41zETskWlWoCeKO",
    default:
      "https://drive.google.com/uc?export=download&id=1NNB3x0H-WYQ3LZW_CCPThUHt85vxuLaM",
  };

  // Determine video based on seat row
  const seatRow = seat.charAt(0).toUpperCase();
  let videoSrc = seatVideos.default;

  if (["A", "B", "C", "D"].includes(seatRow)) {
    videoSrc = seatVideos.front;
  } else if (["E", "F", "G", "H", "I", "J"].includes(seatRow)) {
    videoSrc = seatVideos.back;
  }

  const sceneKey = `${seat}-${videoSrc}`;

  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "black" }}>
      {/* key={sceneKey} ensures it reloads when seat changes */}
      <a-scene key={sceneKey} embedded vr-mode-ui="enabled: false">
        <a-assets>
          <video
            id="currentVideo"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
          ></video>
        </a-assets>

        <a-videosphere src="#currentVideo" rotation="0 -180 0"></a-videosphere>

        <a-text
          value={`View from seat: ${seat}`}
          position="-1 1.5 -3"
          color="#FFFFFF"
          width="4"
          align="center"
        ></a-text>

        <a-entity light="type: ambient; color: #BBB"></a-entity>
      </a-scene>
    </div>
  );
};

export default SeatView360;
