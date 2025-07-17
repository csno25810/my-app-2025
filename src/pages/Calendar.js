import React, { useState } from 'react';  // useStateを追加
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';

const locales = {
  ja: ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function MyCalendar() {
    // 表示中のビュー（month or day）
    const [view, setView] = useState('month');
    // 日ビュー表示時の対象日
    const [date, setDate] = useState(new Date());
  
    // イベントデータ
    const [events, setEvents] = useState([
      {
        title: '例のイベント',
        start: new Date(),
        end: new Date(),
      },
    ]);
 
  // 日付クリック時に日ビューへ切り替え＆日付セット
  const handleSelectDate = (slotInfo) => {
    setDate(slotInfo.start);
    setView('day'); // 日ビューに切り替え
  };

    // ビュー変更時にstate更新（戻るボタンなど対応用）
    const handleViewChange = (newView) => {
        setView(newView);
      };

      return (
        <div style={{ height: '100vh', padding: '10px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'day']}
            view={view}
            date={date}
            onView={handleViewChange}
            onSelectSlot={handleSelectDate}
            selectable
            style={{ height: '100%' }}
          />
        </div>
      );
}
