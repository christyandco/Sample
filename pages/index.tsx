import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import useSwr from 'swr';

const baseUrl = 'http://localhost:3004';

export const useFakeRequest = (path: string, name?: string) => {
  if (!path) {
    throw new Error('Path is required');
  }
  const url = name ? baseUrl + path + '/' + name : baseUrl + path;
  const { data, error, isValidating, mutate } = useSwr(url);
  return { data, error, isValidating, mutate };
};

const Login = () => {
  const router = useRouter();
  const { debug } = router.query;
  const refDebug = useRef(false);
  const { data: userList } = useFakeRequest('/me');
  const languageList = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ge', name: 'German' },
  ];
  const portalTypeList = ['customer', 'vendor'];
  const { data: plantList } = useFakeRequest('/plant');

  interface ILoginData {
    token: string;
    language: string;
    portalType: string;
    plantId: string;
  }

  const formik = useFormik<ILoginData>({
    initialValues: {
      token: 'lb-tk',
      language: languageList[0].code,
      portalType: portalTypeList[0],
      plantId: 'RIO',
    },
    onSubmit: (value) => {
      document.cookie = `token=${value.token}`;
      document.cookie = `euser=`;
      document.cookie = `selectedPlantId=${value.plantId}`;
      document.cookie = `selectedPlantName=${
        plantList.filter((plant: any) => plant.plantId === value.plantId)[0]
          .plantName
      }`;
      document.cookie = `selectedLanguage=${value.language}`;
      document.cookie = `portalType=${value.portalType}`;
      window.location.href = '/list';
    },
  });

  useEffect(() => {
    refDebug.current = debug === 'true';
    if (!refDebug.current) {
      router.replace('/list');
    }
  }, [baseUrl]);

  return (
    <>
      {refDebug.current && (
        <div className='flex justify-center items-center h-screen'>
          <div className='lg:w-1/2 xl:max-w-screen-sm'>
            <h2
              className='text-center text-2xl text-csa-primary font-display font-semibold  xl:text-4xl
                  xl:text-bold'
            >
              Application
            </h2>
            <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 xl:max-w-2xl'>
              <div className='mt-5'>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className='text-sm font-bold text-gray-700 tracking-wide'>
                      User
                    </div>
                    <div className='border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500'>
                      <select
                        className='w-full text-lg p-3'
                        id='token'
                        value={formik.values.token}
                        onChange={formik.handleChange}
                      >
                        {userList?.map((item: any, index: number) => {
                          return (
                            <option key={`${index}_user`} value={item.token}>
                              {item.userName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='mt-8'>
                    <div className='flex justify-between items-center'>
                      <div className='text-sm font-bold text-gray-700 tracking-wide'>
                        Language
                      </div>
                    </div>
                    <div className='border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500'>
                      <select
                        className='w-full text-lg py-2 border border-gray-800 focus:outline-none focus:border-indigo-500 p-3'
                        id='language'
                        value={formik.values.language}
                        onChange={formik.handleChange}
                      >
                        {languageList?.map((item: any, index: number) => {
                          return (
                            <option key={`${index}_language`} value={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='mt-8'>
                    <div className='flex justify-between items-center'>
                      <div className='text-sm font-bold text-gray-700 tracking-wide'>
                        Portal Type
                      </div>
                    </div>
                    <div className='border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500'>
                      <select
                        className='w-full appearance-none text-lg py-2 border border-gray-800 focus:outline-none focus:border-indigo-500 p-3'
                        id='portalType'
                        value={formik.values.portalType}
                        onChange={formik.handleChange}
                      >
                        {portalTypeList?.map((item: any, index: number) => {
                          return (
                            <option key={`${index}_portalType`} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='mt-8'>
                    <div className='flex justify-between items-center'>
                      <div className='text-sm font-bold text-gray-700 tracking-wide'>
                        Plant
                      </div>
                    </div>
                    <div className='border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500'>
                      <select
                        className='w-full appearance-none text-lg py-2 border border-gray-800 focus:outline-none focus:border-indigo-500 p-3'
                        id='plantId'
                        value={formik.values.plantId}
                        onChange={formik.handleChange}
                      >
                        {plantList?.map((plant: any, index: number) => {
                          return (
                            <option
                              key={`${index}_plant`}
                              value={plant.plantId}
                            >
                              {plant.plantName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='mt-10'>
                    <button
                      className='bg-csa-primary text-gray-100 p-4 w-full rounded-md tracking-wide
                              font-semibold font-display focus:outline-none focus:shadow-outline
                              shadow-lg'
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
