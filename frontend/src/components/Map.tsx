import { useEffect, useRef } from "react";
interface Props {
  venue_point: { x: string, y: string }
}


export function Map(props: Props) {
  const ref = useRef<HTMLDivElement | null>(null);


  useEffect(() => {

    const initMap = async () => {
      const formattedVenuePoint = { lat: +props.venue_point.x, lng: +props.venue_point.y };

      const svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "#fb6855",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new window.google.maps.Point(10, 20),
      };

      const map = new window.google.maps.Map(ref.current!, {
        center: formattedVenuePoint,
        zoom: 18,
      });

      new google.maps.Marker({
        position: formattedVenuePoint,
        map,
        title: "Hello World!",
        icon: svgMarker,
      });
    };

    initMap();


  }, [props.venue_point]);

  return <div ref={ref} style={{ height: "400px" }} />;
}