function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js').then(registration => {
                registration.onupdatefound = () => {
                  const installingWorker = registration.installing;
                  installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      window.location.reload();
                    }
                  };
                };
              });
            }
          `,
        }}
      />
    </>
  )
}

export default Head
