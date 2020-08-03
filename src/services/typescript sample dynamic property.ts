// This didn't turn out to be great, but a good lesson in strong types
export const mixThemUp = () => {
  const cardPairs: string[] = []; // fill some ordered data

  return cardPairs.reduce((shuffledArray, card) => {
    const methodOptions: string[] = ['push', 'unshift']; // add to the begining or end
    const headsOrTails = Math.floor(Math.random() * 1); // 0 or 1
    const methodToUse = methodOptions[headsOrTails] as keyof Array<string>;
    (shuffledArray[methodToUse] as Function)(card);
    return shuffledArray;
  }, []);
};
