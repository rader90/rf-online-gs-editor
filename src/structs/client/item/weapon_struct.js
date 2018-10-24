import Struct from '~/classes/Struct';

export default new Struct().fromSchema1([
  { child: { type: Number, name: 'nIndex', len: 32 } },
  { child: { type: String, name: 'strCode', len: 32, as: 'hex' } },
  { child: { type: String, name: 'strName', len: 64 } },
  { child: { type: String, name: 'strModel', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nIconIDX', len: 32 } },
  { child: { type: String, name: 'strCivil1', len: 32, as: 'hex' } },
  { child: { type: String, name: 'strCivil2', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'nType', len: 8 } },
  { child: { type: Number, name: 'nMoney', len: 8 } },
  { child: { type: Number, name: 'nUnkInt16', len: 16 } },
  { child: { type: Number, name: 'nStdPrice', len: 32 } },
  { child: { type: Number, name: 'nStdPoint', len: 32 } },
  { child: { type: Number, name: 'nGoldPoint', len: 32 } },
  { child: { type: Number, name: 'nProcPoint', len: 32 } },
  { child: { type: Number, name: 'nKillPoint', len: 32 } },
  { child: { type: Number, name: 'nStoragePrice', len: 32 } },
  { child: { type: Boolean, name: 'bExchange', len: 32 } },
  { child: { type: Boolean, name: 'bSell', len: 32 } },
  { child: { type: Boolean, name: 'bGround', len: 32 } },
  { child: { type: Boolean, name: 'bStoragePossible', len: 32 } },
  { child: { type: Number, name: 'nDescription', len: 32 } },
  { child: { type: Number, name: 'bExist', len: 32 } },
  { child: { type: Number, name: 'bIsCash', len: 32 } },
  { child: { type: Number, name: 'bIsTime', len: 32 } },
  { child: { type: Number, name: 'nUpLevelLim', len: 32 } },

  { child: { type: Number, name: 'nItemGrade', len: 32 } },
  { child: { type: Number, name: 'nUnkInt32_1', len: 32 } },
  { child: { type: Number, name: 'nUpgrade', len: 32 } },
  { child: { type: Number, name: 'nUnkInt32_2', len: 32 } },
  { child: { type: Number, name: 'nDurUnit', len: 32 } },
  { child: { type: Number, name: 'nLevelLim', len: 8 } },
  { child: { type: Number, name: 'nExpertID1', len: 8 } },
  { child: { type: Number, name: 'nExpertID2', len: 8 } },
  { child: { type: Number, name: 'nExpertLim1', len: 8 } },
  { child: { type: Number, name: 'nExpertLim2', len: 8 } },
  { child: { type: Number, name: 'nUnkInt8_1', len: 8 } },
  { child: { type: Number, name: 'nUnkInt8_2', len: 8 } },
  { child: { type: Number, name: 'nUnkInt8_3', len: 8 } },
  { child: { type: Number, name: 'nGASpd', len: 32 } },
  { child: { type: Number, name: 'nEffNum', len: 8 } },

  { child: { type: Number, name: 'nEffCode', len: 8 }, repeat: 4 },

  { child: { type: Number, name: 'nUnkInt8_4', len: 8 } },
  { child: { type: Number, name: 'nUnkInt8_5', len: 8 } },
  { child: { type: Number, name: 'nUnkInt8_6', len: 8 } },

  {
    child: { type: Number, name: 'fEffUnit', len: 32, as: 'float' },
    repeat: 4,
  },

  { child: { type: Number, name: 'nAttEffType', len: 32 } },
  { child: { type: Number, name: 'nClassGradeLim', len: 32 } },
  { child: { type: Number, name: 'nWPType', len: 32 } },
  { child: { type: Number, name: 'nSubType', len: 32 } },
  { child: { type: String, name: 'strClassLim', len: 32, as: 'hex' } },
  { child: { type: Number, name: 'fGADst', len: 32, as: 'float' } },
  { child: { type: Number, name: 'nGAMinAF', len: 32 } },
  { child: { type: Number, name: 'nGAMaxAF', len: 32 } },
  { child: { type: Number, name: 'nMAMinAF', len: 32 } },
  { child: { type: Number, name: 'nMAMaxAF', len: 32 } },
  { child: { type: Number, name: 'nProperty', len: 8 } },

  {
    child: { type: Number, name: 'nBulletType', len: 8 },
    repeat: 3,
  },

  { child: { type: Number, name: 'nBulletType__4', len: 32 } },
  { child: { type: Number, name: 'nBulletTypeNum', len: 32 } },
  { child: { type: Number, name: 'nActiveType', len: 32 } },
  { child: { type: String, name: 'strActiveCodeKey', len: 32, as: 'hex' } },

  { child: { type: Number, name: 'nUnkInt32_3', len: 32 } },
  { child: { type: Number, name: 'nUnkInt32_4', len: 32 } },
]);
