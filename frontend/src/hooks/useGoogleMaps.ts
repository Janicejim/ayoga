import { useEffect, useState } from 'react';
import { loadGoogleMapsScript } from '../utils/googleMap';

const useGoogleMaps = () => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const loadScript = async () => {
            try {
                await loadGoogleMapsScript();
                setLoaded(true);
            } catch (err) {
                setError(err as Error);
            }
        };

        loadScript();
    }, []);

    return { loaded, error };
};

export default useGoogleMaps;