import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-black' data-testid='topInfo'>
      <div>
        <h1 className='mb-4'>$CYBER Token Presale</h1>
      </div>
      <div className='mb-1'>
        <span className='opacity-6 mr-1'>Your address:</span>
        <span data-testid='accountAddress'> {address}</span>
      </div>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'> {contractAddress}</span>
      </div>
      <div>
        <h3 className='py-2'>
          <span>Max Usable: </span>
          <DappUI.Denominate value={account.balance} data-testid='balance' />
        </h3>
      </div>
    </div>
  );
};

export default TopInfo;
