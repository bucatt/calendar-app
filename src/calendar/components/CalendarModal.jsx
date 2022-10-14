import React from 'react';
import Modal from 'react-modal';
import './CalendarModal.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarForm } from '../hooks/useCalendarForm';
import { useUiStore } from '../../hooks/useUiStore';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const {
    onSubmit,
    onDateChange,
    onFormChange,
    titleClass,
    start,
    end,
    title,
    notes,
  } = useCalendarForm();

  //const [isModalOpen, setIsOpen] = useState(true);

  const { isDateModalOpen, closeDateModal } = useUiStore();

  const onCloseModal = () => {
    console.log('Cerrando modal');
    closeDateModal();
  };

  // ---------------------------------------------------
  // const { title, notes, start, end } = formValues;

  // TODO:
  // cerrar modal
  // remover errores en pantalla

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            className="form-control"
            selected={start}
            onChange={event => onDateChange(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            locale="es"
            minDate={start}
            className="form-control"
            selected={end}
            onChange={event => onDateChange(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={'form-control ' + titleClass}
            placeholder="Título del evento"
            name="title"
            value={title}
            autoComplete="off"
            onChange={onFormChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={onFormChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
