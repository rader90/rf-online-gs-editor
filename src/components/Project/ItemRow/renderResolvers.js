import {
  FACE,
  UPPER,
  LOWER,
  GAUNTLET,
  SHOE,
  HELMET,
  SHIELD,
  WEAPON,
  CLOAK,
  RING,
  AMULET,
  BULLET,
  MAKETOOL,
  POTION,
  BAG,
  BATTERY,
  ORE,
  RESOURCE,
  FORCE,
  UNITKEY,
  BOOTY,
  MAP,
  TOWN,
  DUNGEONKEY,
  ANIMUS,
  TOWER,
  TRAP,
  SIEGEKIT,
  TICKET,
  QUEST,
  RECOVERY,
  BOX,
  FIRECRACKER,
  CASHMINING,
  RADAR,
  PAGER,
  COUPON,
  MAUHEAD,
  MAUUPPER,
  MAULOWER,
  MAUARM,
  MAUSHOULDER,
  MAUBACK,
  MAUBULLET,
  MAKEDATA,
  COMBINEDATA,
  UNK3,
} from '~/structs/item_types';

import RenderArmor from './Render/Armor';
import RenderJewelry from './Render/Jewelry';
import RenderTool from './Render/Tool';
import RenderWeapon from './Render/Weapon';

// want help in writing specific components ;)
export default {
  [FACE]: RenderTool,
  [UPPER]: RenderArmor,
  [LOWER]: RenderArmor,
  [GAUNTLET]: RenderArmor,
  [SHOE]: RenderArmor,
  [HELMET]: RenderArmor,
  [WEAPON]: RenderWeapon,
  [SHIELD]: RenderArmor,
  [CLOAK]: RenderArmor,
  [RING]: RenderJewelry,
  [AMULET]: RenderJewelry,
  [BULLET]: RenderTool,
  [MAKETOOL]: RenderTool,
  [POTION]: RenderTool,
  [BAG]: RenderTool,
  [BATTERY]: RenderTool,
  [ORE]: RenderTool,
  [RESOURCE]: RenderTool,
  [FORCE]: RenderTool,
  [UNITKEY]: RenderTool,
  [BOOTY]: RenderTool,
  [MAP]: RenderTool,
  [TOWN]: RenderTool,
  [DUNGEONKEY]: RenderTool,
  [ANIMUS]: RenderTool,
  [TOWER]: RenderTool,
  [TRAP]: RenderTool,
  [SIEGEKIT]: RenderTool,
  [TICKET]: RenderTool,
  [QUEST]: RenderTool,
  [RECOVERY]: RenderTool,
  [BOX]: RenderTool,
  [FIRECRACKER]: RenderTool,
  [CASHMINING]: RenderTool,
  [RADAR]: RenderTool,
  [PAGER]: RenderTool,
  [COUPON]: RenderTool,
  [MAUHEAD]: RenderTool,
  [MAUUPPER]: RenderTool,
  [MAULOWER]: RenderTool,
  [MAUARM]: RenderTool,
  [MAUSHOULDER]: RenderTool,
  [MAUBACK]: RenderTool,
  [MAUBULLET]: RenderTool,
  [MAKEDATA]: null,
  [COMBINEDATA]: null,
  [UNK3]: null,
};
