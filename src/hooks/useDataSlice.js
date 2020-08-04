import { useState, useEffect } from 'react';

export const useDataSlice = (getAsyncData, containerHeight, scrollTop, itemHeight, filter, filterFn, filterValue) => {

  // actual data stored in the hook's state
  const [trueData, setTrueData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get async data call
  useEffect(() => {
    const callApi = async () => {
      const dt = await getAsyncData();
      setTrueData(dt);
      setLoading(false)
    };
    callApi();
  }, [getAsyncData]);

  // Filter logic if required
  const hasFilter = filter && filterValue;
  const data = hasFilter ? trueData.filter((ap) => filterFn(ap, filterValue)) : null

  // Items count, index, top position calculations
  const numItems = hasFilter ? data.length : trueData.length;
  const innerHeight = numItems * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight)
  );

  // cherry pick items based on calculations
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (hasFilter) {

      items.push(data[i]);
    } else {
      items.push(trueData[i]);

    }
  }

  // return calculated values and cherry picked items

  if (hasFilter) {
    return [data, items, loading, innerHeight, startIndex, endIndex];

  }
  return [trueData, items, loading, innerHeight, startIndex, endIndex];
}