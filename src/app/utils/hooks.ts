import axios from "../api/axios";
import { useEffect, useState } from "react";

interface FetchInfiniteResourceProps {
  // The URL of the API endpoint
  url: string;
  // Cursor of the page
  cursor: number;
  // Parameter with which the backend accepts the cursor number
  queryParam: string;
  // The property on the response which will indicate if the next page exists
  nextPageParam: string;

  // Other config
  config: {
    enabled: boolean;
  };
}

// Prop types for useFetchInfiniteResource
interface StateProps<T> {
  data: T[];
  isLoading: boolean;
  hasNextPage: boolean;
  next?: number | null;
  isFetchingNextPage: boolean;
}

/**
 * This function will be used for fetching
 * an infinite resource from the back-end
 */
export const useFetchInfiniteResource = <T>({
  url,
  cursor,
  queryParam,
  nextPageParam,
  config: { enabled },
}: FetchInfiniteResourceProps) => {
  // Creating a new state
  const [state, setState] = useState<Partial<StateProps<T>>>({
    data: [],
    next: null,
    isLoading: true,
    hasNextPage: false,
    isFetchingNextPage: false,
  });

  // Method for setting the data
  const setData = (newState: T[]) => setState({ ...state, data: newState });

  useEffect(() => {
    // The function for sending the request
    const request = async () => {
      // If it's not the first time that this request has triggered
      if (!state.isLoading) setState({ ...state, isFetchingNextPage: true });

      // Sending the request
      const { data: response } = await axios.get(url, {
        params: {
          // Query paramter
          [queryParam]: cursor,
        },
      });

      // Updating the state
      setState({
        // If it's the first time that this request is invoked
        isLoading: state?.isLoading && false,
        // Merging the data
        data: state?.data?.concat(response?.data),
        // Checking if the next page exists
        hasNextPage: response[nextPageParam] !== null,
        // If it's not the first time that the request is invoked then set it to false
        isFetchingNextPage: !state?.isLoading && false,
        // Setting the next page
        next:
          state?.next !== response[nextPageParam]
            ? response[nextPageParam]
            : null,
      });
    };

    // Only sending the request when the hook is enabled
    if (enabled) request();

    return () => setState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, enabled]);

  // Returning all the items from the state and the function to update the data manually
  return { ...state, setData };
};
