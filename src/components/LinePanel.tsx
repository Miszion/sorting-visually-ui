import { createArray, randomizeArray } from "@/helpers/functions";
import { Button } from "@nextui-org/button";
import { insertionSort, mergeSort, quickSort, selectionSort } from "@/helpers/sort";
import { useEffect, useState } from "react"
import { Line } from "@/models/Line";

export const LinePanel: React.FC = () => {
    const [lineList, setLineList] = useState<Line[]>([]);
    const [, setWindowWidth] = useState<number>();
    const [isPartiallySorted, setIsPartiallySorted] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(false);

    useEffect(() => {
        const array = createArray(window.innerWidth);
        setWindowWidth(window.innerWidth);
        setLineList(array);

        function handleResize() {
            const array = createArray(window.innerWidth);
            setWindowWidth(window.innerWidth);
            setLineList(array);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <div className='line-panel'>
            <div className='line-grid'>
                {lineList.map((line: Line, index: number) => 
                    <div className='line' key={index} style={{borderRightColor: line.color, height: line.height}}/>
                )}
            </div>
            <div className='prompt'>
                Select a sorting algorithm:
            </div>
            <div className='button-group'>
                <Button radius='full' onPress={async () => {
                    if (!isPartiallySorted) {
                        if (isSorted) {
                            setLineList(randomizeArray(lineList))
                        }
                        await insertionSort(lineList, setLineList, setIsPartiallySorted);
                        setIsSorted(true);
                    }
                }}>Insertion Sort</Button>
                <Button radius='full' onPress={async () => {
                    if (!isPartiallySorted) {
                        if (isSorted) {
                            setLineList(randomizeArray(lineList))
                        }
                        await quickSort(lineList, 0, lineList.length - 1, setLineList, setIsPartiallySorted)
                        setIsSorted(true);
                    }
                }}>Quicksort</Button>
                <Button radius='full' onPress={async () => {
                    if (!isPartiallySorted) {
                        if (isSorted) {
                            setLineList(randomizeArray(lineList))
                        }
                        await mergeSort(lineList, lineList.length, setLineList, setIsPartiallySorted)
                        setIsSorted(true);
                    }
                }}>Merge Sort</Button>
                <Button radius='full' onPress={async () => {
                    if (!isPartiallySorted) {
                        if (isSorted) {
                            setLineList(randomizeArray(lineList))
                        }
                        await selectionSort(lineList, setLineList, setIsPartiallySorted)
                        setIsSorted(true);
                    }
                }}>Selection Sort</Button>
            </div>
        </div>
    )
}