import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import './index.css';

const Dashboard = () => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body text-center rounded border-0'>
              <TopInfo />
              <Actions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
