import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
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

const initialEvents = [
  {
    title: '例のイベント',
    start: new Date(),
    end: new Date(),
  },
];

export default function MyCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [view, setView] = useState('month'); // 現在のビュー状態
  const [date, setDate] = useState(new Date()); // カレンダーの表示開始日

  // 日付クリック時の処理
  const handleSelectDate = (slotInfo) => {
    setDate(slotInfo.start);
    setView('day'); // 日ビューに切り替え
  };

  // ビュー切替時にstateも更新（戻るため）
  const handleViewChange = (newView) => {
    setView(newView);
  };

    const handleNavigate = (newDate) => {
      setDate(newDate);
    };

  return (
    <div style={{ height: 700, padding: '10px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'day']}  // 月と日ビューを許可
        view={view}               // 現在のビューをstateで制御
        date={date}               // 表示する日付をstateで制御
        onView={handleViewChange} // ビューが変わった時の処理
        onSelectSlot={handleSelectDate} // 日付クリック時の処理
        onNavigate={handleNavigate}  // ← 追加
        selectable
        style={{ height: '100%' }}
      />
    </div>
  );
}
