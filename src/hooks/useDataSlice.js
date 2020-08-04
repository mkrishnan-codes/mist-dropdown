import { useState, useEffect } from 'react';

export const useDataSlice = (getAsyncData, windowHeight, scrollTop, itemHeight, filter, filterFn, filterValue) => {
  const [trueData, setTrueData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      const dt = await getAsyncData();
      setTrueData(dt);
    };
    callApi();
  }, []);
  const data = filter ? trueData.filter((ap) => filterFn(ap, filterValue)) : null
  const numItems = filter ? data.length : trueData.length;
  const innerHeight = numItems * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (filter) {

      items.push(data[i]);
    } else {
      items.push(trueData[i]);

    }
  }
  if (filter) {
    return [data, items, innerHeight, startIndex, endIndex];

  }
  return [trueData, items, innerHeight, startIndex, endIndex];
}