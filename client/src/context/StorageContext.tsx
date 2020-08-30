import React, { useEffect, useState, createContext, useContext } from 'react';
import getStorageRef from '../helpers/getStorageRef';
import { IStorage, IStorageCourse } from '../../../types';
import { AuthContext } from './AuthContext';

interface IStorageContext {
  storageCourses: IStorageCourse[];
  storageRef: any;
}
export const StorageContext = createContext<IStorageContext>({
  storageCourses: [],
  storageRef: null
});

interface IStorageContextProviderProps {
  needsLive: boolean;
}
const StorageContextProvider: React.FunctionComponent<IStorageContextProviderProps> = props => {
  const { children, needsLive } = props;
  const [storageCourses, setStorageCourses] = useState<IStorageCourse[]>([]);
  const [storageRef, setStroageRef] = useState(getStorageRef);
  const { authPhase } = useContext(AuthContext);
  const updateStorage = (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => {
    setStroageRef(snap.ref);
    setStorageCourses([...(snap.data() as IStorage)?.storageCourses]);
  };
  useEffect(() => {
    let unsubscribe = () => {};
    if (authPhase === 'in') {
      if (needsLive) {
        unsubscribe = getStorageRef().onSnapshot(updateStorage, err => {
          console.error(
            'ERROR IN GETTINFG STORAGE INFO',
            err.message,
            err.stack
          );
        });
      } else {
        getStorageRef()
          .get()
          .then(updateStorage)
          .catch(err => {
            console.error(
              'ERROR IN GETTINFG STORAGE INFO',
              err.message,
              err.stack
            );
          });
      }
    } else {
      setStorageCourses([]);
      setStroageRef(null);
    }
    return () => {
      unsubscribe();
    };
  }, [authPhase, needsLive]);

  return (
    <StorageContext.Provider value={{ storageCourses, storageRef }}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageContextProvider;
