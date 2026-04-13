export default function formatNumber(num: number): string {
    if (num >= 1000000) {
        const val = num / 1000000;
        return Math.floor(val) === val ? val + 'm' : val.toFixed(1) + 'm';
    } else if (num >= 1000) {
        const val = num / 1000;
        return Math.floor(val) === val ? val + 'k' : val.toFixed(1) + 'k';
    } else {
        return num.toString();
    }
}
