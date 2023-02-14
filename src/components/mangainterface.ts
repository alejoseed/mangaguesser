export interface Root {
    result: string
    response: string
    data: Data
  }
  
  export interface Data {
    data: any
    id: string
    type: string
    attributes: Attributes
    relationships: Relationship[]
  }
  export interface Attributes {
    title: Title
    altTitles: AltTitle[]
    description: Description
    isLocked: boolean
    links: Links
    originalLanguage: string
    lastVolume: string
    lastChapter: string
    publicationDemographic: any
    status: string
    year: number
    contentRating: string
    tags: Tag[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number
    availableTranslatedLanguages: string[]
    latestUploadedChapter: string
  }
  
  export interface Title {
    en: string
  }
  
  export interface AltTitle {
    ko?: string
    ru?: string
  }
  
  export interface Description {
    en: string
    ko: string
  }
  
  export interface Links {
    ap: string
    mu: string
    raw: string
    engtl: string
  }
  
  export interface Tag {
    id: string
    type: string
    attributes: Attributes2
    relationships: any[]
  }
  
  export interface Attributes2 {
    name: Name
    description: any[]
    group: string
    version: number
  }
  
  export interface Name {
    en: string
  }
  
  export interface Relationship {
    id: string
    type: string
  }
  