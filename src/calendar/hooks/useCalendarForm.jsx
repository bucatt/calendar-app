import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

export const useCalendarForm = () => {
  const [formValues, setFormValues] = useState({
    start: new Date(),
    end: addHours(new Date(), 2),
    title: '',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const titleClass = useMemo(() => {
    if (!formSubmitted) {
      return '';
    }

    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onFormChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChange = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      console.log('error en fechas');
      Swal.fire(
        'Fechas u horas incorrectas',
        'Revise las fechas y hora ingresadas',
        'error',
      );
      return;
    }

    if (formValues.title.length <= 0) {
      Swal.fire('Título incorrecto', 'Revise el título ingresado', 'error');
      return;
    }

    console.log(formValues);

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };
  return {
    onSubmit,
    onDateChange,
    onFormChange,
    titleClass,
    ...formValues,
  };
};

// export default [
//   onSubmit,
//   onDateChange,
//   onFormChange,
//   onCloseModal,
//   titleClass,
//   isModalOpen,
//   ...formValues,
// ];
