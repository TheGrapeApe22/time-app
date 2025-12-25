import convert from 'color-convert';

// Generate 16 evenly spaced hues with full saturation and brightness (HSB)
export const colors: string[] = Array.from({ length: 16 }, (_, i) => {
    const h = Math.round((i * 360) / 16); // hue degrees
    return '#' + convert.rgb.hex(convert.hsv.rgb(h, 70, 100));
});

export function getTranslucent(color : string): string {
    return `${color.slice(0,7)}e6`;
}

// source: https://codepen.io/sosuke/pen/Pjoqqp
/*export const filters = [
    "invert(26%) sepia(100%) saturate(7465%) hue-rotate(357deg) brightness(96%) contrast(117%)", // red
    "invert(53%) sepia(93%) saturate(1803%) hue-rotate(348deg) brightness(100%) contrast(103%)", // orange
    "invert(99%) sepia(64%) saturate(1769%) hue-rotate(351deg) brightness(101%) contrast(88%)", // yellow
    "invert(59%) sepia(35%) saturate(913%) hue-rotate(91deg) brightness(95%) contrast(88%)", // green
    "invert(52%) sepia(38%) saturate(3518%) hue-rotate(183deg) brightness(105%) contrast(84%)", // blue
    "invert(17%) sepia(60%) saturate(6514%) hue-rotate(273deg) brightness(93%) contrast(99%)", // purple
    "invert(66%) sepia(88%) saturate(3706%) hue-rotate(284deg) brightness(101%) contrast(101%)", // pink
    "invert(47%) sepia(13%) saturate(5%) hue-rotate(320deg) brightness(98%) contrast(95%)", // gray
]*/