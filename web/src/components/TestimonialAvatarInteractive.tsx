import ExportedImage from 'next-image-export-optimizer'
import { RxAvatar } from 'react-icons/rx'

const TestimonialAvatarInteractive = ({ src, alt }) => (
    <>
      {src === null ? (
        <div className="w-24 h-24 min-h-24 min-w-24 max-h-24 max-w-24">
          <RxAvatar size={96} className="w-full" />
        </div>
      ) : (
        <ExportedImage
          src={src}
          alt={alt}
          loading="lazy"
          placeholder="blur"
          className={`w-24 h-24 min-h-24 min-w-24 max-h-24 max-w-24 rounded-full object-cover`}
        />
      )}
    </>
  )

export default TestimonialAvatarInteractive
