interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

export interface AttributesKnight {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface KnightDocument extends Document {
  _id: string;
  name: string;
  nickname: string;
  birthday: Date;
  weapons: Weapon[];
  attributes: AttributesKnight;
  keyAttribute: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
