const Loading = () => {
  return (
    <div className='fixed flex top-0 bottom-0 left-0 right-0 items-center justify-center z-50'>
      <div className=' flex justify-center items-center'>
        <div
          data-testid='loader'
          className='animate-spin rounded-full h-32 w-32 border-b-4 border-csa-primary'
        ></div>
      </div>
    </div>
  );
};

export default Loading;
