export const addDotToNumber = (money: string, dot = ".") => {
    if (money.length <= 3) {
        return money;
    }
    const moneyArray = money.split("");
    const dotIndex = moneyArray.length - 3;
    moneyArray.splice(dotIndex, 0, dot);
    return moneyArray.join("");
};
