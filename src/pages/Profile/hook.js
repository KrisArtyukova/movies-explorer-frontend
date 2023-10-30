import React, { useState } from 'react';
import toast from 'react-hot-toast';
import mainApi from '../../utils/MainApi';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function useProfile() {
  const appContext = React.useContext(AppContext);
  const currentUserContext = React.useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);

  function onEditUserInfo({ name, email }) {
    appContext.setLoading(true);
    mainApi.editUserInfo({ name, email })
      .then((response) => {
        currentUserContext.setCurrentUser(response.user);
        appContext.setLoading(false);
        appContext.setProfileError(undefined);
        setEdit(false);
        toast.success('Вы успешно изменили данные!', { icon: '✅' });
      })
      .catch((error) => {
        appContext.setProfileError(error);
        appContext.setLoading(false);
        toast.error(`Произошла ошибка при изменении данных пользователя! ${error}`, { icon: '❌' });
      });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formValues = {
      name: event.target?.profileName?.value,
      email: event.target?.profileEmail?.value,
    };

    onEditUserInfo(formValues);
  };

  return {
    handleFormSubmit,
    edit,
    setEdit,
  };
}

export default useProfile;
