import React, { useEffect } from 'react';

import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import { useDispatch } from 'react-redux';
import { setData } from '../../app/tableSlice';

function Locations() {
    const dispatch = useDispatch();
  
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', age: 28 }
  ];

  useEffect(() => {
    dispatch(setData(data));
  }, [data, dispatch]);

  return (
    <>
      <Portal children={

            <Table columns={columns} data={data} />

      }/>
    </>
  )
}

export default Locations;
