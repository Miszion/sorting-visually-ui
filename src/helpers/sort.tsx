import { Line } from '@/models/Line';
import { Dispatch, SetStateAction } from "react";
import { sleep } from './functions';

export const partition = async (lineList: Line[], low: number, high: number, setLineList: Dispatch<SetStateAction<Line[]>>) => {
    const pivot = lineList[high].height;
    let i = (low - 1);

    for (let j = low; j < high; j++) {
        if (lineList[j].height < pivot) {
            i++;
            const temp = lineList[i];
            lineList[i] = lineList[j];
            await sleep(0.25);
            setLineList([... lineList]);
            lineList[j] = temp;
            await sleep(0.25);
            setLineList([... lineList]);
        }
    }

    const temp = lineList[i + 1];
    lineList[i+1] = lineList[high];
    await sleep(0.25);
    setLineList([... lineList]);
    lineList[high] = temp;
    await sleep(0.25);
    setLineList([... lineList]);
    return i + 1;
}

export const mergeSort = async (lineList: Line[], n: number, setLineList: Dispatch<SetStateAction<Line[]>>, setIsPartiallySorted: Dispatch<SetStateAction<boolean>>) => {
    let curr_size;
    let left_start;

    setIsPartiallySorted(true);

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            const mid = Math.min(left_start + curr_size - 1, n - 1);
            const right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
            await merge(lineList, left_start, mid, right_end, setLineList);
        }
    }
    setIsPartiallySorted(false);
}

const merge = async (lineList: Line[], l: number , m: number, r: number, setLineList: Dispatch<SetStateAction<Line[]>>) => {
    let i, j, k;
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = Array(n1).fill(0);
    const R = Array(n2).fill(0);

    for (i = 0; i < n1; i++)
        L[i] = lineList[l + i];
    for (j = 0; j < n2; j++)
        R[j] = lineList[m + 1 + j];

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) {
        if (L[i].height <= R[j].height) {
            lineList[k] = L[i];
            await sleep(0.25);
            setLineList([... lineList]);
            i++;
        } else {
            lineList[k] = R[j];
            await sleep(0.25);
            setLineList([... lineList]);
            j++;
        }
        k++;
    }

    while (i < n1) {
        lineList[k] = L[i];
        await sleep(0.25);
        setLineList([... lineList]);
        i++;
        k++;
    }

    while (j < n2) {
        lineList[k] = R[j];
        await sleep(0.25);
        setLineList([... lineList]);
        j++;
        k++;
    }
    setLineList([... lineList]);
}

export const quickSort = async (lineList: Line[], low: number, high: number, setLineList: Dispatch<SetStateAction<Line[]>>, setIsPartiallySorted: Dispatch<SetStateAction<boolean>>) => {
    setIsPartiallySorted(true);
    if (low < high) {
        const pi = await partition(lineList, low, high, setLineList);
        quickSort(lineList, low, pi-1, setLineList, setIsPartiallySorted);
        quickSort(lineList, pi+1, high, setLineList, setIsPartiallySorted);
    }
    setIsPartiallySorted(false);
}

export const insertionSort = async (lineList: Line[], setLineList: Dispatch<SetStateAction<Line[]>>, setIsPartiallySorted: Dispatch<SetStateAction<boolean>>) => {
    let key;
    setIsPartiallySorted(true);
    for (let i = 1; i < lineList.length; i++) {
        key = lineList[i]
        let j = i - 1;

        while (j >= 0 && lineList[j].height > key.height) {
            lineList[j + 1] = lineList[j]
            await sleep(0.25);
            setLineList([... lineList ])
            j = j - 1;
        }

        lineList[j + 1] = key
        await sleep(0.25);
        setLineList([...lineList])
    }
    setIsPartiallySorted(false);
}

export const selectionSort = async (lineList: Line[], setLineList: Dispatch<SetStateAction<Line[]>>, setIsPartiallySorted: Dispatch<SetStateAction<boolean>>) => {
    const n = lineList.length;
    setIsPartiallySorted(true);
    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++)
            if (lineList[j].height < lineList[min_idx].height)
                min_idx = j;

        const temp = lineList[min_idx];

        lineList[min_idx] = lineList[i]
        await sleep(0.25);
        setLineList([...lineList])

        lineList[i] = temp;
        await sleep(0.25);
        setLineList([...lineList])
    }
    setIsPartiallySorted(false);
}