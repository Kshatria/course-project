import { ErrorCode } from './types';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD]: 'Неверный email или пароль',
  [ErrorCode.ERR_ACCOUNT_ALREADY_EXIST]: 'Аккаунт уже существует',
  [ErrorCode.ERR_FIELD_REQUIRED]: 'Обязательное поле',
  [ErrorCode.ERR_INCORRECT_PASSWORD]: 'Некорректный пароль',
  [ErrorCode.ERR_INVALID_PASSWORD]: 'Пароль должен содержать минимум 8 символов', // Добавлено
  [ErrorCode.ERR_NOT_VALID]: 'Не валидный id сущности',
  [ErrorCode.ERR_AUTH]: 'Ошибка авторизации',
  [ErrorCode.ERR_NO_FILES]: 'Файлы не загружены',
  [ErrorCode.ERR_NOT_ALLOWED]: 'Нет доступа к операции',
  [ErrorCode.ERR_NOT_FOUND]: 'Сущность не найдена',
  [ErrorCode.ERR_VALIDATION_ERROR]: 'Ошибка валидации',
  [ErrorCode.ERR_INTERNAL_SERVER]: 'Внутренняя ошибка сервера',
};

export { ERROR_MESSAGES };
