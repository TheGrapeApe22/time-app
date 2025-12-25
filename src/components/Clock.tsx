import { timeStringToDate } from '../utils/dates';
import './clock.css';
import { Todo } from './TodoItem';
import { colors, getTranslucent } from '../utils/colors';

type Shading = {
    start: number;
    end: number;
}

type ClockProps = {
    todos: Todo[];
    outlineColor: string;
    shadeColor: string;
    fillColor: string;
}

const TAU = Math.PI * 2;
const normalize = (angle: number) => ((angle % TAU) + TAU) % TAU;

export default function Clock({ todos, outlineColor, shadeColor, fillColor }: ClockProps) {
    // important settings
    const gap = 0;
    const size = 400;

    // times
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    // constants dependent on size
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

    function getShadings(todo: Todo): Shading | null {
        const startDate = timeStringToDate(todo.startTime);
        const endDate = timeStringToDate(todo.endTime);
        if (!startDate || !endDate)
            return null;
        return {
            start: startDate.getHours() % 12 * (Math.PI / 6) + (Math.PI / 360) * startDate.getMinutes(),
            end: endDate.getHours() % 12 * (Math.PI / 6) + (Math.PI / 360) * endDate.getMinutes()
        };
    }

    // Build an annular sector path (ring slice) between angles (radians), 0 at 12 o'clock, clockwise
    // Starts gap px from center and ends gap px from the outer edge
    const arcPath = ({start: a1, end: a2} : Shading) => {
        const start = normalize(a1);
        const end = normalize(a2);
        
        const sweepRaw = end - start;
        const sweep = sweepRaw <= 0 ? sweepRaw + TAU : sweepRaw;
        const largeArc = sweep > Math.PI ? 1 : 0;

        const outerR = Math.max(0, radius - gap);
        const innerR = Math.max(0, gap);

        const x1o = cx + outerR * Math.sin(start);
        const y1o = cy - outerR * Math.cos(start);
        const x2o = cx + outerR * Math.sin(end);
        const y2o = cy - outerR * Math.cos(end);

        const x2i = cx + innerR * Math.sin(end);
        const y2i = cy - innerR * Math.cos(end);
        const x1i = cx + innerR * Math.sin(start);
        const y1i = cy - innerR * Math.cos(start);

        // Draw outer arc clockwise, then line inward, then inner arc counter-clockwise back to start
        return `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1i} ${y1i} Z`;
    }

    const arcLabel = ({start: a1, end: a2}: Shading, text: string) => {
        const start = normalize(a1);
        const end = normalize(a2);
        const sweepRaw = end - start;
        const sweep = sweepRaw <= 0 ? sweepRaw + TAU : sweepRaw;
        const mid = start + sweep / 2;
        
        // center of mass formula
        const r = 4*radius*Math.sin(sweep/2)/(3*sweep);

        const lx = cx + r * Math.sin(mid);
        const ly = cy - r * Math.cos(mid);

        return (
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="clock-label">
                {text}
            </text>
        );
    }

    return (
        <div className="clock-root">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle cx={cx} cy={cy} r={radius} fill={fillColor} />
                {todos.map((todo, idx) => {
                    const s = getShadings(todo);
                    return s && (<g key={idx}>
                        <path d={arcPath(s)} fill={getTranslucent(colors[todo.colorIndex])} stroke="none" />
                        {arcLabel(s, todo.text)}
                    </g>);
                })}
                <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={outlineColor} strokeWidth={4} strokeLinecap='round'/>
                <line x1={cx} y1={cy} x2={mx} y2={my} stroke={outlineColor} strokeWidth={3} strokeLinecap='round' />
                <circle cx={cx} cy={cy} r={3} fill={outlineColor} />
                <circle cx={cx} cy={cy} r={radius} fill="transparent" stroke={outlineColor} strokeWidth={5} />
            </svg>
        </div>
    );
}
