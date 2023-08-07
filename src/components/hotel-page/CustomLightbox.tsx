import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import NextJsImage from "../NextJSImage";

import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

export interface CustomLightboxProps {
  index: number;
  open: boolean;
  close: () => void;
  slides: SlideImage[];
}

export const CustomLightbox = ({
  index,
  open,
  close,
  slides,
}: CustomLightboxProps) => (
  <Lightbox
    index={index}
    open={open}
    close={close}
    slides={slides}
    render={{ slide: NextJsImage, thumbnail: NextJsImage }}
    carousel={{ preload: 5 }}
    styles={{
      container: {
        backgroundColor: "#000000aa",
      },
      thumbnailsContainer: {
        backgroundColor: "#000000cc",
      },
    }}
    animation={{
      swipe: 250,
    }}
    controller={{
      touchAction: "pan-y",
      closeOnPullDown: true,
      closeOnBackdropClick: true,
    }}
    counter={{
      container: {
        style: {
          top: "unset",
          bottom: 0,
          left: 0,
          right: 0,
          flex: 0,
          textAlign: "center",
        },
      },
    }}
    zoom={{
      maxZoomPixelRatio: 3,
      scrollToZoom: true,
    }}
    thumbnails={{
      imageFit: "cover",
    }}
    plugins={[Counter, Thumbnails, Zoom]}
  />
);
