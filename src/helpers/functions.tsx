import { Line } from "@/models/Line"
import colors from 'tailwindcss/colors'

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const createArray = (width: number) => {
    const lineList = []
    for (let x = 0; x < width / 4; x++) {
        const height = x;
        let color = '';

        if (height >= 0 && height < 100) {
            color = colors.pink[600]
        }
        else if (height >= 100 && height < 200) {
            color = colors.red[600]
        }
        else if (height >= 200 && height < 300) {
            color = colors.orange[600]
        }
        else if (height >= 300 && height < 400) {
            color = colors.yellow[600]
        }
        else if (height >= 400 && height < 500) {
            color = colors.green[600]
        }
        else if (height >= 500 && height < 600) {
            color = colors.cyan[600]
        }
        else if (height >= 600 && height < 700) {
            color = colors.blue[600]
        }
        else {
            color = colors.purple[600]
        }

        const line : Line = { height,  color}
        lineList.push(line);
    }
    return randomizeArray(lineList);
}

export const randomizeArray = (lineList: Array<Line>) => {
    for (const line in lineList) {
        const random = Math.floor((Math.random() * (lineList[line].height + 1)));
        const temp = lineList[line]
        lineList[line] = lineList[random]
        lineList[random] = temp
    }
    return lineList;
}