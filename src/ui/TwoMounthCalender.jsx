// TwoMonthCalendar.jsx
import { useState, useCallback } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  addMonths,
  startOfDay,
  endOfDay,
  isSameDay,
  isWithinInterval,
  min as dfMin,
  max as dfMax,
  differenceInCalendarDays,
  max as dateMax,
  min as dateMin,
  isBefore,
} from 'date-fns';

import Button from './Button.jsx';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { LuTimerReset } from 'react-icons/lu';

function normalizeRange(a, b) {
  const start = startOfDay(dfMin([a, b]));
  const end = endOfDay(dfMax([a, b]));
  return { start, end };
}
function intersectDays(a, b) {
  const start = dateMax([startOfDay(a.start), startOfDay(b.start)]);
  const end = dateMin([endOfDay(a.end), endOfDay(b.end)]);
  if (start > end) return null;
  return { start, end };
}
function dayCount(range) {
  return (
    differenceInCalendarDays(endOfDay(range.end), startOfDay(range.start)) + 1
  );
}
function isRangeAllowed(candidate, events) {
  for (const ev of events) {
    const evRange = {
      start: startOfDay(ev.start),
      end: endOfDay(ev.end ?? ev.start),
    };
    const inter = intersectDays(candidate, evRange);
    if (!inter) continue;

    const overlapDays = dayCount(inter);
    if (overlapDays === 1) {
      const interDay = startOfDay(inter.start);
      const evStartDay = startOfDay(evRange.start);
      const evEndDay = startOfDay(evRange.end);
      const allowed =
        isSameDay(interDay, evStartDay) || isSameDay(interDay, evEndDay);
      if (allowed) continue;
    }
    return { ok: false, conflict: ev, inter };
  }
  return { ok: true };
}

export default function TwoMonthCalendar({
  localizer,
  events = [],
  onChange, // (range|null) => void
  onInvalidSelection, // (reason, payload) => void
  selectionMode = 'range', // 'single' | 'range'
  initialDate = new Date(),
  layout = 'cols',
  height = 520,
  onDoubleClickEvent, // passthrough
  minDate, // NEW: Date, defaults to today (startOfDay)
}) {
  const todayStart = startOfDay(new Date());
  const minSelectable = startOfDay(minDate ?? todayStart);

  const [baseDate, setBaseDate] = useState(initialDate);
  const [anchor, setAnchor] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });

  const next = useCallback(() => setBaseDate((d) => addMonths(d, 1)), []);
  const prev = useCallback(() => setBaseDate((d) => addMonths(d, -1)), []);
  const today = useCallback(() => setBaseDate(new Date()), []);

  const reject = useCallback(
    (reason, payload) => {
      onInvalidSelection?.(reason, payload);
    },
    [onInvalidSelection],
  );

  const finalizeIfAllowed = useCallback(
    (candidate) => {
      // Guard against minDate
      if (isBefore(startOfDay(candidate.start), minSelectable)) {
        reject('before-minDate', { candidate, minDate: minSelectable });
        return false;
      }
      const { ok, conflict } = isRangeAllowed(candidate, events);
      if (!ok) {
        reject('overlap-not-allowed', { candidate, conflict });
        return false;
      }
      setRange(candidate);
      onChange?.(candidate);
      return true;
    },
    [events, minSelectable, onChange, reject],
  );

  const handleSelectSlot = useCallback(
    ({ start }) => {
      const clicked = startOfDay(start);

      // Disallow clicking past days
      if (isBefore(clicked, minSelectable)) {
        reject('before-minDate', { clicked, minDate: minSelectable });
        return;
      }

      if (selectionMode === 'single') {
        const candidate = { start: clicked, end: endOfDay(clicked) };
        setAnchor(null);
        finalizeIfAllowed(candidate);
        return;
      }

      // range mode
      if (!anchor) {
        setAnchor(clicked);
        setRange({ start: clicked, end: endOfDay(clicked) }); // provisional
        return;
      }

      if (isSameDay(clicked, anchor)) {
        // toggle off
        setAnchor(null);
        setRange({ start: null, end: null });
        onChange?.(null);
        return;
      }

      const candidate = normalizeRange(anchor, clicked);
      setAnchor(null);
      finalizeIfAllowed(candidate);
    },
    [anchor, selectionMode, finalizeIfAllowed, onChange, minSelectable, reject],
  );

  const dayPropGetter = useCallback(
    (date) => {
      // Mark days before minDate as disabled (no pointer, dimmed)
      if (isBefore(startOfDay(date), minSelectable)) {
        return { className: 'twm-disabled' };
      }

      const { start, end } = range;
      if (!start || !end) return {};

      const inRange = isWithinInterval(date, {
        start: startOfDay(start),
        end: endOfDay(end),
      });
      if (!inRange) return {};

      const isEdge = isSameDay(date, start) || isSameDay(date, end);
      return { className: isEdge ? 'twm-selected-edge' : 'twm-selected' };
    },
    [range, minSelectable],
  );

  const commonProps = {
    localizer,
    events,
    views: { month: true },
    defaultView: Views.MONTH,
    toolbar: false,
    selectable: 'ignoreEvents',
    onSelectSlot: handleSelectSlot,
    dayPropGetter,
    onSelectEvent: (event) => {
      const clicked = startOfDay(event.start);
      if (isBefore(clicked, minSelectable)) {
        reject('before-minDate', { clicked, minDate: minSelectable });
        return;
      }
      if (selectionMode === 'single') {
        const candidate = { start: clicked, end: endOfDay(clicked) };
        setAnchor(null);
        finalizeIfAllowed(candidate);
      } else if (!anchor) {
        setAnchor(clicked);
        setRange({ start: clicked, end: endOfDay(clicked) });
      } else if (isSameDay(clicked, anchor)) {
        setAnchor(null);
        setRange({ start: null, end: null });
        onChange?.(null);
      } else {
        const candidate = normalizeRange(anchor, clicked);
        setAnchor(null);
        finalizeIfAllowed(candidate);
      }
    },
    onDoubleClickEvent,
    style: { height, border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 },
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: layout === 'cols' ? '1fr 1fr' : '1fr',
      }}
    >
      {/* Shared toolbar */}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Button onClick={prev} $size="mediumSmall" $variation="brand-soft">
          <HiChevronLeft />
          <span>Previous</span>
        </Button>
        <Button onClick={today} $size="mediumSmall" $variation="brand-soft">
          <LuTimerReset />
          <span>Today</span>
        </Button>
        <Button onClick={next} $size="mediumSmall" $variation="brand-soft">
          <span>Next</span>
          <HiChevronRight />
        </Button>
        <div style={{ marginLeft: 'auto', opacity: 0.85 }}>
          {localizer.format(baseDate, 'MMMM yyyy')} {' • '}
          {localizer.format(addMonths(baseDate, 1), 'MMMM yyyy')}
          {anchor && <span style={{ marginLeft: 12 }}>(select end date)</span>}
        </div>
      </div>

      <Calendar {...commonProps} date={baseDate} />
      <Calendar {...commonProps} date={addMonths(baseDate, 1)} />
    </div>
  );
}
