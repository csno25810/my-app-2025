import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Simple Calendar Component
function SimpleCalendar({ view, events, onDateClick, onEventClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();

  const generateMonthDays = () => {
    const daysInMonth = lastDay.getDate();
    const days = [];

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString()
      });
    }

    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  if (view === 'month') {
    const monthDays = generateMonthDays();
    
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {formatDate(currentDate)}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 border-b">
          {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
            <div key={day} className={`p-3 text-center font-medium ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {monthDays.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            return (
              <div
                key={index}
                className={`min-h-24 p-2 border-r border-b cursor-pointer hover:bg-gray-50 ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${day.isToday ? 'bg-blue-50' : ''}`}
                onClick={() => onDateClick(day.date)}
              >
                <div className={`text-sm ${
                  day.isToday ? 'font-bold text-blue-600' : ''
                }`}>
                  {day.date.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}//予定
                      className="text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded truncate cursor-pointer hover:bg-blue-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'week') {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">週表示</h2>
        <p className="text-gray-600">週表示は開発中です。</p>
      </div>
    );
  }

  if (view === 'day') {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">日表示</h2>
        <p className="text-gray-600">日表示は開発中です。</p>
      </div>
    );
  }

  return null;
}

// CalendarView Component
function CalendarView({ view }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '例のイベント',
      date: new Date(),
    },
  ]);

  const handleDateClick = (date) => {
    const title = prompt('イベント名を入力してください:');
    if (title) {
      const newEvent = {
        id: Date.now(),
        title,
        date,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (event) => {
    const shouldDelete = window.confirm(`"${event.title}" を削除しますか？`);
    if (shouldDelete) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  return (
    <div className="flex-1 p-4">

      <SimpleCalendar
        view={view}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
    </div>
  );
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // ← 上に移動する！
  const [view, setView] = useState('month');
  const [activeMenu, setActiveMenu] = useState('カレンダー');
  const [menuItems, setMenuItems] = useState([
    'カレンダー',
    '設定'
  ]);

  const menuOptions = ['日記', '収支', '食事'];
  const remainingOptions = menuOptions.filter(item => !menuItems.includes(item));
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  <button
  onClick={() => setIsAddMenuOpen(true)} // ← 修正ここ
  className={`flex-1 py-3 px-2 text-center rounded-lg transition-colors text-sm ${
    activeMenu === '+'  // メニュー名が "+" になることは基本ないので false 扱いでOK
      ? 'bg-white dark:bg-gray-700 text-blue-600 font-medium shadow-sm'
      : 'text-gray-700 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-600'
  }`}
>
  ＋
</button>

  const [themeColor, setThemeColor] = useState('bg-sky-200');

  useEffect(() => {//ダークモード
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddMenuItem = () => {
    const newItem = prompt('追加するメニュー項目名を入力してください:');
    if (newItem && !menuItems.includes(newItem)) {
      setMenuItems([...menuItems, newItem]);
    }
  };

  const handleAddEvent = () => {
    alert('予定追加機能は開発中です');
  };

  if (isLoading) {
    return <LoadingScreen size={180} shape="rounded-full" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">カレンダーアプリ</h1>
          
          <div className="flex gap-2">
            {[
              { key: 'month', label: '月' },
              { key: 'week', label: '週' },
              { key: 'day', label: '日' }
            ].map((viewOption) => (
              <button
                key={viewOption.key}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === viewOption.key//選択している月・週・日ボタン
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setView(viewOption.key)}
              >
                {viewOption.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 relative pb-20">
        {activeMenu === 'カレンダー' && <CalendarView view={view} />}
        {activeMenu === '設定' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  テーマカラー
                </label>
                <div className="flex gap-2">
                  {[
                    { color: 'bg-sky-200', name: '水色' },
                    { color: 'bg-blue-200', name: '青' },
                    { color: 'bg-green-200', name: '緑' },
                    { color: 'bg-purple-200', name: '紫' },
                    { color: 'bg-pink-200', name: 'ピンク' },
                    { color: 'bg-orange-200', name: 'オレンジ' },
                    { color: 'bg-gray-300', name: '灰色' }
                  ].map((theme) => (
                    <button
                      key={theme.color}
                      className={`w-8 h-8 rounded-full ${theme.color} border-2 ${
                        themeColor === theme.color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      onClick={() => setThemeColor(theme.color)}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
              <label className="flex items-center space-x-2">
                <span>ダークモード</span>
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
              </label>
            </div>
          </div>
        )}
        {activeMenu === '日記' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">日記</h2>
            <p className="text-gray-600">日記機能は開発中です。</p>
          </div>
        )}
        {activeMenu === '収支' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">収支記録</h2>
            <p className="text-gray-600">収支記録機能は開発中です。</p>
          </div>
        )}
        {activeMenu === '食事' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">食事記録</h2>
            <p className="text-gray-600">食事記録機能は開発中です。</p>
          </div>
        )}

        {!['カレンダー', '設定', '日記', '収支', '食事'].includes(activeMenu) && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{activeMenu}</h2>
            <p className="text-gray-600 dark:text-gray-300">「{activeMenu}」機能は開発中です。</p>
          </div>
        )}

        {activeMenu === 'カレンダー' && (
          <button
            onClick={handleAddEvent}
            className="fixed bottom-24 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-2xl font-bold z-10"
          >
            +
          </button>
        )}
      </main>

      {isAddMenuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">追加するメニューを選んでください</h3>
      <div className="flex flex-col space-y-2">
        {remainingOptions.map(option => (
          <button
            key={option}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setMenuItems([...menuItems, option]);
              setIsAddMenuOpen(false);
            }}
          >
            {option}
          </button>
        ))}
        <button
          className="mt-2 text-gray-500 hover:underline"
          onClick={() => setIsAddMenuOpen(false)}
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
)}


      <nav className={`fixed bottom-0 left-0 right-0 ${themeColor} dark:bg-gray-800 border-t border-gray-200 p-2`}>
        <div className="flex items-center justify-around max-w-7xl mx-auto">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`flex-1 py-3 px-2 text-center rounded-lg transition-colors text-sm ${
                activeMenu === item
                ? 'bg-white dark:bg-gray-700 text-blue-600 font-medium shadow-sm'
                : 'text-gray-700 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
          <button
  onClick={() => setIsAddMenuOpen(true)} // ← 修正点！
  className={`flex-1 py-3 px-2 text-center rounded-lg transition-colors text-sm ${
    activeMenu === '+'  // メニュー名が "+" になることは基本ないので false 扱いでOK
      ? 'bg-white dark:bg-gray-700 text-blue-600 font-medium shadow-sm'
      : 'text-gray-700 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-600'
  }`}
>
  ＋
</button>

        </div>
      </nav>
    </div>
  );
}

export default App;