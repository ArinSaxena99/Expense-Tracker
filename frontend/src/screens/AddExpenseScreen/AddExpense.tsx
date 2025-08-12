import React from 'react';
import FormInput from '../../components/FormInput/FormInput';
import { useAddExpense } from './hooks/useAddExpense';

const AddExpense = () => {
  const {
    addExpense,
    handleInput,
    handleDateChange,
    handleAdd,
    setAddExpense,
    setShowPicker,
    showPicker,
    tempDate,
  } = useAddExpense();

  return (
    <FormInput
      tempDate={tempDate}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      setAddExpense={setAddExpense}
      handleAdd={handleAdd}
      handleDateChange={handleDateChange}
      handleInput={handleInput}
      addExpense={addExpense}
    />
  );
};

export default AddExpense;
