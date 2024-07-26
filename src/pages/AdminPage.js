import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import NewCase from '../components/NewCase';
import PendingCase from '../components/Pending';

const AdminPage = () => {

  return (
    <>
    <HeaderAdmin/>
    <NewCase/>
    <PendingCase/>
    </>
  );
};

export default AdminPage;
