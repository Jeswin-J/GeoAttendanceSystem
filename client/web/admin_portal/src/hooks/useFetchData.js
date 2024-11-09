import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useFetchData = (action, dataKey) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state[dataKey]);

    useEffect(() => {
        if (!data.length) {
            dispatch(action());
        }
    }, [dispatch, data, action]);

    return { data, loading, error };
};

export default useFetchData;
