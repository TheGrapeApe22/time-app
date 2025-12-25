import { timeStringToDate } from '../utils/dates';
import './clock.css';
import { Todo } from './TodoItem';

type Shading = {
    start: number;
    end: number;
}

type ClockProps = {
    todos: Todo[];
}

export default function Clock({ todos }: ClockProps) {
    // times
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    // sizes
    const size = 400;
    const radius = size * 0.45;
    const cx = size / 2;
    const cy = size / 2;
    const minuteLen = radius * 0.85;
    const hourLen = radius * 0.6;

    // Angles in radians: 0 at 12 o'clock, clockwise
    const minuteAngle = (Math.PI / 30) * minute; // 360/60
    const hourAngle = (Math.PI / 6) * hour + (Math.PI / 360) * minute; // 360/12 plus minute contribution

    // Convert polar to cartesian end points
    const mx = cx + minuteLen * Math.sin(minuteAngle);
    const my = cy - minuteLen * Math.cos(minuteAngle);
    const hx = cx + hourLen * Math.sin(hourAngle);
    const hy = cy - hourLen * Math.cos(hourAngle);

    function getShadings(todo: Todo): Shading {
        const startDate = timeStringToDate(todo.startTime);
        const endDate = timeStringToDate(todo.endTime);
        if (!startDate || !endDate)
            return { start: 0, end: 0 };
        return {
            start: startDate.getHours() % 12 * (Math.PI / 6) + (Math.PI / 360) * startDate.getMinutes(),
            end: endDate.getHours() % 12 * (Math.PI / 6) + (Math.PI / 360) * endDate.getMinutes()
        };
    }

    // Build an arc path for a pie slice between angles (radians), 0 at 12 o'clock, clockwise
    const arcPath = ({start: a1, end: a2} : Shading, r: number) => {
        const TAU = Math.PI * 2;
        function normalize(angle: number) { return ((angle % TAU) + TAU) % TAU; }
        const start = normalize(a1);
        const end = normalize(a2);
        
        const sweepRaw = end - start;
        const sweep = sweepRaw <= 0 ? sweepRaw + TAU : sweepRaw;
        const largeArc = sweep > Math.PI ? 1 : 0;

        const x1 = cx + r * Math.sin(start);
        const y1 = cy - r * Math.cos(start);
        const x2 = cx + r * Math.sin(end);
        const y2 = cy - r * Math.cos(end);

        return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }

    return (
        <div className="clock-root">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle className="clock-face" cx={cx} cy={cy} r={radius} />
                {todos.map((todo, idx) => {
                    const s = getShadings(todo);
                    return <path key={idx} className="clock-shade" d={arcPath(s, radius)} />
                })}
                <circle className="clock-center" cx={cx} cy={cy} r={3} />
                <line className="hand hour-hand" x1={cx} y1={cy} x2={hx} y2={hy} />
                <line className="hand minute-hand" x1={cx} y1={cy} x2={mx} y2={my} />
            </svg>
        </div>
    );
}
