import MainLayout from '@components/shared/layout/mainLayout';

import { useEffect, useState } from 'react';

const Question = () => {
  return (
    <MainLayout>
      <div className=' text-center text-4xl '>
        <p className='font-bold mb-5'>Standard Questionnaire ?</p>
        <p>Yes</p>
      </div>
    </MainLayout>
  );
};

export default Question;
