import ColorSwatch from './ColorSwatch'

const BlurredBackgroundFilter = () => (
  <div
    className="w-full z-[-1] absolute left-0 top-0"
    style={{
      height: '2600px',
    }}
  >
    <div
      className="top-0 left-0 w-full absolute bg-[rgba(255, 255, 255, 0.6)] dark:bg-[rgba(10,15,20,0.5)]"
      style={{
        backdropFilter: 'blur(118.12px)',
        height: '2600px',
      }}
    ></div>
    <ColorSwatch />
    <div
      className="top-0 left-0 absolute w-full bg-[rgba(255, 255, 255, 0.65)] dark:bg-[rgba(15,20,30,0.4)]"
      style={{
        backdropFilter: 'blur(150px)',
        height: '2600px',
      }}
    ></div>
  </div>
)

export default BlurredBackgroundFilter
