import { useState, useEffect } from 'react';

export const useDataSlice = (getAsyncData, containerHeight, scrollTop, itemHeight, filter, filterFn, filterValue) => {

  // actual data stored in the hook's state
  const [trueData, setTrueData] = useState([]);

  // Get async data call
  useEffect(() => {
    const callApi = async () => {
      const dt = await getAsyncData();
      setTrueData(dt);
    };
    callApi();
  }, [getAsyncData]);

  // Filter logic if required

  const data = filter ? trueData.filter((ap) => filterFn(ap, filterValue)) : null

  // Items count, index, top position calculations
  const numItems = filter ? data.length : trueData.length;
  const innerHeight = numItems * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight)
  );

  // cherry pick items based on calculations
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (filter) {

      items.push(data[i]);
    } else {
      items.push(trueData[i]);

    }
  }

  // return calculated values and cherry picked items

  if (filter) {
    return [data, items, innerHeight, startIndex, endIndex];

  }
  return [trueData, items, innerHeight, startIndex, endIndex];
}