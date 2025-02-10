import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useHistory } from "react-router";


const localizer = momentLocalizer(moment);

export interface Props {
  hostItems: any[];
}

export default function MyCalendar(props: Props) {
  const history = useHistory();
  const events = props.hostItems.map((item) => {

    const dateOnly = item.date.split('T')[0];
    const startDateTimeString = `${dateOnly}T${item.time}:00`;
    const endDateTimeString = `${dateOnly}T${item.end_time}:00`;

    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(endDateTimeString);
    return {
      id: item.class_id,
      title: item.name,
      start: startDateTime,
      end: endDateTime,
    };
  });

  const handleEventClick = (event: any) => {
    history.push(`/class/detail/${event.id}`);
  };

  return (
    <div className="App">
      <Calendar
        views={['month', 'day', 'agenda']}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        onSelectEvent={handleEventClick}
        defaultView='month'
      />
    </div>
  );
}
