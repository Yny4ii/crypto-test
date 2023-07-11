export const formatNumber = (num: number): string => {
    if (Math.abs(num) >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (Math.abs(num) >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else {
        return num.toFixed(2).toString();
    }
};