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

export interface MemeData {
  imgTxt: {
    txtleft: string,
    txtright: string
  },
  imgUrl: {
    imgurlleft: string,
    imgurlright: string
  },
  txtDirection: {
    txtdirectionleft: TextDirection,
    txtdirectionright: TextDirection
  },
}