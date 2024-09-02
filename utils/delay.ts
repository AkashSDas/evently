export function delay(max: number = 2500) {
    const randomDelayTime = Math.floor(Math.random() * (max - 500 + 1));
    return new Promise((resolve) => setTimeout(resolve, randomDelayTime));
}
