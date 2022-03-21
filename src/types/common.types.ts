export enum MenuOptions {
  DISMISS_MENU,
  CREATE,
  BROWSE,
}

export enum TextDirection {
  UP,
  DOWN,
  NOTSELECTED
}

export enum MemeSide {
  LEFT,
  RIGHT
}

export interface MemeTitleImageDirection {
  memeTitle: string
  memeImageURL: string
  memeTitleDirection: TextDirection
}

export interface MemeData {
  createdAt?: string
  memeLeft: MemeTitleImageDirection
  memeRight: MemeTitleImageDirection
}