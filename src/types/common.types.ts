export enum ModeType {
    CREATE,
    BROWSE,
  }

export type Mode = {
      type : ModeType.BROWSE|ModeType.CREATE
  }