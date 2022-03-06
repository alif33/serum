import * as React from 'react';
import {
  transactionServices,
  refreshAccount,
  useGetAccountInfo
} from '@elrondnetwork/dapp-core';
import { Button } from 'react-bootstrap';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { contractAddress } from 'config';
import './index.css';

const Actions = () => {
  const [inputValueFirst, setInputValueFirst] = React.useState<
    number | undefined
  >();
  const [inputValueSecond, setInputValueSecond] = React.useState<
    number | undefined
  >();
  const [errorValueFirst, setErrorValueFirst] = React.useState<string>();
  const [errorValueSecond, setErrorValueSecond] = React.useState<string>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const { account } = useGetAccountInfo();
  const balanceVAL = parseFloat(account.balance) / 1000000000000000000 - 0.02;

  const maxBuyFill = async () => {
    setInputValueFirst(parseFloat(balanceVAL.toFixed(2)));
  };

  const MAX_VAL_FIRST = balanceVAL.toFixed(2);
  const withValueLimitFirst = (inputObj: any) => {
    const { value } = inputObj;
    if (value <= MAX_VAL_FIRST) return true;
    return false;
  };

  const MAX_VAL_SECOND = 100 * 2000;
  const withValueLimitSecond = (inputObj: any) => {
    const { value } = inputObj;
    if (value <= MAX_VAL_SECOND) return true;
    return false;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const { sendTransactions } = transactionServices;

  const sendBuyTransaction = async () => {
    if ((!errorValueFirst || !errorValueSecond) && inputValueFirst) {
      console.log(inputValueFirst * 1000000000000000000);
      const buyTransaction = {
        value: inputValueFirst * 1000000000000000000,
        data: 'buy',
        receiver: contractAddress
      };

      await refreshAccount();

      const { sessionId /*, error*/ } = await sendTransactions({
        transactions: buyTransaction,
        transactionsDisplayInfo: {
          processingMessage: 'Processing Buy transaction',
          errorMessage: 'An error has occured during Buy',
          successMessage: 'Buy transaction successful'
        },
        redirectAfterSign: false
      });
      if (sessionId != null) {
        setTransactionSessionId(sessionId);
      }
    }
  };

  const onChangeFirst = (e: NumberFormatValues) => {
    setInputValueFirst(e.floatValue);
    setInputValueSecond(e.floatValue ? e.floatValue * 2000 : 0);
    if (e.floatValue && e.floatValue < 0.5) {
      setErrorValueFirst('value must be greater than 0.5');
      setErrorValueSecond('value must be greater than 1,000');
    } else {
      setErrorValueFirst('');
      setErrorValueSecond('');
    }
  };

  const onChangeSecond = (e: NumberFormatValues) => {
    setInputValueSecond(e.floatValue);
    setInputValueFirst(e.floatValue ? e.floatValue / 2000 : 0);
    if (e.floatValue && e.floatValue < 1000) {
      setErrorValueFirst('value must be greater than 0.5');
      setErrorValueSecond('value must be greater than 1,000');
    } else {
      setErrorValueFirst('');
      setErrorValueSecond('');
    }
  };

  return (
    <div className='content mt-4'>
      <form>
        <div className='form-group row mb-4'>
          <label htmlFor='first' className='col-sm-4 col-form-labels'>
            EGLD:
          </label>
          <div className='col-sm-8'>
            <NumberFormat
              id='first'
              value={inputValueFirst}
              onValueChange={onChangeFirst}
              thousandSeparator={true}
              isAllowed={withValueLimitFirst}
              defaultValue={inputValueFirst}
              placeholder='enter amount'
              className={`${
                errorValueSecond
                  ? 'error form-control form-control-lg'
                  : 'form-control form-control-lg'
              } `}
            />
            <div className='invalid-feedback'>{errorValueFirst}</div>
            <Button variant='secondary' size='sm' onClick={maxBuyFill}>
              MAX!
            </Button>
          </div>
        </div>
        <div className='form-group row mb-4'>
          <label htmlFor='second' className='col-sm-4 col-form-label'>
            CYBER:
          </label>
          <div className='col-sm-8'>
            <NumberFormat
              id='second'
              value={inputValueSecond}
              onValueChange={onChangeSecond}
              thousandSeparator={true}
              isAllowed={withValueLimitSecond}
              defaultValue={inputValueSecond}
              placeholder='enter amount'
              className={`${
                errorValueSecond
                  ? 'error form-control form-control-lg'
                  : ' form-control form-control-lg'
              } `}
            />
            <div className='invalid-feedback'>{errorValueSecond}</div>
          </div>
        </div>
        <Button
          className='btn mb-3'
          size='lg'
          onClick={sendBuyTransaction}
          disabled={errorValueFirst || errorValueSecond ? true : false}
        >
          Buy
        </Button>
      </form>
    </div>
  );
};

export default Actions;
