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

export type Edits = {
  left: boolean,
  right: boolean
}

//There has to be a better TypeScript way of doing this
//Need to add ! for using functions
export interface ContextValue {
  state: MemeData,
  edit?: Edits,
  handleMemeTitle?: (val: string, side: MemeSide) => void,
  handleMemeImgURL?: (val: string, side: MemeSide) => void,
  handleMemeTitleDirection?: (val: TextDirection, side: MemeSide) => void,
  gotoMeme?: (id: string) => void,
  setEdit?: React.Dispatch<React.SetStateAction<Edits>>,
}