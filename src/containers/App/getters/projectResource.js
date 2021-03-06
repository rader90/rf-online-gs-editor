import { isString, isInteger, isNumber } from 'lodash';
import { getValue } from './nextValue';
import { getWorkdirFileName } from '~/utils/string';

export const getOswName = (nextValue, { entry }) =>
  getOswName1(getCode(nextValue, { entry }));

export const getOswName1 = code => `OSW_${code}`.toUpperCase();

export const getType = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['type']], def: '', fnc: isString },
  );

export const getCode = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strCode']], def: '', fnc: isString },
  );

export const getCode2 = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strCode2']], def: '', fnc: isString },
  );

export const getFileName = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strFileName']], def: '', fnc: isString },
  );

export const getFileNameIsOsw = (nextValue, { entry }) => {
  const oswName = getOswName(nextValue, { entry });
  const fileName = getFileName(nextValue, { entry });
  return getFileNameIsOsw1(fileName, oswName);
};

export const getFileNameIsOsw1 = (fileName, oswName) =>
  fileName.toUpperCase().replace(/^(.+?)\..+?$/, '$1') ===
  oswName.toUpperCase();

export const getFileNameBBX = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strFileNameBBX']], def: '', fnc: isString },
  );

export const getFileNameBBXIsOsw = (nextValue, { entry }) => {
  const oswName = getOswName(nextValue, { entry });
  const fileName = getFileNameBBX(nextValue, { entry });
  return getFileNameIsOsw1(fileName, oswName);
};

export const getFileNameBN = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strFileNameBN']], def: '', fnc: isString },
  );

export const getFileNameBNIsOsw = (nextValue, { entry }) => {
  const oswName = getOswName(nextValue, { entry });
  const fileName = getFileNameBN(nextValue, { entry });
  return getFileNameIsOsw1(fileName, oswName);
};

export const getFileNameHashBBX = (nextValue, { entry }) =>
  getWorkdirFileName([
    getPath(nextValue, { entry }),
    getFileNameBBX(nextValue, { entry }),
  ]);

export const getFileNameHashBN = (nextValue, { entry }) =>
  getWorkdirFileName([
    getPath(nextValue, { entry }),
    getFileNameBN(nextValue, { entry }),
  ]);

export const getPath = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strPath']], def: '', fnc: isString },
  );

export const getTexturePath = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['strTexturePath']], def: '', fnc: isString },
  );

export const getPropNum = (nextValue, { entry }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [['nPropNum']], def: 0, fnc: isInteger },
  );

export const getPropValue = (nextValue, { entry, n }) =>
  getValue(
    nextValue,
    { entry },
    { fields: [[`nPropValue__${n}`]], def: 0, fnc: isNumber },
  );
