import React from 'react';
import PropTypes from 'prop-types';
import styles from './Debug.css';

const Debug = () => (
    <>
      <div className="title">Страница для отладки</div>
      <div class="button_row">
          <button>Пользователи</button>
          <button>Комментарии</button>
          <button>Группы</button>
      </div>
    </>
);

Debug.propTypes = {};

Debug.defaultProps = {};

export default Debug;
