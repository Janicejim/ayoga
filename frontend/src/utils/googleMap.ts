let scriptLoaded = false;
let loadingPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
    if (scriptLoaded) return Promise.resolve();
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            scriptLoaded = true;
            resolve();
        };
        script.onerror = (error) => {
            loadingPromise = null;
            reject(error);
        };
        document.head.appendChild(script);
    });

    return loadingPromise;
};
